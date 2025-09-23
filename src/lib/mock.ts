import type { Invoice } from "@/components/invoice/types";
import { NetworkMap, Networks } from "@/types/network";
import {
  rand,
  randAddress,
  randBetweenDate,
  randBic,
  randEmail,
  randEthereumAddress,
  randFullName,
  randNumber,
  randProductName,
  randRecentDate,
  randUuid,
  seed,
} from "@ngneat/falso";
import { Decimal } from "decimal.js";
import _ from "lodash";

export const getMockInvoice = (type: "Paid" | "Unpaid" = "Unpaid"): Invoice => {
  const issuedDate = randRecentDate();
  const dueDate = new Date(
    issuedDate.getTime() +
      randNumber({ min: 1, max: 30 }) * 24 * 60 * 60 * 1000,
  );

  const chainCateogry = rand([
    ...new Set(Networks.map((network) => network.category)),
  ]);
  const networks = Networks.filter(
    (network) => network.category === chainCateogry,
  ).map((network) => network.id);
  const tokens = _.intersection(
    ...networks.map((network) => NetworkMap.get(network)?.stableCoins ?? []),
  );

  const walletAddress =
    {
      evm: "0x6a569215be90A55B4c615368fCB13F75d99c8A60",
      solana: "6b54r1s3FYuRg3qDguyNEK7vr62TtbrPgFeXU6YC1YmQ",
      tron: "TFgphAx29XEwrS8feFMpPfqzypjYzNysSH",
    }[chainCateogry] ?? randEthereumAddress();

  const invoice = {
    id: randUuid(),
    status: type,
    num: randNumber({ min: 100, max: 999 }),
    issuedAt: issuedDate.toISOString(),
    dueAt: dueDate.toISOString(),
    payTo: mockAddress(),
    invoicedTo: mockAddress(),
    paymentMethod: {
      walletAddress: walletAddress,
      networks: networks,
      tokens: tokens,
    },
    items: Array.from({ length: randNumber({ min: 1, max: 5 }) }, () => ({
      name: randProductName(),
      qty: randNumber({ min: 1, max: 10 }),
      amount: randNumber({ min: 200, max: 1000 }),
    })),
    promotionalCode: {
      code: randBic(),
      amount: -randNumber({ min: 1, max: 100 }),
    },
    transaction: {
      networkName: rand(networks),
      tokenName: rand(tokens),
      txHash:
        "0x88521cc890ec93853f55f2985cbd5e66b62f51a17b4e1dff1e13dbb08fd7fbb6",
      amount: 15.82,
      date: randRecentDate().toISOString(),
    },
  };

  const subtotal = invoice.items.reduce(
    (sum, item) => sum.add(new Decimal(item.amount).mul(item.qty)),
    new Decimal(0),
  );
  const discount = new Decimal(invoice.promotionalCode?.amount ?? 0);
  const total = subtotal.add(discount);

  return {
    ...invoice,
    ...(type === "Paid" && {
      transaction: {
        networkName: "Ethereum",
        tokenName: "USDT",
        txHash:
          "0x88521cc890ec93853f55f2985cbd5e66b62f51a17b4e1dff1e13dbb08fd7fbb6",
        amount: 15.82,
        date: randBetweenDate({
          from: issuedDate,
          to: dueDate,
        }).toISOString(),
      },
    }),
    subtotal: subtotal.toNumber(),
    discount: discount.toNumber(),
    total: total.toNumber(),
  };
};

const mockAddress = () => {
  const address = randAddress();
  return {
    company: randFullName(),
    email: randEmail(),
    address: `${address.street}, ${address.city}, ${address.country}`,
  };
};
