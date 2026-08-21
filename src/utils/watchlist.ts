/**
 * Watchlist storage — sangat sederhana, localStorage saja untuk Stage 2.
 * Belum backend, belum sync antar device. Default watch: BTC, ETH, SOL.
 */

const STORAGE_KEY = "kavelo:watchlist";
const DEFAULT_WATCHLIST = ["bitcoin", "ethereum", "solana"];

export function getWatchlist(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_WATCHLIST;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_WATCHLIST;
  } catch {
    return DEFAULT_WATCHLIST;
  }
}

export function saveWatchlist(ids: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // localStorage tidak tersedia (mis. private mode) — abaikan, non-fatal
  }
}

export function toggleWatch(current: string[], id: string): string[] {
  return current.includes(id)
    ? current.filter((item) => item !== id)
    : [...current, id];
}
