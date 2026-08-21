import { useState } from "react";
import AppShell from "./components/layout/AppShell";
import type { PageKey } from "./components/layout/SideNav";
import Dashboard from "./pages/Dashboard";
import Research from "./pages/Research";
import Portfolio from "./pages/Portfolio";

export default function App() {
  const [page, setPage] = useState<PageKey>("dashboard");
  const [selectedAsset, setSelectedAsset] = useState<{ id: string; symbol: string } | null>(
    null
  );

  const handleOpenResearch = (assetId: string, symbol: string) => {
    setSelectedAsset({ id: assetId, symbol });
    setPage("research");
  };

  return (
    <AppShell active={page} onNavigate={setPage}>
      {page === "dashboard" && <Dashboard onOpenResearch={handleOpenResearch} />}
      {page === "research" && <Research selectedAsset={selectedAsset} />}
      {page === "portfolio" && <Portfolio />}
    </AppShell>
  );
}
