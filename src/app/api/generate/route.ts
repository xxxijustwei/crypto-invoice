import type { Invoice } from "@/components/invoice/types";
import { ENV } from "@/lib/env";
import { getInvoiceTemplate, getReactDOMServer } from "@/lib/module";
import chromium from "@sparticuz/chromium";
import type { NextRequest } from "next/server";
import React from "react";

const CHROMIUM_EXECUTABLE_PATH =
  "https://github.com/Sparticuz/chromium/releases/download/v138.0.1/chromium-v138.0.1-pack.{arch}.tar";
const TAILWINDCSS_JS_CDN =
  "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4";

export const POST = async (req: NextRequest) => {
  const data: Invoice = await req.json();

  let browser = null;
  let page = null;

  try {
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

    const html = reactDOMServer.renderToStaticMarkup(
      React.createElement(invoiceTemplate, { invoice: data }),
    );

    const puppeteer =
      ENV === "development"
        ? await import("puppeteer")
        : await import("puppeteer-core");
    browser =
      ENV === "development"
        ? await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
            headless: true,
          })
        : await puppeteer.launch({
            args: [...chromium.args, "--disable-dev-shm-usage"],
            executablePath: await chromium.executablePath(
              CHROMIUM_EXECUTABLE_PATH.replace("{arch}", process.arch),
            ),
            headless: true,
            ignoreHTTPSErrors: true,
          });

    if (!browser) {
      throw new Error("Failed to launch browser");
    }

    page = await browser.newPage();
    await page.setContent(html, {
      waitUntil: ["networkidle0", "load", "domcontentloaded"],
      timeout: 30000,
    });
    await page.addScriptTag({
      url: TAILWINDCSS_JS_CDN,
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });

    return new Response(
      new Blob([new Uint8Array(pdfBuffer)], { type: "application/pdf" }),
      {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": "attachment; filename=invoice.pdf",
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
        status: 200,
      },
    );
  } catch (error) {
    console.error("PDF Generation Error:", error);
    return new Response("PDF Generation Error", { status: 500 });
  } finally {
    page?.close().catch((e) => console.error("Error closing page:", e));
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
