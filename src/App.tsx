import { useMarketOverview, useTopMovers, useAssetData } from "./hooks/useMarketData";
import { formatCompactNumber, formatPercent, formatPrice, priceChangeColorClass } from "./utils/formatters";

/**
 * STAGE 1 TEST HARNESS
 * --------------------
 * Ini BUKAN Dashboard final. Halaman ini hanya untuk memverifikasi bahwa
 * marketDataService + hooks berjalan benar (data asli, demo fallback,
 * loading, dan error state). Dashboard UI sesungguhnya dibangun di Stage
 * berikutnya.
 */
export default function App() {
  const overview = useMarketOverview();
  const movers = useTopMovers(5);
  const btc = useAssetData("bitcoin");

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-4 md:p-8 space-y-6">
      <header>
        <h1 className="text-xl font-semibold">Kavelo Crypto Intelligence</h1>
        <p className="text-sm text-neutral-400">
          Stage 1 — data layer test harness
        </p>
      </header>

      {/* MARKET OVERVIEW */}
      <section className="rounded-xl border border-neutral-800 p-4">
        <h2 className="text-sm font-medium text-neutral-400 mb-3">
          Market Overview
        </h2>

        {overview.loading && <p className="text-sm">Loading market overview…</p>}

        {!overview.loading && overview.error && !overview.data && (
          <p className="text-sm text-rose-400">
            Market data temporarily unavailable. ({overview.error})
          </p>
        )}

        {!overview.loading && overview.data && (
          <div className="space-y-2">
            {overview.isDemo && (
              <span className="inline-block text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                DEMO DATA — bukan harga real-time
              </span>
            )}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-neutral-400">BTC</p>
                <p>{formatPrice(overview.data.btcPrice)}</p>
                <p className={priceChangeColorClass(overview.data.btcChange24h)}>
                  {formatPercent(overview.data.btcChange24h)}
                </p>
              </div>
              <div>
                <p className="text-neutral-400">ETH</p>
                <p>{formatPrice(overview.data.ethPrice)}</p>
                <p className={priceChangeColorClass(overview.data.ethChange24h)}>
                  {formatPercent(overview.data.ethChange24h)}
                </p>
              </div>
              <div>
                <p className="text-neutral-400">Total Market Cap</p>
                <p>{formatCompactNumber(overview.data.totalMarketCap)}</p>
              </div>
              <div>
                <p className="text-neutral-400">24h Volume</p>
                <p>{formatCompactNumber(overview.data.totalVolume24h)}</p>
              </div>
              <div>
                <p className="text-neutral-400">BTC Dominance</p>
                <p>{overview.data.btcDominance.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-neutral-400">Fear &amp; Greed</p>
                <p>
                  {overview.data.fearGreedIndex ?? "—"}{" "}
                  {overview.data.fearGreedLabel ?? ""}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* TOP MOVERS */}
      <section className="rounded-xl border border-neutral-800 p-4">
        <h2 className="text-sm font-medium text-neutral-400 mb-3">
          Top Movers (24h)
        </h2>

        {movers.loading && <p className="text-sm">Loading top movers…</p>}

        {!movers.loading && movers.data && movers.data.length === 0 && (
          <p className="text-sm text-neutral-400">Tidak ada data top movers.</p>
        )}

        {!movers.loading && movers.data && movers.data.length > 0 && (
          <div className="space-y-1">
            {movers.isDemo && (
              <span className="inline-block text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 mb-2">
                DEMO DATA
              </span>
            )}
            <ul className="text-sm divide-y divide-neutral-800">
              {movers.data.map((m) => (
                <li key={m.id} className="flex justify-between py-1.5">
                  <span>
                    {m.name} <span className="text-neutral-500">({m.symbol})</span>
                  </span>
                  <span className={priceChangeColorClass(m.priceChange24h)}>
                    {formatPercent(m.priceChange24h)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* SINGLE ASSET TEST — BTC */}
      <section className="rounded-xl border border-neutral-800 p-4">
        <h2 className="text-sm font-medium text-neutral-400 mb-3">
          Asset Test — Bitcoin
        </h2>

        {btc.loading && <p className="text-sm">Loading asset data…</p>}

        {!btc.loading && btc.data && (
          <div className="text-sm space-y-1">
            {btc.isDemo && (
              <span className="inline-block text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                DEMO DATA
              </span>
            )}
            <p>
              {btc.data.name} ({btc.data.symbol}) · Rank #{btc.data.marketCapRank}
            </p>
            <p>Price: {formatPrice(btc.data.price)}</p>
            <p>Market Cap: {formatCompactNumber(btc.data.marketCap)}</p>
            <p>Volume 24h: {formatCompactNumber(btc.data.volume24h)}</p>
          </div>
        )}

        {!btc.loading && !btc.data && (
          <p className="text-sm text-rose-400">Asset data unavailable.</p>
        )}
      </section>
    </div>
  );
}
