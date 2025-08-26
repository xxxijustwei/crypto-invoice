export const NETWORK_CATEGORIES = ["evm", "tron", "solana"] as const;
export type NetworkCategory = (typeof NETWORK_CATEGORIES)[number];

export const Networks: {
  id: string;
  category: NetworkCategory;
  stableCoins: string[];
}[] = [
  {
    id: "Arbitrum",
    category: "evm",
    stableCoins: ["USDT", "USDC", "DAI", "FDUSD", "USDe", "USDS"],
  },
  { id: "Avalanche", category: "evm", stableCoins: ["USDT", "USDC", "DAI"] },
  {
    id: "Base",
    category: "evm",
    stableCoins: ["USDT", "USDC", "DAI", "USDe", "USDS"],
  },
  {
    id: "BSC",
    category: "evm",
    stableCoins: ["USDT", "USDC", "DAI", "FDUSD", "USDe"],
  },
  {
    id: "Ethereum",
    category: "evm",
    stableCoins: ["USDT", "USDC", "DAI", "FDUSD", "USDe", "USDS"],
  },
  {
    id: "Solana",
    category: "solana",
    stableCoins: ["USDT", "USDC", "FDUSD", "USDe", "USDS"],
  },
  { id: "Tron", category: "tron", stableCoins: ["USDT", "USDC"] },
] as const;
export const NetworkMap = new Map(
  Networks.map((e) => [
    e.id,
    { category: e.category, stableCoins: e.stableCoins },
  ]),
);
export const Tokens = ["USDT", "USDC", "DAI", "FDUSD", "USDe", "USDS"] as const;
