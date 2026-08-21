import { IconPortfolio } from "../components/shared/icons";

/**
 * Placeholder halaman Portfolio. Belum ada CRUD/backend — sesuai
 * batasan Stage 2, portfolio system baru dikerjakan jika diperlukan
 * di stage berikutnya.
 */
export default function Portfolio() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 animate-fade-in">
      <h1 className="text-lg font-semibold text-ink mb-1">Portfolio</h1>
      <p className="text-sm text-ink-muted mb-6">
        Fondasi portfolio &amp; investment journal.
      </p>

      <div className="rounded-2xl border border-dashed border-border p-10 flex flex-col items-center text-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-raised text-ink-faint">
          <IconPortfolio />
        </span>
        <p className="text-sm text-ink-muted max-w-sm">
          Portfolio tracking dan investment journal akan dibangun di stage
          berikutnya.
        </p>
      </div>
    </div>
  );
}
