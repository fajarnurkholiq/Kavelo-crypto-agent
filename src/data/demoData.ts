/**
 * DEMO DATA
 * ---------
 * Data ini BUKAN data real-time. Hanya digunakan sebagai fallback ketika:
 * - API market data gagal diakses
 * - API mengalami rate limit
 * - konfigurasi/API key tidak tersedia
 *
 * Setiap tipe di sini punya field `isDemo` yang WAJIB dibaca oleh UI
 * agar user tahu data yang tampil bukan data real-time.
 *
 * JANGAN gunakan file ini sebagai sumber data produksi.
 */

import type { AssetData, MarketOverview, TopMover } from "../services/marketDataService";

export const DEMO_MARKET_OVERVIEW: MarketOverview = {
  btcPrice: 65000,
  btcChange24h: 1.8,
  ethPrice: 3400,
  ethChange24h: -0.6,
  totalMarketCap: 2450000000000,
  totalVolume24h: 98000000000,
  btcDominance: 52.3,
  fearGreedIndex: 58,
  fearGreedLabel: "Greed",
  isDemo: true,
};

export const DEMO_TOP_MOVERS: TopMover[] = [
  { id: "solana", symbol: "SOL", name: "Solana", price: 145, priceChange24h: 8.4, isDemo: true },
  { id: "avalanche-2", symbol: "AVAX", name: "Avalanche", price: 27.4, priceChange24h: 6.1, isDemo: true },
  { id: "chainlink", symbol: "LINK", name: "Chainlink", price: 13.9, priceChange24h: -5.3, isDemo: true },
];

export const DEMO_ASSETS: Record<string, AssetData> = {
  bitcoin: {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    price: 65000,
    priceChange24h: 1.8,
    marketCap: 1280000000000,
    volume24h: 32000000000,
    marketCapRank: 1,
    isDemo: true,
  },
  ethereum: {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    price: 3400,
    priceChange24h: -0.6,
    marketCap: 410000000000,
    volume24h: 15000000000,
    marketCapRank: 2,
    isDemo: true,
  },
  solana: {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    price: 145,
    priceChange24h: 8.4,
    marketCap: 68000000000,
    volume24h: 3200000000,
    marketCapRank: 5,
    isDemo: true,
  },
};
