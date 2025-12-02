import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationControlsProps {
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalItems: number;
  loading: boolean;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

export const PaginationControls = ({
  currentPage,
  hasNextPage,
  hasPrevPage,
  totalItems,
  loading,
  onNextPage,
  onPreviousPage,
}: PaginationControlsProps) => {
  return (
    <div className="px-6 py-4 border-t border-slate-200 flex justify-between items-center flex-wrap gap-4">
      <div className="text-sm text-slate-600">
        Page <span className="font-semibold">{currentPage + 1}</span> • 
        Showing <span className="font-semibold">{totalItems}</span> results
      </div>

      <div className="flex gap-2">
        <button
          onClick={onPreviousPage}
          disabled={!hasPrevPage || loading}
          className="flex items-center gap-2 px-4 py-2 cursor-pointer border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>
        <button
          onClick={onNextPage}
          disabled={!hasNextPage || loading}
          className="flex items-center gap-2 px-4 py-2 border cursor-pointer border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};