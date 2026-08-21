interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

/**
 * State error generik untuk section yang gagal total (tidak ada
 * data asli maupun demo data untuk ditampilkan).
 */
export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-start gap-2 text-sm">
      <p className="text-negative">
        {message ?? "Market data temporarily unavailable."}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="text-xs text-ink-muted underline underline-offset-2 hover:text-ink transition-colors"
        >
          Coba lagi
        </button>
      )}
    </div>
  );
}
