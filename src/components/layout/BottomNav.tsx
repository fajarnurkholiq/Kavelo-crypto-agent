import { IconDashboard, IconPortfolio, IconResearch } from "../shared/icons";
import type { PageKey } from "./SideNav";

interface BottomNavProps {
  active: PageKey;
  onNavigate: (page: PageKey) => void;
}

const NAV_ITEMS: { key: PageKey; label: string; icon: typeof IconDashboard }[] = [
  { key: "dashboard", label: "Dashboard", icon: IconDashboard },
  { key: "research", label: "Research", icon: IconResearch },
  { key: "portfolio", label: "Portfolio", icon: IconPortfolio },
];

/**
 * Navigasi bawah untuk mobile (di bawah md breakpoint).
 * Ditempel fixed di bawah viewport, aman dari notch lewat safe-area padding.
 */
export default function BottomNav({ active, onNavigate }: BottomNavProps) {
  return (
    <nav
      aria-label="Navigasi utama"
      className="md:hidden fixed bottom-0 inset-x-0 z-30 border-t border-border bg-surface/95 backdrop-blur"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-3">
        {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onNavigate(key)}
              aria-current={isActive ? "page" : undefined}
              className="flex flex-col items-center justify-center gap-1 py-2.5 text-[11px]"
            >
              <Icon className={`h-5 w-5 ${isActive ? "text-accent" : "text-ink-faint"}`} />
              <span className={isActive ? "text-ink" : "text-ink-faint"}>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
