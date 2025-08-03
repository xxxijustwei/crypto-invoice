import InvoiceComponent from "@/components/invoice/template";
import type { Invoice } from "@/components/invoice/types";
import {
  randAddress,
  randBic,
  randCompanyName,
  randCountry,
  randNumber,
  randParagraph,
  randProductName,
  randRecentDate,
  randUuid,
} from "@ngneat/falso";

const mockAddress = () => {
  const address = randAddress();
  return {
    company: randCompanyName(),
    country: address.country ?? randCountry(),
    address: `${address.street}, ${address.city}, ${address.country}`,
  };
};

const mockInvoice: Invoice = {
  id: randUuid(),
  status: "Paid",
  num: randNumber({ min: 100, max: 999 }),
  createdAt: randRecentDate().toISOString(),
  payTo: mockAddress(),
  invoicedTo: mockAddress(),
  items: Array.from({ length: randNumber({ min: 1, max: 5 }) }, () => ({
    name: randProductName(),
    detail: randParagraph(),
    qty: randNumber({ min: 1, max: 10 }),
    amount: randNumber({ min: 200, max: 1000 }),
  })),
  discount: {
    code: randBic(),
    amount: -randNumber({ min: 1, max: 100 }),
  },
  transaction: {
    networkName: "Ethereum",
    tokenName: "USDT",
    txHash:
      "0x88521cc890ec93853f55f2985cbd5e66b62f51a17b4e1dff1e13dbb08fd7fbb6",
    amount: 15.82,
    date: randRecentDate().toISOString(),
  },
};

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <main>
        <InvoiceComponent invoice={mockInvoice} />
      </main>
    </div>
  );
};

export default Page;
