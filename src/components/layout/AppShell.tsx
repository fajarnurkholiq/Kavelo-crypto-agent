import { useEffect, useState, type ReactNode } from "react";
import SideNav, { type PageKey } from "./SideNav";
import BottomNav from "./BottomNav";
import { IconClose, IconSparkle } from "../shared/icons";

interface AppShellProps {
  active: PageKey;
  onNavigate: (page: PageKey) => void;
  children: ReactNode;
}

/**
 * Kerangka aplikasi: sidebar di desktop, top header + bottom nav di mobile.
 * "Ask Crypto AI" masih placeholder — Stage 2 belum menyalakan AI service,
 * jadi tombol ini hanya menampilkan toast singkat lalu tidak melakukan apa-apa.
 */
export default function AppShell({ active, onNavigate, children }: AppShellProps) {
  const [aiToastOpen, setAiToastOpen] = useState(false);

  useEffect(() => {
    if (!aiToastOpen) return;
    const timer = setTimeout(() => setAiToastOpen(false), 3200);
    return () => clearTimeout(timer);
  }, [aiToastOpen]);

  const handleAskAI = () => setAiToastOpen(true);

  return (
    <div className="min-h-screen bg-base text-ink font-sans flex">
      <SideNav active={active} onNavigate={onNavigate} onAskAI={handleAskAI} />

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Mobile-only compact top header */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-surface">
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-accent leading-none">
              KAVELO
            </p>
            <p className="text-xs font-semibold text-ink leading-tight mt-0.5">
              Crypto Intelligence
            </p>
          </div>
          <button
            type="button"
            onClick={handleAskAI}
            aria-label="Ask Crypto AI"
            className="flex items-center gap-1.5 rounded-full border border-accent-soft bg-accent-soft px-3 py-1.5 text-xs font-medium text-accent"
          >
            <IconSparkle className="h-3.5 w-3.5" />
            Ask AI
          </button>
        </header>

        <main className="flex-1 min-w-0 pb-20 md:pb-0">{children}</main>
      </div>

      <BottomNav active={active} onNavigate={onNavigate} />

      {/* Ask AI toast — placeholder interaction only, no AI wired up yet */}
      {aiToastOpen && (
        <div
          role="status"
          className="fixed left-1/2 -translate-x-1/2 bottom-24 md:bottom-6 z-40 flex items-center gap-3 rounded-lg border border-border bg-surface-raised px-4 py-3 shadow-lg shadow-black/40 animate-fade-in max-w-[calc(100vw-2rem)]"
        >
          <IconSparkle className="h-4 w-4 text-accent shrink-0" />
          <p className="text-sm text-ink-muted">
            Crypto AI Analyst akan aktif di stage berikutnya.
          </p>
          <button
            type="button"
            onClick={() => setAiToastOpen(false)}
            aria-label="Tutup"
            className="text-ink-faint hover:text-ink shrink-0"
          >
            <IconClose />
          </button>
        </div>
      )}
    </div>
  );
}
