import dayjs from "dayjs";
import type React from "react";
import { useMemo } from "react";
import type { Invoice } from "./types";

interface InvoiceComponentProps {
  invoice: Invoice;
}

const InvoiceComponent: React.FC<InvoiceComponentProps> = ({ invoice }) => {
  const invoiceData = invoice;

  const subtotal = useMemo(
    () =>
      invoiceData.items.reduce((sum, item) => sum + item.amount * item.qty, 0),
    [invoiceData.items],
  );
  const discountAmount = useMemo(
    () => invoiceData.discount.amount,
    [invoiceData.discount.amount],
  );
  const total = useMemo(
    () => subtotal + discountAmount,
    [subtotal, discountAmount],
  );

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white">
      {/* Header */}
      <div className="flex justify-end items-start mb-12">
        <div className="flex flex-col gap-2 text-right text-gray-600">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-light">Invoice #{invoiceData.num}</h1>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded">
              {invoiceData.status}
            </span>
          </div>
          <div className="grid grid-cols-6 gap-x-2">
            <span className="col-span-3">Invoice Date:</span>
            <span className="col-span-3 text-gray-400">
              {dayjs(invoiceData.createdAt).format("YYYY/MM/DD HH:mm")}
            </span>
          </div>
        </div>
      </div>

      {/* Billing Information */}
      <div className="grid grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-lg font-medium mb-3">Pay To:</h2>
          <div className="text-gray-600">
            <p>{invoiceData.payTo.company}</p>
            <p>{invoiceData.payTo.address}</p>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-medium mb-3">Invoiced To:</h2>
          <div className="text-gray-600">
            <p>{invoiceData.invoicedTo.company}</p>
            <p>{invoiceData.invoicedTo.address}</p>
            <p>{invoiceData.invoicedTo.country}</p>
          </div>
        </div>
      </div>

      {/* Invoice Items */}
      <div className="mb-12">
        <h2 className="text-lg font-medium mb-6">Invoice Items</h2>
        <div className="border-t border-gray-300">
          <div className="py-4 grid grid-cols-12 gap-4">
            <div className="col-span-7">
              <p className="text-gray-500 mb-1">Description</p>
            </div>
            <div className="col-span-1 text-center">
              <p className="text-gray-500">Qty</p>
            </div>
            <div className="col-span-2 text-right">
              <p className="text-gray-500">Unit Price</p>
            </div>
            <div className="col-span-2 text-right">
              <p className="text-gray-500">Amount</p>
            </div>
          </div>

          {invoiceData.items.map((item, index) => (
            <div key={index} className="py-4 border-t border-gray-300">
              <div className="grid grid-cols-12 gap-4 items-start">
                <div className="col-span-7">
                  <p className="mb-2">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.detail}</p>
                </div>
                <div className="col-span-1 text-center text-gray-600">
                  <p>{item.qty}</p>
                </div>
                <div className="col-span-2 text-right text-gray-600">
                  <p>${item.amount.toFixed(2)}</p>
                </div>
                <div className="col-span-2 text-right text-gray-600">
                  <p>${(item.amount * item.qty).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Discount */}
          <div className="py-4 border-t border-b border-gray-300">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <p>Promotional Code:</p>
                <p className="text-gray-500">{invoiceData.discount.code}</p>
              </div>
              <p className="font-medium text-right text-gray-600">
                ${invoiceData.discount.amount.toFixed(2)} USD
              </p>
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end items-start pt-4">
            <div className="flex flex-col gap-2 text-left text-lg">
              <div className="grid grid-cols-6 gap-x-2 text-gray-700 font-normal">
                <p className="col-span-3">Sub Total</p>
                <p className="col-span-3 text-right">
                  ${subtotal.toFixed(2)} USD
                </p>
              </div>
              <div className="grid grid-cols-6 gap-x-2 font-medium">
                <p className="col-span-3">Total</p>
                <p className="col-span-3 text-right">${total.toFixed(2)} USD</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions */}
      {invoiceData.transaction && (
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-6">Transaction</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-gray-600 font-normal">
                    Date
                  </th>
                  <th className="text-left py-3 text-gray-600 font-normal">
                    Network
                  </th>
                  <th className="text-left py-3 text-gray-600 font-normal">
                    Token
                  </th>
                  <th className="text-right py-3 text-gray-600 font-normal">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3">
                    {dayjs(invoiceData.transaction.date).format(
                      "YYYY/MM/DD HH:mm",
                    )}
                  </td>
                  <td className="py-3">
                    {invoiceData.transaction.networkName}
                  </td>
                  <td className="py-3">{invoiceData.transaction.tokenName}</td>
                  <td className="py-3 text-right">
                    ${invoiceData.transaction.amount.toFixed(2)} USD
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center text-gray-600">
            <p>Transaction Hash</p>
            <p className="text-gray-400">{invoiceData.transaction.txHash}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceComponent;
