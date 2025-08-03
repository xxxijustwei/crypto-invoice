"use client";

import InvoiceComponent from "@/components/invoice/template";
import type { Invoice } from "@/components/invoice/types";
import { Button } from "@/components/wed/button";
import { getMockInvoice } from "@/lib/mock";
import { useCallback, useEffect, useState } from "react";

const Page = () => {
  const [invoice, setInvoice] = useState<Invoice>();

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

  useEffect(() => {
    setInvoice(getMockInvoice());
  }, []);

  if (!invoice) {
    return <></>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="absolute top-4 right-4">
        <Button variant="outline" onClick={handleDownload}>
          Download
        </Button>
      </div>
      <main>
        <InvoiceComponent invoice={invoice} />
      </main>
    </div>
  );
};

export default Page;
