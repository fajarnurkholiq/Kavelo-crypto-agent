import { useEffect, useState, useCallback } from "react";
import {
  getAssetData,
  getMarketOverview,
  getTopMovers,
  type AssetData,
  type MarketOverview,
  type TopMover,
} from "../services/marketDataService";

/**
 * State generik yang dipakai semua hook di file ini.
 * UI komponen bisa langsung switch berdasarkan `loading`, `error`, `isDemo`.
 */
interface DataState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  isDemo: boolean;
}

const INITIAL_STATE = {
  data: null,
  loading: true,
  error: null,
  isDemo: false,
};

/**
 * Hook untuk ringkasan market (dashboard utama).
 */
export function useMarketOverview() {
  const [state, setState] = useState<DataState<MarketOverview>>(
    INITIAL_STATE
  );

  const refetch = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    const result = await getMarketOverview();
    setState({
      data: result.data,
      loading: false,
      error: result.error,
      isDemo: result.isDemo,
    });
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { ...state, refetch };
}

/**
 * Hook untuk daftar top movers.
 */
export function useTopMovers(limit: number = 5) {
  const [state, setState] = useState<DataState<TopMover[]>>(INITIAL_STATE);

  const refetch = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    const result = await getTopMovers(limit);
    setState({
      data: result.data,
      loading: false,
      error: result.error,
      isDemo: result.isDemo,
    });
  }, [limit]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { ...state, refetch };
}

/**
 * Hook untuk beberapa aset sekaligus (dipakai Watchlist & Research preview).
 * Mengambil tiap aset secara paralel; isDemo bernilai true jika SALAH SATU
 * aset jatuh ke demo data, supaya indikator tetap jujur.
 */
export function useMultipleAssets(assetIds: string[]) {
  const [state, setState] = useState<DataState<AssetData[]>>(INITIAL_STATE);
  const key = assetIds.join(",");

  const refetch = useCallback(async () => {
    if (assetIds.length === 0) {
      setState({ data: [], loading: false, error: null, isDemo: false });
      return;
    }
    setState((prev) => ({ ...prev, loading: true, error: null }));
    const results = await Promise.all(assetIds.map((id) => getAssetData(id)));
    const data = results
      .map((r) => r.data)
      .filter((d): d is AssetData => d !== null);
    const isDemo = results.some((r) => r.isDemo);
    const firstError = results.find((r) => r.error)?.error ?? null;

    setState({ data, loading: false, error: firstError, isDemo });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { ...state, refetch };
}

/**
 * Hook untuk detail satu aset. assetId bisa null (mis. belum ada
 * aset terpilih) — dalam kondisi ini hook tidak melakukan fetch.
 */
export function useAssetData(assetId: string | null) {
  const [state, setState] = useState<DataState<AssetData>>({
    ...INITIAL_STATE,
    loading: Boolean(assetId),
  });

  const refetch = useCallback(async () => {
    if (!assetId) {
      setState({ data: null, loading: false, error: null, isDemo: false });
      return;
    }
    setState((prev) => ({ ...prev, loading: true, error: null }));
    const result = await getAssetData(assetId);
    setState({
      data: result.data,
      loading: false,
      error: result.error,
      isDemo: result.isDemo,
    });
  }, [assetId]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { ...state, refetch };
}
