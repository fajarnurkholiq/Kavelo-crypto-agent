/**
 * marketDataService
 * ------------------
 * Abstraction layer untuk semua kebutuhan market data.
 *
 * Tujuan:
 * - UI TIDAK PERNAH fetch API langsung. UI hanya bicara dengan service ini.
 * - Provider (saat ini CoinGecko) bisa diganti tanpa mengubah UI,
 *   selama bentuk return `ServiceResult<T>` tetap sama.
 * - Setiap kegagalan (network error, rate limit, config kosong) SELALU
 *   fallback ke DEMO_DATA, dan fallback ini TIDAK SILENT — ditandai
 *   lewat field `isDemo: true` pada hasilnya.
 */

import {
  DEMO_ASSETS,
  DEMO_MARKET_OVERVIEW,
  DEMO_TOP_MOVERS,
} from "../data/demoData";

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------

export interface MarketOverview {
  btcPrice: number;
  btcChange24h: number;
  ethPrice: number;
  ethChange24h: number;
  totalMarketCap: number;
  totalVolume24h: number;
  btcDominance: number;
  fearGreedIndex: number | null;
  fearGreedLabel: string | null;
  isDemo: boolean;
}

export interface TopMover {
  id: string;
  symbol: string;
  name: string;
  price: number;
  priceChange24h: number;
  isDemo: boolean;
}

export interface AssetData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  priceChange24h: number;
  marketCap: number;
  volume24h: number;
  marketCapRank: number;
  isDemo: boolean;
}

/**
 * Bentuk hasil standar dari SEMUA fungsi service.
 * UI selalu bisa mengandalkan bentuk ini untuk menampilkan
 * loading/error/demo state secara konsisten.
 */
export interface ServiceResult<T> {
  data: T | null;
  isDemo: boolean;
  loading: false; // hasil akhir (bukan mid-flight state) selalu false di sini
  error: string | null;
}

// ---------------------------------------------------------------------------
// CONFIG
// ---------------------------------------------------------------------------

const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3";
const FEAR_GREED_URL = "https://api.alternative.me/fng/?limit=1";

// API key opsional untuk tier gratis CoinGecko. Jika kosong, tetap jalan
// tanpa header — hanya rate limit lebih ketat.
const COINGECKO_API_KEY = import.meta.env.VITE_COINGECKO_API_KEY as
  | string
  | undefined;

const FETCH_TIMEOUT_MS = 8000;

// ---------------------------------------------------------------------------
// INTERNAL HELPERS
// ---------------------------------------------------------------------------

/**
 * fetch dengan timeout, supaya request yang menggantung tidak membuat
 * UI stuck di loading state selamanya.
 */
async function fetchWithTimeout(
  url: string,
  timeoutMs: number = FETCH_TIMEOUT_MS
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const headers: Record<string, string> = {};
    if (COINGECKO_API_KEY) {
      headers["x-cg-demo-api-key"] = COINGECKO_API_KEY;
    }

    const response = await fetch(url, {
      signal: controller.signal,
      headers,
    });

    if (!response.ok) {
      throw new Error(
        `Request gagal (${response.status} ${response.statusText})`
      );
    }

    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

function toErrorMessage(err: unknown): string {
  if (err instanceof DOMException && err.name === "AbortError") {
    return "Request timeout — market data tidak merespons.";
  }
  if (err instanceof Error) {
    return err.message;
  }
  return "Terjadi error yang tidak diketahui saat mengambil market data.";
}

// ---------------------------------------------------------------------------
// PUBLIC API
// ---------------------------------------------------------------------------

/**
 * Ambil ringkasan market: BTC/ETH price + change, total market cap,
 * total volume, BTC dominance, dan Fear & Greed Index.
 *
 * Menggabungkan 2 endpoint:
 * - CoinGecko /global untuk market cap, volume, dominance
 * - CoinGecko /simple/price untuk harga BTC & ETH
 * - alternative.me untuk Fear & Greed Index (best-effort, boleh gagal
 *   sendiri tanpa menggagalkan seluruh overview)
 */
export async function getMarketOverview(): Promise<
  ServiceResult<MarketOverview>
> {
  try {
    const [globalRes, priceRes] = await Promise.all([
      fetchWithTimeout(`${COINGECKO_BASE_URL}/global`),
      fetchWithTimeout(
        `${COINGECKO_BASE_URL}/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true`
      ),
    ]);

    const globalJson = await globalRes.json();
    const priceJson = await priceRes.json();

    const g = globalJson?.data;
    if (!g || !priceJson?.bitcoin || !priceJson?.ethereum) {
      throw new Error("Format response market data tidak sesuai.");
    }

    // Fear & Greed diambil terpisah, best-effort (tidak boleh menjatuhkan
    // seluruh overview kalau endpoint ini gagal/lambat).
    let fearGreedIndex: number | null = null;
    let fearGreedLabel: string | null = null;
    try {
      const fngRes = await fetchWithTimeout(FEAR_GREED_URL, 5000);
      const fngJson = await fngRes.json();
      const entry = fngJson?.data?.[0];
      if (entry) {
        fearGreedIndex = Number(entry.value);
        fearGreedLabel = String(entry.value_classification);
      }
    } catch {
      // sengaja diabaikan — overview tetap valid tanpa fear & greed
    }

    const overview: MarketOverview = {
      btcPrice: priceJson.bitcoin.usd,
      btcChange24h: priceJson.bitcoin.usd_24h_change ?? 0,
      ethPrice: priceJson.ethereum.usd,
      ethChange24h: priceJson.ethereum.usd_24h_change ?? 0,
      totalMarketCap: g.total_market_cap?.usd ?? 0,
      totalVolume24h: g.total_volume?.usd ?? 0,
      btcDominance: g.market_cap_percentage?.btc ?? 0,
      fearGreedIndex,
      fearGreedLabel,
      isDemo: false,
    };

    return { data: overview, isDemo: false, loading: false, error: null };
  } catch (err) {
    return {
      data: DEMO_MARKET_OVERVIEW,
      isDemo: true,
      loading: false,
      error: toErrorMessage(err),
    };
  }
}

/**
 * Ambil daftar top movers (24h) dari 100 koin market cap teratas.
 * limit membatasi jumlah hasil yang dikembalikan (default 5).
 */
export async function getTopMovers(
  limit: number = 5
): Promise<ServiceResult<TopMover[]>> {
  try {
    const res = await fetchWithTimeout(
      `${COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&price_change_percentage=24h`
    );
    const json = await res.json();

    if (!Array.isArray(json)) {
      throw new Error("Format response top movers tidak sesuai.");
    }

    const movers: TopMover[] = [...json]
      .sort(
        (a, b) =>
          Math.abs(b.price_change_percentage_24h ?? 0) -
          Math.abs(a.price_change_percentage_24h ?? 0)
      )
      .slice(0, limit)
      .map((coin) => ({
        id: coin.id,
        symbol: String(coin.symbol).toUpperCase(),
        name: coin.name,
        price: coin.current_price ?? 0,
        priceChange24h: coin.price_change_percentage_24h ?? 0,
        isDemo: false,
      }));

    return { data: movers, isDemo: false, loading: false, error: null };
  } catch (err) {
    return {
      data: DEMO_TOP_MOVERS,
      isDemo: true,
      loading: false,
      error: toErrorMessage(err),
    };
  }
}

/**
 * Ambil detail satu aset berdasarkan CoinGecko id (mis. "bitcoin", "ethereum", "solana").
 */
export async function getAssetData(
  assetId: string
): Promise<ServiceResult<AssetData>> {
  try {
    const res = await fetchWithTimeout(
      `${COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&ids=${encodeURIComponent(
        assetId
      )}`
    );
    const json = await res.json();
    const coin = Array.isArray(json) ? json[0] : null;

    if (!coin) {
      throw new Error(`Aset "${assetId}" tidak ditemukan.`);
    }

    const asset: AssetData = {
      id: coin.id,
      symbol: String(coin.symbol).toUpperCase(),
      name: coin.name,
      price: coin.current_price,
      priceChange24h: coin.price_change_percentage_24h ?? 0,
      marketCap: coin.market_cap ?? 0,
      volume24h: coin.total_volume ?? 0,
      marketCapRank: coin.market_cap_rank ?? 0,
      isDemo: false,
    };

    return { data: asset, isDemo: false, loading: false, error: null };
  } catch (err) {
    const fallback = DEMO_ASSETS[assetId] ?? null;
    return {
      data: fallback,
      isDemo: true,
      loading: false,
      error: toErrorMessage(err),
    };
  }
}
