import { IconDashboard, IconPortfolio, IconResearch, IconSparkle } from "../shared/icons";

export type PageKey = "dashboard" | "research" | "portfolio";

interface SideNavProps {
  active: PageKey;
  onNavigate: (page: PageKey) => void;
  onAskAI: () => void;
}

const NAV_ITEMS: { key: PageKey; label: string; icon: typeof IconDashboard }[] = [
  { key: "dashboard", label: "Dashboard", icon: IconDashboard },
  { key: "research", label: "Research", icon: IconResearch },
  { key: "portfolio", label: "Portfolio", icon: IconPortfolio },
];

/**
 * Sidebar navigasi untuk layar desktop/tablet lebar (md ke atas).
 * Disembunyikan di mobile — mobile pakai BottomNav.
 */
export default function SideNav({ active, onNavigate, onAskAI }: SideNavProps) {
  return (
    <aside className="hidden md:flex md:flex-col md:w-60 md:shrink-0 border-r border-border bg-surface px-4 py-6">
      <div className="px-2 mb-8">
        <p className="font-mono text-[11px] tracking-[0.2em] text-accent">KAVELO</p>
        <p className="text-sm font-semibold text-ink leading-tight">
          Crypto Intelligence
        </p>
      </div>

      <nav className="flex flex-col gap-1" aria-label="Navigasi utama">
        {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onNavigate(key)}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                isActive
                  ? "bg-surface-raised text-ink"
                  : "text-ink-muted hover:text-ink hover:bg-surface-raised/60"
              }`}
            >
              <Icon className={`h-[18px] w-[18px] ${isActive ? "text-accent" : ""}`} />
              {label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-6">
        <button
          type="button"
          onClick={onAskAI}
          className="w-full flex items-center justify-center gap-2 rounded-lg border border-accent-soft bg-accent-soft px-3 py-2.5 text-sm font-medium text-accent hover:bg-accent-soft/80 transition-colors"
        >
          <IconSparkle className="h-4 w-4" />
          Ask Crypto AI
        </button>
      </div>
    </aside>
  );
}
