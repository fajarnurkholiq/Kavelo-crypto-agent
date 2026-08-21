interface MarketHeaderProps {
  isDemo: boolean;
  loading: boolean;
}

/**
 * Header utama Dashboard: wordmark produk + status market
 * (LIVE DATA / DEMO DATA / MENYAMBUNGKAN...).
 */
export default function MarketHeader({ isDemo, loading }: MarketHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h1 className="hidden md:block text-lg font-semibold text-ink tracking-tight">
          Kavelo Crypto Intelligence
        </h1>
        <p className="text-sm text-ink-muted mt-0.5">
          Market overview &amp; research terminal
        </p>
      </div>

      <span
        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-mono uppercase tracking-wide whitespace-nowrap ${
          loading
            ? "border-border text-ink-faint"
            : isDemo
            ? "border-demo-soft bg-demo-soft text-demo"
            : "border-positive-soft bg-positive-soft text-positive"
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            loading ? "bg-ink-faint" : isDemo ? "bg-demo" : "bg-positive animate-pulse"
          }`}
        />
        {loading ? "Menyambungkan" : isDemo ? "Demo data" : "Live data"}
      </span>
    </div>
  );
}
