import { useMarketOverview, useTopMovers } from "../hooks/useMarketData";
import MarketHeader from "../components/dashboard/MarketHeader";
import MarketTicker from "../components/dashboard/MarketTicker";
import MarketSummaryBar from "../components/dashboard/MarketSummaryBar";
import FearGreedGauge from "../components/dashboard/FearGreedGauge";
import TopMoversList from "../components/dashboard/TopMoversList";
import MarketStateBadge from "../components/dashboard/MarketStateBadge";
import WatchlistPreview from "../components/dashboard/WatchlistPreview";
import ResearchPreview from "../components/dashboard/ResearchPreview";

interface DashboardProps {
  onOpenResearch: (assetId: string, symbol: string) => void;
}

/**
 * Halaman utama (HOME) aplikasi. Semua data di sini berasal dari
 * marketDataService lewat hook useMarketOverview/useTopMovers —
 * tidak ada angka yang di-hardcode di komponen.
 */
export default function Dashboard({ onOpenResearch }: DashboardProps) {
  const overview = useMarketOverview();
  const movers = useTopMovers(5);

  return (
    <div className="animate-fade-in">
      <MarketTicker overview={overview.data} movers={movers.data} loading={overview.loading} />

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 space-y-6">
        <MarketHeader isDemo={overview.isDemo} loading={overview.loading} />

        <MarketSummaryBar
          data={overview.data}
          loading={overview.loading}
          error={overview.error}
          isDemo={overview.isDemo}
          onRetry={overview.refetch}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-3">
          <TopMoversList
            data={movers.data}
            loading={movers.loading}
            error={movers.error}
            isDemo={movers.isDemo}
            onRetry={movers.refetch}
          />
          <FearGreedGauge
            score={overview.data?.fearGreedIndex ?? null}
            label={overview.data?.fearGreedLabel ?? null}
            loading={overview.loading}
            isDemo={overview.isDemo}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <MarketStateBadge data={overview.data} loading={overview.loading} isDemo={overview.isDemo} />
          <WatchlistPreview />
          <ResearchPreview onOpenResearch={onOpenResearch} />
        </div>
      </div>
    </div>
  );
}
