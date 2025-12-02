'use client'

import { useState, useMemo, useEffect, useCallback } from 'react';
import { useSalesData } from '@/hooks/useSalesData';
import type { SortField, SortDirection, FilterParams, Sale } from '@/types';
import { ErrorMessage, LoadingSpinner } from './LoadingSpinner';
import { FilterSection } from './FilterSection';
import { SalesChart } from './SalesChart';
import { StatsCards } from './StatsCards';
import { SalesTable } from './SalesTable';
import { PaginationControls } from './PaginationControls';

const DEFAULT_FILTERS: FilterParams = {
  startDate: '2025-01-01',
  endDate: '2025-01-30',
  minPrice: 0,
  customerEmail: '',
  customerPhone: '',
};

export const Dashboard = () => {
  // Local input state - doesn't trigger API calls
  const [inputFilters, setInputFilters] = useState<FilterParams>(DEFAULT_FILTERS);
  // Applied filters for data fetching - only updates after debounce
  const [appliedFilters, setAppliedFilters] = useState<FilterParams>(DEFAULT_FILTERS);
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Debounce filter changes to avoid excessive API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setAppliedFilters(inputFilters);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [inputFilters]);

  const { data, loading, currentPageIndex, goToNextPage, goToPreviousPage, hasNextPage, hasPrevPage } =
    useSalesData(appliedFilters);

  // Memoized sort handler
  const handleSort = useCallback((field: SortField) => {
    setSortField(prev => {
      const newField = prev === field ? field : field;
      if (prev === field) {
        setSortDirection(d => d === 'asc' ? 'desc' : 'asc');
      } else {
        setSortDirection('asc');
      }
      return newField;
    });
  }, []);

  // Memoized reset handler
  const handleResetFilters = useCallback(() => {
    setInputFilters(DEFAULT_FILTERS);
    setAppliedFilters(DEFAULT_FILTERS);
    setSortField(null);
    setSortDirection('asc');
  }, []);

  // Memoized filter change handler - only updates local state
  const handleFilterChange = useCallback((filters: FilterParams) => {
    setInputFilters(filters);
  }, []);

  // Filter and sort sales data - only recalculates when dependencies change
  const sortedAndFilteredSales: Sale[] = useMemo(() => {
    if (!data?.results?.Sales) return [];

    let filtered = data.results.Sales.filter((sale: Sale) => {
      const saleDate = new Date(sale.date);
      const start = new Date(appliedFilters.startDate);
      const end = new Date(appliedFilters.endDate);

      const dateMatch = saleDate >= start && saleDate <= end;
      const priceMatch = appliedFilters.minPrice ? sale.price >= appliedFilters.minPrice : true;
      const emailMatch = appliedFilters.customerEmail
        ? sale.customerEmail.toLowerCase().includes(appliedFilters.customerEmail.toLowerCase())
        : true;
      const phoneMatch = appliedFilters.customerPhone
        ? sale.customerPhone.includes(appliedFilters.customerPhone)
        : true;

      return dateMatch && priceMatch && emailMatch && phoneMatch;
    });

    // Sort the filtered results
    if (sortField) {
      filtered = [...filtered].sort((a, b) => {
        let aVal = sortField === 'date' ? new Date(a.date).getTime() : a.price;
        let bVal = sortField === 'date' ? new Date(b.date).getTime() : b.price;
        return sortDirection === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
      });
    }

    return filtered;
  }, [data?.results?.Sales, appliedFilters, sortField, sortDirection]);

  // Memoized chart data
  const chartData = useMemo(() => {
    if (!data?.results?.TotalSales) return [];
    const start = new Date(appliedFilters.startDate);
    const end = new Date(appliedFilters.endDate);
    return data.results.TotalSales.filter(d => {
      const date = new Date(d.day);
      return date >= start && date <= end;
    });
  }, [data?.results?.TotalSales, appliedFilters]);

  // Memoized pagination handler
  const handleNextPage = useCallback(() => {
    goToNextPage(appliedFilters);
  }, [appliedFilters, goToNextPage]);

  if (loading && !data) return <LoadingSpinner />;
  if (!data) return <ErrorMessage />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Sales Dashboard</h1>
          <p className="text-slate-600">Monitor your sales data with filters and analytics</p>
        </div>

        {/* Filters - uses local state, doesn't trigger API calls on keystroke */}
        <FilterSection
          filters={inputFilters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
        />

        {/* Chart */}
        <SalesChart data={chartData} />

        {/* Stats */}
        <StatsCards sales={sortedAndFilteredSales} />

        {/* Table */}
        <SalesTable
          filteredData={sortedAndFilteredSales}
          sales={sortedAndFilteredSales}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
        />

        {/* Pagination */}
        {sortedAndFilteredSales.length > 0 && (
          <PaginationControls
            currentPage={currentPageIndex}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            totalItems={sortedAndFilteredSales.length}
            loading={loading}
            onNextPage={handleNextPage}
            onPreviousPage={goToPreviousPage}
          />
        )}
      </div>
    </div>
  );
};