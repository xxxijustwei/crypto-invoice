interface BillingAddress {
  company: string;
  country: string;
  address: string;
}

export interface Invoice {
  id: string;
  status: "Paid" | "Unpaid";
  num: number;
  createdAt: string;
  payTo: BillingAddress;
  invoicedTo: BillingAddress;
  items: {
    name: string;
    detail: string;
    qty: number;
    amount: number;
  }[];
  discount: {
    code: string;
    amount: number;
  };
  transaction?: {
    networkName: string;
    tokenName: string;
    txHash: string;
    amount: number;
    date: string;
  };
  subtotal: number;
  total: number;
}
