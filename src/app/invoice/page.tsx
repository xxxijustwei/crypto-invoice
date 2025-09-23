"use client";

import InvoiceComponent from "@/components/invoice/template";
import { Button } from "@/components/ui/button";
import { getMockInvoice } from "@/lib/mock";
import { useCallback } from "react";
import { useQuery } from "react-query";

const Page = () => {
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
