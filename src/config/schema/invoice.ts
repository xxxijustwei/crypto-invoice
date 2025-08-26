import { isAddress } from "@/lib/wallet-address";
import { NETWORK_CATEGORIES, NetworkMap } from "@/types/network";
import _ from "lodash";
import { z } from "zod";

export const invoiceSchema = z.object({
  status: z.enum(["Paid", "Unpaid"]),
  num: z.number().int().positive(),
  issuedAt: z.iso.datetime(),
  dueAt: z.iso.datetime().optional(),
});

export const contactInfoSchema = z.object({
  company: z.string().min(1),
  email: z.email(),
  address: z.string().min(1),
});

export const paymentMethodSchema = z
  .object({
    walletAddress: z.string(),
    networkCategory: z.enum(NETWORK_CATEGORIES),
    networks: z.array(z.string()).min(1, {
      message: "Must select at least one network",
    }),
    tokens: z.array(z.string()).min(1, {
      message: "Must select at least one token",
    }),
  })
  .superRefine((data, ctx) => {
    const { networks, networkCategory } = data;
    const unsupported = networks.filter(
      (e) => NetworkMap.get(e)?.category !== networkCategory,
    );
    if (unsupported.length > 0) {
      ctx.addIssue({
        code: "custom",
        message: `Unsupported networks: ${unsupported.join(", ")}`,
        path: ["networks"],
      });
    }
  })
  .superRefine((data, ctx) => {
    const { networks, tokens } = data;
    const availableTokens = _.intersection(
      ...networks.map((e) => NetworkMap.get(e)?.stableCoins ?? []),
    );
    const unsupported = _.difference(tokens, availableTokens);

    if (unsupported.length > 0) {
      ctx.addIssue({
        code: "custom",
        message: `Unsupported tokens: ${unsupported.join(", ")}`,
        path: ["tokens"],
      });
    }
  })
  .superRefine((data, ctx) => {
    const { walletAddress, networkCategory } = data;

    const isValid = isAddress(walletAddress, networkCategory);
    if (!isValid) {
      ctx.addIssue({
        code: "custom",
        message: `Invalid ${networkCategory} wallet address`,
        path: ["walletAddress"],
      });
    }
  });
