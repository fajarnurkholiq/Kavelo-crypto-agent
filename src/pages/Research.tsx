import { IconResearch } from "../components/shared/icons";

interface ResearchProps {
  selectedAsset: { id: string; symbol: string } | null;
}

/**
 * Placeholder halaman Research untuk Stage 2. Fitur AI Research
 * (executive summary, tokenomics, bull/bear case, dll.) dikerjakan
 * di stage berikutnya — di sini hanya kerangka halaman & empty state.
 */
export default function Research({ selectedAsset }: ResearchProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 animate-fade-in">
      <h1 className="text-lg font-semibold text-ink mb-1">Research</h1>
      <p className="text-sm text-ink-muted mb-6">
        {selectedAsset
          ? `Menyiapkan halaman research untuk ${selectedAsset.symbol}.`
          : "Pilih aset dari Dashboard untuk memulai research."}
      </p>

      <div className="rounded-2xl border border-dashed border-border p-10 flex flex-col items-center text-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-raised text-ink-faint">
          <IconResearch />
        </span>
        <p className="text-sm text-ink-muted max-w-sm">
          AI Research Report — executive summary, fundamentals, tokenomics,
          risks, bull &amp; bear case — akan tersedia di tahap pengembangan
          berikutnya.
        </p>
      </div>
    </div>
  );
}
