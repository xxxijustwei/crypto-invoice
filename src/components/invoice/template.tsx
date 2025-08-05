import dayjs from "dayjs";
import { AnvilIcon } from "lucide-react";
import type React from "react";
import type { Invoice } from "./types";

interface InvoiceComponentProps {
  invoice: Invoice;
}

const InvoiceComponent: React.FC<InvoiceComponentProps> = ({ invoice }) => {
  const invoiceData = invoice;

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto p-6 sm:p-10 bg-white">
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col gap-2 text-primary">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-light">Invoice #{invoiceData.num}</h1>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded">
              {invoiceData.status}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-extralight text-secondary-foreground">
              📅 Invoice Date:
            </span>
            <span className="font-medium">
              {dayjs(invoiceData.createdAt).format("MMMM D, YYYY")}
            </span>
          </div>
        </div>
        <div className="p-4 border border-gray-200 rounded-4xl">
          <AnvilIcon size={64} />
        </div>
      </div>

      <div className="h-px bg-gray-200" />

      <div className="grid grid-cols-2 gap-8 mb-6">
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-medium">👤 Pay To:</h2>
          <div className="h-full flex flex-col gap-1 p-6 rounded-md bg-slate-100 text-sm text-gray-500">
            <p className="text-lg font-medium text-primary">
              {invoiceData.payTo.company}
            </p>
            <p>test@gmail.com</p>
            <p>{invoiceData.payTo.address}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-medium">👤 Invoiced To:</h2>
          <div className="h-full flex flex-col gap-1 p-6 rounded-md bg-slate-100 text-sm text-gray-500">
            <p className="text-lg font-medium text-primary">
              {invoiceData.invoicedTo.company}
            </p>
            <p>test@gmail.com</p>
            <p>{invoiceData.invoicedTo.address}</p>
          </div>
        </div>
      </div>

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
                  📥 Description
                </th>
                <th className="p-4 text-right">💵 Unit Price</th>
                <th className="p-4 text-right">🛒 Qty</th>
                <th className="p-4 text-right rounded-tr-md rounded-br-md">
                  💰 Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-50 last:border-b-0"
                >
                  <td className="px-4 py-6">{item.name}</td>
                  <td className="px-4 py-6 text-right text-gray-500">
                    ${item.amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-6 text-right text-gray-500">
                    {item.qty}
                  </td>
                  <td className="px-4 py-6 text-right text-gray-800">
                    ${(item.amount * item.qty).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-100 rounded-md">
          <div className="flex justify-between items-center">
            <div className="flex gap-1">
              <p>🎁 Promotional Code:</p>
              <p className="text-gray-500">{invoiceData.discount.code}</p>
            </div>
            <p className="font-medium text-right text-gray-600">
              ${invoiceData.discount.amount.toFixed(2)} USD
            </p>
          </div>
        </div>

        <div className="flex justify-end items-start pt-3">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 text-left px-4">
              <div className="grid grid-cols-10 gap-x-2">
                <p className="col-span-6">Subtotal</p>
                <p className="col-span-4 text-right text-gray-500">
                  ${invoiceData.subtotal.toFixed(2)} USD
                </p>
              </div>
              <div className="grid grid-cols-10 gap-x-2">
                <p className="col-span-6">Discount</p>
                <p className="col-span-4 text-right text-gray-500">
                  ${invoiceData.discount.amount.toFixed(2)} USD
                </p>
              </div>
            </div>
            <div className="grid grid-cols-10 gap-x-2 px-4 py-3 bg-slate-100 rounded-md font-medium">
              <p className="col-span-6">Total</p>
              <p className="col-span-4 text-right">
                ${invoiceData.total.toFixed(2)} USD
              </p>
            </div>
          </div>
        </div>
      </div>

      {invoiceData.transaction && (
        <div className="flex flex-col gap-4 mb-8">
          <h2 className="text-lg font-medium">🧾 Transaction</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-xl">
              <colgroup>
                <col className="w-[22%]" />
                <col className="w-[16%]" />
                <col className="w-[10%]" />
                <col className="w-[32%]" />
                <col className="w-[20%]" />
              </colgroup>
              <thead>
                <tr className=" bg-slate-100 text-primary font-medium text-sm">
                  <th className="text-left p-4 text-gray-600 rounded-tl-md rounded-bl-md">
                    Date
                  </th>
                  <th className="text-left p-4 text-gray-600">Network</th>
                  <th className="text-left p-4 text-gray-600">Token</th>
                  <th className="text-left p-4 text-gray-600">
                    TransactionHash
                  </th>
                  <th className="text-right p-4 text-gray-600 rounded-tr-md rounded-br-md">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-3">
                    {dayjs(invoiceData.transaction.date).format(
                      "YYYY/MM/DD HH:mm",
                    )}
                  </td>
                  <td className="py-3">
                    {invoiceData.transaction.networkName}
                  </td>
                  <td className="py-3">{invoiceData.transaction.tokenName}</td>
                  <td className="py-3">
                    <p className="text-gray-400 break-all">
                      {invoiceData.transaction.txHash}
                    </p>
                  </td>
                  <td className="py-3 text-right">
                    ${invoiceData.transaction.amount.toFixed(2)} USD
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center gap-4">
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
