import LoadingState from "../shared/LoadingState";
import DemoDataBadge from "../shared/DemoDataBadge";

interface FearGreedGaugeProps {
  score: number | null;
  label: string | null;
  loading: boolean;
  isDemo: boolean;
}

const RADIUS = 46;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function zoneColor(score: number): { ring: string; text: string; desc: string } {
  if (score <= 24) {
    return {
      ring: "#FB7185",
      text: "text-negative",
      desc: "Market sentiment is currently leaning toward extreme fear.",
    };
  }
  if (score <= 44) {
    return {
      ring: "#F59E0B",
      text: "text-demo",
      desc: "Market sentiment is currently leaning toward fear.",
    };
  }
  if (score <= 55) {
    return {
      ring: "#8B909B",
      text: "text-ink-muted",
      desc: "Market sentiment is currently neutral.",
    };
  }
  if (score <= 75) {
    return {
      ring: "#34D399",
      text: "text-positive",
      desc: "Market sentiment is currently leaning toward greed.",
    };
  }
  return {
    ring: "#22C55E",
    text: "text-positive",
    desc: "Market sentiment is currently leaning toward extreme greed.",
  };
}

/**
 * Fear & Greed Index sebagai ring gauge — score, klasifikasi,
 * dan satu kalimat deskriptif (bukan rekomendasi, murni deskripsi data).
 */
export default function FearGreedGauge({ score, label, loading, isDemo }: FearGreedGaugeProps) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-5 h-full">
        <p className="text-[11px] uppercase tracking-wide text-ink-muted mb-3">
          Fear &amp; Greed
        </p>
        <LoadingState rows={2} label="Memuat fear and greed index" />
      </div>
    );
  }

  if (score === null) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-5 h-full">
        <p className="text-[11px] uppercase tracking-wide text-ink-muted mb-2">
          Fear &amp; Greed
        </p>
        <p className="text-sm text-ink-muted">Data belum tersedia.</p>
      </div>
    );
  }

  const zone = zoneColor(score);
  const offset = CIRCUMFERENCE * (1 - score / 100);

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[11px] uppercase tracking-wide text-ink-muted">
          Fear &amp; Greed
        </p>
        {isDemo && <DemoDataBadge />}
      </div>

      <div className="flex items-center gap-4">
        <svg viewBox="0 0 110 110" className="h-24 w-24 shrink-0 -rotate-90">
          <circle
            cx="55"
            cy="55"
            r={RADIUS}
            fill="none"
            stroke="#242832"
            strokeWidth="10"
          />
          <circle
            cx="55"
            cy="55"
            r={RADIUS}
            fill="none"
            stroke={zone.ring}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
          />
        </svg>

        <div>
          <p className="font-mono text-3xl text-ink leading-none">{score}</p>
          <p className={`text-xs font-medium uppercase tracking-wide mt-1 ${zone.text}`}>
            {label ?? "—"}
          </p>
        </div>
      </div>

      <p className="text-xs text-ink-muted mt-4 leading-relaxed">{zone.desc}</p>
    </div>
  );
}
