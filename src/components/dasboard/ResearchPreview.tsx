import { IconChevronRight } from "../shared/icons";

interface ResearchPreviewProps {
  onOpenResearch: (assetId: string, symbol: string) => void;
}

const QUICK_ASSETS = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin" },
  { id: "ethereum", symbol: "ETH", name: "Ethereum" },
  { id: "solana", symbol: "SOL", name: "Solana" },
];

/**
 * Akses cepat ke Research per aset. Stage 2: tombol mengarah ke
 * halaman Research placeholder (belum ada AI research report).
 */
export default function ResearchPreview({ onOpenResearch }: ResearchPreviewProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <p className="text-[11px] uppercase tracking-wide text-ink-muted mb-3">Research</p>

      <div className="divide-y divide-border -mx-1">
        {QUICK_ASSETS.map((asset) => (
          <button
            key={asset.id}
            type="button"
            onClick={() => onOpenResearch(asset.id, asset.symbol)}
            className="w-full flex items-center justify-between gap-3 px-1 py-2.5 text-left group"
          >
            <div>
              <p className="text-sm text-ink">{asset.name}</p>
              <p className="text-xs text-ink-faint font-mono">{asset.symbol}</p>
            </div>
            <span className="flex items-center gap-1 text-xs text-ink-muted group-hover:text-accent transition-colors">
              Research
              <IconChevronRight />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
