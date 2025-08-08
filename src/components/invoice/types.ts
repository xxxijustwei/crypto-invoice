interface InvoiceBillingAddress {
  company: string;
  email: string;
  address: string;
}

interface InvoicePaymentMethod {
  walletAddress: string;
  networks: string[];
  tokens: string[];
}

interface InvoiceItem {
  name: string;
  qty: number;
  amount: number;
}

interface InvoicePromotionalCode {
  code: string;
  amount: number;
}

interface InvoiceTransaction {
  networkName: string;
  tokenName: string;
  txHash: string;
  amount: number;
  date: string;
}

export interface Invoice {
  id: string;
  status: "Paid" | "Unpaid";
  num: number;
  issuedAt: string;
  dueAt: string;
  payTo: InvoiceBillingAddress;
  invoicedTo: InvoiceBillingAddress;
  paymentMethod: InvoicePaymentMethod;
  items: InvoiceItem[];
  promotionalCode?: InvoicePromotionalCode;
  transaction?: InvoiceTransaction;
  subtotal: number;
  discount: number;
  total: number;
}

export interface PreivewInvoice
  extends Partial<
    Omit<Invoice, "id" | "payTo" | "invoicedTo" | "paymentMethod" | "items">
  > {
  payTo?: Partial<InvoiceBillingAddress>;
  invoicedTo?: Partial<InvoiceBillingAddress>;
  paymentMethod?: Partial<InvoicePaymentMethod>;
  items?: Partial<InvoiceItem>[];
}
