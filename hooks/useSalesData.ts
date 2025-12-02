import { useState, useEffect } from 'react';
import { getSalesData } from '@/app/api/sales';
import type { DashboardData, PageHistory, FilterParams } from '@/types';

export const useSalesData = (initialFilters: FilterParams) => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageHistory, setPageHistory] = useState<PageHistory[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const loadSales = async (filters: FilterParams, after?: string) => {
    try {
      setLoading(true);
      const result = await getSalesData({
        ...filters,
        after,
      });

      if (result) {
        setData(result);
        if (!after) {
          setPageHistory([{ data: result }]);
          setCurrentPageIndex(0);
        }
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const goToNextPage = async (filters: FilterParams) => {
    if (!data?.pagination.after) return;

    try {
      setLoading(true);
      const result = await getSalesData({
        ...filters,
        after: data.pagination.after,
      });

      if (result) {
        const newHistory = pageHistory.slice(0, currentPageIndex + 1);
        newHistory.push({ data: result, token: data.pagination.after });
        setPageHistory(newHistory);
        setCurrentPageIndex(newHistory.length - 1);
        setData(result);
      }
    } catch (err) {
      console.error('Error loading next page:', err);
    } finally {
      setLoading(false);
    }
  };

  const goToPreviousPage = () => {
    if (currentPageIndex === 0) return;

    const prevIndex = currentPageIndex - 1;
    const prevPage = pageHistory[prevIndex];

    if (prevPage) {
      setData(prevPage.data);
      setCurrentPageIndex(prevIndex);
    }
  };

  useEffect(() => {
    loadSales(initialFilters);
  }, [initialFilters]);

  return {
    data,
    loading,
    currentPageIndex,
    goToNextPage,
    goToPreviousPage,
    hasNextPage: !!data?.pagination.after,
    hasPrevPage: currentPageIndex > 0,
  };
};