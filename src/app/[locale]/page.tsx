"use client";

import InvoiceComponent from "@/components/invoice/template";
import { LanguageToggle } from "@/components/language-toggle";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import enUS from "@/i18n/locales/en-US";
import { getMockInvoice } from "@/lib/mock";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { useQuery } from "react-query";

const Page = () => {
  const t = useTranslations("invoice");
  const { data: invoice, isLoading } = useQuery({
    queryKey: ["invoice"],
    queryFn: () => getMockInvoice(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const handleDownload = useCallback(async () => {
    const response = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify(invoice),
    });

    if (!response.ok) {
      alert("Failed to download invoice");
      return;
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "invoice.pdf";
    a.click();
    URL.revokeObjectURL(url);
  }, [invoice]);

  if (isLoading || !invoice) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center min-h-screen">
      <div className="flex justify-between gap-4 w-full max-w-3xl mx-auto py-4">
        <Button variant="outline" onClick={handleDownload}>
          Download
        </Button>
        <div className="flex items-center gap-1">
          <LanguageToggle />
          <ModeToggle />
        </div>
      </div>
      <main className="border w-fit mx-auto mb-6">
        <InvoiceComponent
          invoice={invoice}
          translations={Object.keys(enUS.invoice).reduce(
            (acc, key) => {
              acc[key] = t(key);
              return acc;
            },
            {} as Record<string, string>,
          )}
        />
      </main>
    </div>
  );
};

export default Page;
