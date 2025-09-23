import dayjs from "dayjs";
import { Decimal } from "decimal.js";
import { AnvilIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import type React from "react";
import { Skeleton } from "../ui/skeleton";
import { NetworkBadge, TokenBadge } from "./badge";
import type { PreivewInvoice } from "./types";

interface InvoiceComponentProps {
  invoice: PreivewInvoice;
}

const InvoiceComponent = ({ invoice }: InvoiceComponentProps) => {
  const t = useTranslations("invoice");
  const {
    num,
    status,
    issuedAt,
    dueAt,
    payTo,
    invoicedTo,
    paymentMethod,
    items,
    promotionalCode,
    transaction,
    subtotal,
    discount,
    total,
  } = invoice;

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto p-6 sm:p-10 bg-white">
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col gap-2 text-primary">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-light">Invoice #{num}</h1>
            {status && (
              <span className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded">
                {t(status.toLowerCase())}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <div className="grid grid-cols-5 gap-x-2">
              <span className="col-span-2 font-extralight text-secondary-foreground">
                {t("issued_date")}:
              </span>
              <span className="col-span-3">
                {issuedAt ? (
                  dayjs(issuedAt).format("MMMM D, YYYY")
                ) : (
                  <Skeleton className="h-6 bg-primary/10" />
                )}
              </span>
            </div>
            <div className="grid grid-cols-5 gap-x-2">
              <span className="col-span-2 font-extralight text-secondary-foreground">
                {t("due_date")}:
              </span>
              <span className="col-span-3">
                {dueAt ? (
                  dayjs(dueAt).format("MMMM D, YYYY")
                ) : (
                  <Skeleton className="h-6 bg-primary/10" />
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="p-4 border border-gray-300 rounded-3xl shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
          <AnvilIcon size={64} />
        </div>
      </div>

      <div className="h-px bg-gray-200" />

      <div className="grid grid-cols-2 gap-4 sm:gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-medium px-2">👤 {t("pay_to")}:</h2>
          <div className="h-full flex flex-col gap-1 px-6 py-4 rounded-md bg-slate-100 text-sm text-gray-500">
            <div className="text-lg font-medium text-primary">
              {payTo?.company ?? (
                <Skeleton className="w-[46%] min-w-24 h-7 bg-primary/10" />
              )}
            </div>
            <div>
              {payTo?.email ?? <Skeleton className="h-5 bg-primary/10" />}
            </div>
            <div>
              {payTo?.address ?? <Skeleton className="h-5 bg-primary/10" />}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-medium px-2">👤 {t("invoiced_to")}:</h2>
          <div className="h-full flex flex-col gap-1 px-6 py-4 rounded-md bg-slate-100 text-sm text-gray-500">
            <div className="text-lg font-medium text-primary">
              {invoicedTo?.company ?? (
                <Skeleton className="w-[46%] min-w-24 h-7 bg-primary/10" />
              )}
            </div>
            <div>
              {invoicedTo?.email ?? <Skeleton className="h-5 bg-primary/10" />}
            </div>
            <div>
              {invoicedTo?.address ?? (
                <Skeleton className="h-5 bg-primary/10" />
              )}
            </div>
          </div>
        </div>
      </div>

      {status === "Paid" && transaction ? (
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-medium px-2">🧾 {t("transaction")}:</h2>
          <div className="border border-neutral-100 shadow-[0_0_10px_rgba(0,0,0,0.05)] rounded-xl p-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 bg-slate-100 rounded-lg px-4 py-3">
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-light">{t("transaction_hash")}:</p>
                  <p className="break-all">{transaction.txHash}</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-light">{t("network")}:</p>
                    <NetworkBadge networkName={transaction.networkName} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-light">{t("token")}:</p>
                    <TokenBadge tokenName={transaction.tokenName} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-light">{t("amount")}:</p>
                    <p className="text-sm font-medium px-1">
                      ${new Decimal(transaction.amount).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-light">{t("date")}:</p>
                    <p className="text-sm font-medium px-1">
                      {dayjs(transaction.date).format("MMMM D, YYYY")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-medium px-2">
            💰 {t("payment_method")}:
          </h2>
          <div className="border border-neutral-100 shadow-[0_0_10px_rgba(0,0,0,0.05)] rounded-xl p-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 bg-slate-100 rounded-lg px-4 py-3">
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-light">{t("wallet_address")}:</p>
                  <p className="break-all">
                    {paymentMethod?.walletAddress ?? (
                      <Skeleton className="w-72 h-6 bg-primary/10" />
                    )}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-1 flex-col gap-2">
                  <p className="text-sm font-light px-2">
                    {t("supported_networks")}:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {paymentMethod?.networks ? (
                      paymentMethod.networks.map((network) => (
                        <NetworkBadge key={network} networkName={network} />
                      ))
                    ) : (
                      <Skeleton className="w-32 h-6 bg-primary/10" />
                    )}
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <p className="text-sm font-light px-2">
                    {t("supported_tokens")}:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {paymentMethod?.tokens ? (
                      paymentMethod.tokens.map((token) => (
                        <TokenBadge key={token} tokenName={token} />
                      ))
                    ) : (
                      <Skeleton className="w-32 h-6 bg-primary/10" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="h-px bg-gray-200" />

      <div className="flex flex-col gap-3 mb-4">
        <div className="overflow-x-auto">
          <table className="w-full min-w-xl border-collapse table-fixed">
            <colgroup>
              <col className="w-[50%]" />
              <col className="w-[18%]" />
              <col className="w-[14%]" />
              <col className="w-[18%]" />
            </colgroup>
            <thead>
              <tr className="bg-slate-100 text-primary font-medium text-sm">
                <th className="p-4 text-left rounded-tl-md rounded-bl-md">
                  {t("description")}
                </th>
                <th className="p-4 text-right">{t("unit_price")}</th>
                <th className="p-4 text-right">{t("qty")}</th>
                <th className="p-4 text-right rounded-tr-md rounded-br-md">
                  {t("amount")}
                </th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 last:border-b-0"
                >
                  <td className="px-4 py-6">{item.name}</td>
                  <td className="px-4 py-6 text-right text-gray-500">
                    ${new Decimal(item.amount ?? 0).toFixed(2)}
                  </td>
                  <td className="px-4 py-6 text-right text-gray-500">
                    {item.qty ?? 0}
                  </td>
                  <td className="px-4 py-6 text-right text-gray-800">
                    $
                    {new Decimal(item.amount ?? 0)
                      .mul(item.qty ?? 0)
                      .toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {promotionalCode && (
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                <p>🎁 {t("promotional_code")}:</p>
                <p className="text-gray-500">{promotionalCode.code}</p>
              </div>
              <p className="font-medium text-right text-gray-600">
                ${new Decimal(promotionalCode.amount).toFixed(2)} USD
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-end items-start pt-3">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 text-left px-4">
              <div className="grid grid-cols-10 gap-x-2">
                <p className="col-span-6">{t("subtotal")}</p>
                <p className="col-span-4 text-right text-gray-500">
                  ${new Decimal(subtotal ?? 0).toFixed(2)} USD
                </p>
              </div>
              <div className="grid grid-cols-10 gap-x-2">
                <p className="col-span-6">{t("discount")}</p>
                <p className="col-span-4 text-right text-gray-500">
                  ${new Decimal(discount ?? 0).toFixed(2)} USD
                </p>
              </div>
            </div>
            <div className="grid grid-cols-10 gap-x-2 px-4 py-3 bg-slate-100 rounded-md font-medium">
              <p className="col-span-6">{t("total")}</p>
              <p className="col-span-4 text-right">
                ${new Decimal(total ?? 0).toFixed(2)} USD
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-6">
        <div className="flex flex-col gap-0.5 text-center">
          <p className="font-medium">
            Powered by{" "}
            <a
              href="https://www.pay0.app"
              aria-label="Pay0 Network"
              target="_blank"
              rel="noreferrer noopener"
              className="text-indigo-500 font-semibold"
            >
              Pay0
            </a>
          </p>
          <div className="flex h-5 items-center gap-2">
            <a
              href="https://www.pay0.app"
              aria-label="Pay0 Network"
              target="_blank"
              rel="noreferrer noopener"
              className="text-gray-500 text-sm"
            >
              www.pay0.app
            </a>
            <div className="w-[1px] h-4 bg-gray-400" />
            <a
              href="mailto:hi@pay0.app"
              aria-label="hi@pay0.app"
              target="_blank"
              rel="noreferrer noopener"
              className="text-gray-500 text-sm"
            >
              hi@pay0.app
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceComponent;
