import type { MarketOverview } from "../../services/marketDataService";
import { formatCompactNumber } from "../../utils/formatters";
import LoadingState from "../shared/LoadingState";
import DemoDataBadge from "../shared/DemoDataBadge";

interface MarketStateBadgeProps {
  data: MarketOverview | null;
  loading: boolean;
  isDemo: boolean;
}

/**
 * Ringkasan kondisi market murni dari logic deskriptif berbasis data
 * yang tersedia — TIDAK ada AI dan TIDAK ada klaim prediktif ("akan naik"
 * dsb). Hanya mendeskripsikan apa yang data tunjukkan saat ini.
 */
function dominanceDescriptor(dominance: number): string {
  if (dominance >= 55) {
    return "Bitcoin dominance is elevated, with capital concentrated relatively more in BTC.";
  }
  if (dominance <= 45) {
    return "Bitcoin dominance is relatively low, with altcoins holding a larger share of activity.";
  }
  return "Bitcoin dominance is at a balanced level relative to the broader market.";
}

function directionDescriptor(btcChange: number, ethChange: number): string {
  const avg = (btcChange + ethChange) / 2;
  const sameSign = Math.sign(btcChange) === Math.sign(ethChange);

  if (!sameSign) return "Majors are moving in mixed directions over the last 24 hours.";
  if (avg > 1.5) return "Majors are trading higher over the last 24 hours.";
  if (avg < -1.5) return "Majors are trading lower over the last 24 hours.";
  return "Majors are relatively flat over the last 24 hours.";
}

export default function MarketStateBadge({ data, loading, isDemo }: MarketStateBadgeProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[11px] uppercase tracking-wide text-ink-muted">Market State</p>
        {isDemo && data && <DemoDataBadge />}
      </div>

      {loading && <LoadingState rows={3} label="Memuat ringkasan kondisi market" />}

      {!loading && !data && (
        <p className="text-sm text-ink-muted">Market data temporarily unavailable.</p>
      )}

      {!loading && data && (
        <dl className="space-y-2.5 text-sm">
          <div className="flex justify-between gap-3">
            <dt className="text-ink-muted">BTC dominance</dt>
            <dd className="font-mono text-ink">{data.btcDominance.toFixed(1)}%</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-ink-muted">Sentiment</dt>
            <dd className="font-mono text-ink">{data.fearGreedLabel ?? "—"}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-ink-muted">24h volume</dt>
            <dd className="font-mono text-ink">{formatCompactNumber(data.totalVolume24h)}</dd>
          </div>

          <p className="pt-2 text-xs text-ink-muted leading-relaxed border-t border-border">
            {dominanceDescriptor(data.btcDominance)}{" "}
            {directionDescriptor(data.btcChange24h, data.ethChange24h)}
          </p>
        </dl>
      )}
    </div>
  );
}
