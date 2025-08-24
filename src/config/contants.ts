export const Networks = [
  { id: "Arbitrum", category: "EVM" },
  { id: "Avalanche", category: "EVM" },
  { id: "Base", category: "EVM" },
  { id: "BSC", category: "EVM" },
  { id: "Ethereum", category: "EVM" },
  { id: "Solana", category: "SOL" },
  { id: "Tron", category: "TVM" },
];

export const Tokens = [
  {
    id: "USDT",
    availableNetworks: [
      "Ethereum",
      "BSC",
      "Arbitrum",
      "Avalanche",
      "Base",
      "Solana",
      "Tron",
    ],
  },
  {
    id: "USDC",
    availableNetworks: [
      "Ethereum",
      "BSC",
      "Arbitrum",
      "Avalanche",
      "Base",
      "Solana",
      "Tron",
    ],
  },
  {
    id: "DAI",
    availableNetworks: ["Ethereum", "BSC", "Arbitrum", "Avalanche", "Base"],
  },
  {
    id: "FDUSD",
    availableNetworks: ["Ethereum", "BSC", "Arbitrum", "Solana"],
  },
  {
    id: "USDe",
    availableNetworks: ["Ethereum", "BSC", "Arbitrum", "Base", "Solana"],
  },
  {
    id: "USDS",
    availableNetworks: ["Ethereum", "Arbitrum", "Base", "Solana"],
  },
];
