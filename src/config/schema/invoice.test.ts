import { describe, expect, it } from "vitest";
import { paymentMethodSchema } from "./invoice";

describe("paymentMethodSchema", () => {
  describe("valid cases", () => {
    it("should validate correct EVM payment method", () => {
      const validData = {
        walletAddress: "0xa84c57e9966df7df79bff42f35c68aae71796f64",
        networkCategory: "evm",
        networks: ["Ethereum", "Arbitrum"],
        tokens: ["USDT", "USDC", "DAI"],
      };

      const result = paymentMethodSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should validate correct Tron payment method", () => {
      const validData = {
        walletAddress: "TL2ScqgY9ckK5h1VQExuMNrweyVSSdAtHa",
        networkCategory: "tron",
        networks: ["Tron"],
        tokens: ["USDT", "USDC"],
      };

      const result = paymentMethodSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should validate correct Solana payment method", () => {
      const validData = {
        walletAddress: "FQh8Vkasb6h173nJ7mXmHwmbV7DX81N6jXBaNQNaP5RA",
        networkCategory: "solana",
        networks: ["Solana"],
        tokens: ["USDT", "USDC", "USDS"],
      };

      const result = paymentMethodSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should validate with single network and single token", () => {
      const validData = {
        walletAddress: "0xa84c57e9966df7df79bff42f35c68aae71796f64",
        networkCategory: "evm",
        networks: ["Ethereum"],
        tokens: ["USDT"],
      };

      const result = paymentMethodSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe("invalid wallet addresses", () => {
    it("should reject invalid EVM address format", () => {
      const invalidData = {
        walletAddress: "0xinvalidaddress",
        networkCategory: "evm",
        networks: ["Ethereum"],
        tokens: ["USDT"],
      };

      const result = paymentMethodSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(["walletAddress"]);
        expect(result.error.issues[0].message).toBe(
          "Invalid evm wallet address",
        );
      }
    });

    it("should reject invalid Tron address", () => {
      const invalidData = {
        walletAddress: "TInvalidTronAddress123",
        networkCategory: "tron",
        networks: ["Tron"],
        tokens: ["USDT"],
      };

      const result = paymentMethodSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(["walletAddress"]);
        expect(result.error.issues[0].message).toBe(
          "Invalid tron wallet address",
        );
      }
    });

    it("should reject invalid Solana address", () => {
      const invalidData = {
        walletAddress: "InvalidSolanaAddress",
        networkCategory: "solana",
        networks: ["Solana"],
        tokens: ["USDT"],
      };

      const result = paymentMethodSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(["walletAddress"]);
        expect(result.error.issues[0].message).toBe(
          "Invalid solana wallet address",
        );
      }
    });

    it("should reject address with mismatched network category", () => {
      const invalidData = {
        walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7",
        networkCategory: "tron",
        networks: ["Tron"],
        tokens: ["USDT"],
      };

      const result = paymentMethodSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(["walletAddress"]);
        expect(result.error.issues[0].message).toBe(
          "Invalid tron wallet address",
        );
      }
    });
  });

  describe("invalid tokens", () => {
    it("should reject tokens not supported by selected networks", () => {
      const invalidData = {
        walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7",
        networkCategory: "evm",
        networks: ["Ethereum"],
        tokens: ["USDT", "INVALID_TOKEN"],
      };

      const result = paymentMethodSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(["tokens"]);
        expect(result.error.issues[0].message).toBe(
          "Unsupported tokens: INVALID_TOKEN",
        );
      }
    });

    it("should reject token only available on some selected networks", () => {
      const invalidData = {
        walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7",
        networkCategory: "evm",
        networks: ["Ethereum", "Avalanche"],
        tokens: ["USDT", "FDUSD"],
      };

      const result = paymentMethodSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(["tokens"]);
        expect(result.error.issues[0].message).toBe(
          "Unsupported tokens: FDUSD",
        );
      }
    });

    it("should reject empty tokens array", () => {
      const invalidData = {
        walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7",
        networkCategory: "evm",
        networks: ["Ethereum"],
        tokens: [],
      };

      const result = paymentMethodSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Must select at least one token",
        );
      }
    });
  });

  describe("invalid networks", () => {
    it("should reject empty networks array", () => {
      const invalidData = {
        walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7",
        networkCategory: "evm",
        networks: [],
        tokens: ["USDT"],
      };

      const result = paymentMethodSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Must select at least one network",
        );
      }
    });

    it("should reject non-existent network", () => {
      const invalidData = {
        walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7",
        networkCategory: "evm",
        networks: ["InvalidNetwork"],
        tokens: ["USDT"],
      };

      const result = paymentMethodSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(["networks"]);
        expect(result.error.issues[0].message).toBe(
          "Unsupported networks: InvalidNetwork",
        );
      }
    });

    it("should reject networks with different network category", () => {
      const invalidData = {
        walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7",
        networkCategory: "evm",
        networks: ["Tron"],
        tokens: ["USDT"],
      };

      const result = paymentMethodSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(["networks"]);
        expect(result.error.issues[0].message).toBe(
          "Unsupported networks: Tron",
        );
      }
    });
  });

  describe("missing required fields", () => {
    it("should reject missing walletAddress", () => {
      const invalidData = {
        networkCategory: "evm",
        networks: ["Ethereum"],
        tokens: ["USDT"],
      };

      const result = paymentMethodSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should reject missing networkCategory", () => {
      const invalidData = {
        walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7",
        networks: ["Ethereum"],
        tokens: ["USDT"],
      };

      const result = paymentMethodSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should reject missing networks", () => {
      const invalidData = {
        walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7",
        networkCategory: "evm",
        tokens: ["USDT"],
      };

      const result = paymentMethodSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should reject missing tokens", () => {
      const invalidData = {
        walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7",
        networkCategory: "evm",
        networks: ["Ethereum"],
      };

      const result = paymentMethodSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
});
