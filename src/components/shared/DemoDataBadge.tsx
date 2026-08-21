interface DemoDataBadgeProps {
  /** "pill" untuk badge kecil di dalam card, "inline" untuk teks ringkas. */
  variant?: "pill" | "inline";
}

/**
 * Indikator eksplisit bahwa data yang ditampilkan adalah DEMO DATA,
 * bukan data real-time. Harus dipasang di setiap card yang menerima
 * isDemo: true dari service/hook.
 */
export default function DemoDataBadge({ variant = "pill" }: DemoDataBadgeProps) {
  if (variant === "inline") {
    return (
      <span className="text-[11px] font-mono uppercase tracking-wide text-demo">
        Demo data
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-demo-soft px-2 py-0.5 text-[11px] font-mono uppercase tracking-wide text-demo">
      <span className="h-1.5 w-1.5 rounded-full bg-demo" />
      Demo data
    </span>
  );
}
