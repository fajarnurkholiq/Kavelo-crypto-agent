import type { MarketOverview } from "../../services/marketDataService";
import { formatCompactNumber, formatPercent, formatPrice } from "../../utils/formatters";
import LoadingState from "../shared/LoadingState";
import ErrorState from "../shared/ErrorState";
import DemoDataBadge from "../shared/DemoDataBadge";

interface MarketSummaryBarProps {
  data: MarketOverview | null;
  loading: boolean;
  error: string | null;
  isDemo: boolean;
  onRetry: () => void;
}

function AssetHeroCard({
  symbol,
  name,
  price,
  change,
}: {
  symbol: string;
  name: string;
  price: number;
  change: number;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-baseline justify-between">
        <div>
          <p className="text-xs text-ink-muted">{name}</p>
          <p className="font-mono text-sm text-ink-faint tracking-wide">{symbol}</p>
        </div>
        <span
          className={`font-mono text-sm px-2 py-0.5 rounded-md ${
            change >= 0 ? "bg-positive-soft text-positive" : "bg-negative-soft text-negative"
          }`}
        >
          {formatPercent(change)}
        </span>
      </div>
      <p className="mt-4 font-mono text-3xl md:text-4xl text-ink tabular-nums">
        {formatPrice(price)}
      </p>
    </div>
  );
}

function StatCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-4 py-3 first:pl-0 last:pr-0">
      <p className="text-[11px] uppercase tracking-wide text-ink-muted">{label}</p>
      <p className="font-mono text-lg text-ink mt-1">{value}</p>
    </div>
  );
}

/**
 * Section utama Market Overview: BTC & ETH sebagai hero card (asimetris,
 * bukan grid kotak-kotak seragam), diikuti strip statistik market cap,
 * volume, dan dominance.
 */
export default function MarketSummaryBar({
  data,
  loading,
  error,
  isDemo,
  onRetry,
}: MarketSummaryBarProps) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-5">
        <LoadingState rows={4} label="Memuat market overview" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-5">
        <ErrorState message={error ?? undefined} onRetry={onRetry} />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {isDemo && <DemoDataBadge />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <AssetHeroCard symbol="BTC" name="Bitcoin" price={data.btcPrice} change={data.btcChange24h} />
        <AssetHeroCard symbol="ETH" name="Ethereum" price={data.ethPrice} change={data.ethChange24h} />
      </div>

      <div className="rounded-2xl border border-border bg-surface px-4 py-1 grid grid-cols-3 divide-x divide-border">
        <StatCell label="Market Cap" value={formatCompactNumber(data.totalMarketCap)} />
        <StatCell label="24h Volume" value={formatCompactNumber(data.totalVolume24h)} />
        <StatCell label="BTC Dominance" value={`${data.btcDominance.toFixed(1)}%`} />
      </div>
    </div>
  );
}
