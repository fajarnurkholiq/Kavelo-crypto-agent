import type { MarketOverview, TopMover } from "../../services/marketDataService";
import { formatPercent, formatPrice, priceChangeColorClass } from "../../utils/formatters";

interface MarketTickerProps {
  overview: MarketOverview | null;
  movers: TopMover[] | null;
  loading: boolean;
}

/**
 * Ticker tape horizontal, gaya terminal finansial klasik.
 * Elemen signature dashboard — bukan dekorasi, isinya data real
 * (BTC/ETH + top movers) yang sama dengan section lain, hanya format lain.
 * Berhenti bergerak jika prefers-reduced-motion aktif (lihat index.css).
 */
export default function MarketTicker({ overview, movers, loading }: MarketTickerProps) {
  if (loading || !overview) {
    return (
      <div className="h-9 flex items-center px-4 border-y border-border bg-surface">
        <span className="text-xs text-ink-faint font-mono">Memuat ticker…</span>
      </div>
    );
  }

  const items: { label: string; change: number; value: string }[] = [
    { label: "BTC", change: overview.btcChange24h, value: formatPrice(overview.btcPrice) },
    { label: "ETH", change: overview.ethChange24h, value: formatPrice(overview.ethPrice) },
    ...(movers ?? []).map((m) => ({
      label: m.symbol,
      change: m.priceChange24h,
      value: formatPercent(m.priceChange24h),
    })),
  ];

  const renderRow = (keyPrefix: string) => (
    <div className="flex items-center gap-6 pr-6 shrink-0">
      {items.map((item, i) => (
        <span key={`${keyPrefix}-${i}`} className="flex items-center gap-2 text-xs font-mono whitespace-nowrap">
          <span className="text-ink-muted">{item.label}</span>
          <span className="text-ink">{item.value}</span>
          <span className={priceChangeColorClass(item.change)}>{formatPercent(item.change)}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden border-y border-border bg-surface">
      <div className="ticker-track flex w-max py-2.5">
        {renderRow("a")}
        {renderRow("b")}
      </div>
    </div>
  );
}
