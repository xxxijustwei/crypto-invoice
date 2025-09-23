import type { Invoice } from "@/components/invoice/types";
import enUS from "@/i18n/locales/en-US";
import { ENV } from "@/lib/env";
import { getInvoiceTemplate, getReactDOMServer } from "@/lib/module";
import chromium from "@sparticuz/chromium";
import { getTranslations } from "next-intl/server";
import type { NextRequest } from "next/server";
import React from "react";

const CHROMIUM_EXECUTABLE_PATH =
  "https://github.com/Sparticuz/chromium/releases/download/v138.0.1/chromium-v138.0.1-pack.{arch}.tar";
const TAILWINDCSS_JS_CDN =
  "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4.1.11/dist/index.global.min.js";

export const POST = async (req: NextRequest) => {
  let browser = null;

  try {
    const data: Invoice = await req.json();
    if (!data) {
      return new Response("Invalid request body", { status: 400 });
    }

    const html = await generateHTML(data);
    browser = await getBrowser();

    if (!browser) {
      throw new Error("Failed to launch browser");
    }

    const pdfBuffer = await renderPDF(browser, html);

    if (!pdfBuffer) {
      return new Response("Failed to render PDF", { status: 500 });
    }

    return new Response(
      new Blob([new Uint8Array(pdfBuffer)], { type: "application/pdf" }),
      {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": "attachment; filename=invoice.pdf",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
        status: 200,
      },
    );
  } catch (error) {
    console.error("PDF Generation Error:", error);
    return new Response("PDF Generation Error", { status: 500 });
  } finally {
    if (browser) {
      try {
        const pages = await browser.pages();
        await Promise.all(pages.map((p) => p.close()));
        await browser.close();
      } catch (e) {
        console.error("Error closing browser:", e);
      }
    }
  }
};

const generateHTML = async (invoice: Invoice) => {
  const t = await getTranslations("invoice");
  const [reactDOMServer, invoiceTemplate] = await Promise.all([
    getReactDOMServer(),
    getInvoiceTemplate(),
  ]);
  if (!reactDOMServer) {
    throw new Error("Failed to import react-dom/server");
  }
  if (!invoiceTemplate) {
    throw new Error("Failed to import invoice template");
  }

  return reactDOMServer.renderToStaticMarkup(
    React.createElement(invoiceTemplate, {
      invoice,
      translations: Object.keys(enUS.invoice).reduce(
        (acc, key) => {
          acc[key] = t(key);
          return acc;
        },
        {} as Record<string, string>,
      ),
    }),
  );
};

const getBrowser = async () => {
  const puppeteer =
    ENV === "development"
      ? await import("puppeteer")
      : await import("puppeteer-core");

  const browser =
    ENV === "development"
      ? await puppeteer.launch({
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
          headless: true,
        })
      : await puppeteer.launch({
          args: [
            ...chromium.args,
            "--disable-dev-shm-usage",
            "--ignore-certificate-errors",
          ],
          executablePath: await chromium.executablePath(
            CHROMIUM_EXECUTABLE_PATH.replace("{arch}", process.arch),
          ),
          headless: true,
        });

  return browser;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const renderPDF = async (browser: any, html: string) => {
  const page = await browser.newPage();

  try {
    await Promise.all([
      page.setContent(html, {
        waitUntil: ["networkidle0", "load", "domcontentloaded"],
        timeout: 30000,
      }),
      page.addScriptTag({
        url: TAILWINDCSS_JS_CDN,
      }),
    ]);

    const buffer = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });

    return buffer;
  } catch (error) {
    console.error("Render PDF Error:", error);
  } finally {
    await page.close();
  }
};
