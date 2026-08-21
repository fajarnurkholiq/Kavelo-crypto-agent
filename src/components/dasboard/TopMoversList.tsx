import type { TopMover } from "../../services/marketDataService";
import { formatPercent, formatPrice, priceChangeColorClass } from "../../utils/formatters";
import LoadingState from "../shared/LoadingState";
import ErrorState from "../shared/ErrorState";
import DemoDataBadge from "../shared/DemoDataBadge";

interface TopMoversListProps {
  data: TopMover[] | null;
  loading: boolean;
  error: string | null;
  isDemo: boolean;
  onRetry: () => void;
}

function AssetGlyph({ symbol }: { symbol: string }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-raised font-mono text-[11px] text-ink-muted">
      {symbol.slice(0, 2)}
    </span>
  );
}

export default function TopMoversList({
  data,
  loading,
  error,
  isDemo,
  onRetry,
}: TopMoversListProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[11px] uppercase tracking-wide text-ink-muted">Top Movers</p>
        {isDemo && data && data.length > 0 && <DemoDataBadge />}
      </div>

      {loading && <LoadingState rows={3} label="Memuat top movers" />}

      {!loading && (!data || data.length === 0) && (
        <ErrorState message={error ?? "Belum ada data top movers."} onRetry={onRetry} />
      )}

      {!loading && data && data.length > 0 && (
        <ul className="divide-y divide-border -mx-1">
          {data.map((mover) => (
            <li key={mover.id} className="flex items-center gap-3 px-1 py-2.5">
              <AssetGlyph symbol={mover.symbol} />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-ink truncate">{mover.name}</p>
                <p className="text-xs text-ink-faint font-mono">{mover.symbol}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-mono text-sm text-ink">{formatPrice(mover.price)}</p>
                <p className={`font-mono text-xs ${priceChangeColorClass(mover.priceChange24h)}`}>
                  {formatPercent(mover.priceChange24h)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
