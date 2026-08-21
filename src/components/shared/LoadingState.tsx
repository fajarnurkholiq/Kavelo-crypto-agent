interface LoadingStateProps {
  label?: string;
  /** Jumlah baris skeleton yang ditampilkan. Default 1 baris pendek. */
  rows?: number;
}

/**
 * State loading generik. Dipakai di semua card yang menunggu data
 * dari marketDataService — jangan render angka kosong/0 saat loading.
 */
export default function LoadingState({ label, rows = 1 }: LoadingStateProps) {
  return (
    <div className="space-y-2" role="status" aria-live="polite">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-3.5 rounded bg-surface-raised animate-pulse"
          style={{ width: i === 0 ? "60%" : "85%" }}
        />
      ))}
      {label && <span className="sr-only">{label}</span>}
    </div>
  );
}
