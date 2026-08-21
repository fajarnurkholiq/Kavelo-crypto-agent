import { useEffect, useState } from "react";
import { useMultipleAssets } from "../../hooks/useMarketData";
import { getWatchlist, saveWatchlist, toggleWatch } from "../../utils/watchlist";
import { formatPercent, formatPrice, priceChangeColorClass } from "../../utils/formatters";
import LoadingState from "../shared/LoadingState";
import DemoDataBadge from "../shared/DemoDataBadge";
import { IconStarFilled, IconStarOutline } from "../shared/icons";

const AVAILABLE_ASSETS = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin" },
  { id: "ethereum", symbol: "ETH", name: "Ethereum" },
  { id: "solana", symbol: "SOL", name: "Solana" },
];

/**
 * Watchlist sederhana untuk Stage 2: fixed set BTC/ETH/SOL, disimpan
 * di localStorage, tanpa backend/login. User bisa toggle aset masuk/
 * keluar watchlist lewat ikon bintang.
 */
export default function WatchlistPreview() {
  const [watchIds, setWatchIds] = useState<string[]>(() => getWatchlist());
  const { data, loading, isDemo } = useMultipleAssets(watchIds);

  useEffect(() => {
    saveWatchlist(watchIds);
  }, [watchIds]);

  const handleToggle = (id: string) => {
    setWatchIds((prev) => toggleWatch(prev, id));
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[11px] uppercase tracking-wide text-ink-muted">Watchlist</p>
        {isDemo && watchIds.length > 0 && <DemoDataBadge />}
      </div>

      {loading && watchIds.length > 0 && <LoadingState rows={3} label="Memuat watchlist" />}

      {!loading && watchIds.length === 0 && (
        <p className="text-sm text-ink-muted">Belum ada aset di watchlist.</p>
      )}

      {!loading && data && data.length > 0 && (
        <ul className="divide-y divide-border -mx-1">
          {data.map((asset) => (
            <li key={asset.id} className="flex items-center gap-3 px-1 py-2.5">
              <button
                type="button"
                onClick={() => handleToggle(asset.id)}
                aria-label={`Hapus ${asset.name} dari watchlist`}
                className="text-accent shrink-0"
              >
                <IconStarFilled />
              </button>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-ink truncate">{asset.name}</p>
                <p className="text-xs text-ink-faint font-mono">{asset.symbol}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-mono text-sm text-ink">{formatPrice(asset.price)}</p>
                <p className={`font-mono text-xs ${priceChangeColorClass(asset.priceChange24h)}`}>
                  {formatPercent(asset.priceChange24h)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Aset yang belum di-watch, bisa ditambahkan kembali */}
      {AVAILABLE_ASSETS.some((a) => !watchIds.includes(a.id)) && (
        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border">
          {AVAILABLE_ASSETS.filter((a) => !watchIds.includes(a.id)).map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => handleToggle(a.id)}
              className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs text-ink-muted hover:text-ink hover:border-ink-faint transition-colors"
            >
              <IconStarOutline className="h-3.5 w-3.5" />
              {a.symbol}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
