import { ChevronUp, ChevronDown } from 'lucide-react';
import { formatDate } from '@/utils/formatters';
import type { Sale, SortField, SortDirection } from '@/types';

interface SalesTableProps {
  filteredData?: Sale[];
  sales: Sale[];
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

export const SalesTable = ({
  filteredData,
  sales,
  sortField,
  sortDirection,
  onSort,
}: SalesTableProps) => {
  const dataToShow = filteredData ?? sales;

  const sortedData = [...dataToShow].sort((a, b) => {
    if (!sortField) return 0;
    const aVal = sortField === 'date' ? new Date(a.date).getTime() : a.price;
    const bVal = sortField === 'date' ? new Date(b.date).getTime() : b.price;
    return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
  });

  if (sortedData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">Sales Details</h2>
        </div>
        <div className="p-12 text-center text-slate-500">
          No sales data found matching your filters
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-xl font-semibold text-slate-900">Sales Details</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left">
                <button onClick={() => onSort('date')} className="flex items-center text-sm cursor-pointer font-semibold text-slate-900 hover:text-blue-600 transition">
                  Date
                  {sortField === 'date' && (sortDirection === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />)}
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button onClick={() => onSort('price')} className="flex items-center text-sm cursor-pointer font-semibold text-slate-900 hover:text-blue-600 transition">
                  Price
                  {sortField === 'price' && (sortDirection === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />)}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Phone</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((sale, idx) => (
              <tr key={sale._id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <td className="px-6 py-4 text-sm text-slate-900">{formatDate(sale.date)}</td>
                <td className="px-6 py-4 text-sm font-medium text-slate-900">${sale.price}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{sale.customerEmail}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{sale.customerPhone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
