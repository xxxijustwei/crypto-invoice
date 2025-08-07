interface BillingAddress {
  company: string;
  country: string;
  address: string;
}

export interface Invoice {
  id: string;
  status: "Paid" | "Unpaid";
  num: number;
  issuedAt: string;
  dueAt: string;
  payTo: BillingAddress;
  invoicedTo: BillingAddress;
  paymentMethod: {
    walletAddress: string;
    networks: string[];
    tokens: string[];
  };
  items: {
    name: string;
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
