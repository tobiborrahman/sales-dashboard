import { formatCurrency } from '@/utils/formatters';
import type { Sale } from '@/types';

interface StatsCardsProps {
  sales: Sale[];
}

export const StatsCards = ({ sales }: StatsCardsProps) => {
  const totalValue = sales.reduce((sum, item) => sum + item.price, 0);
  const avgPrice = sales.length > 0 ? Math.round(totalValue / sales.length) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-slate-600 text-sm font-medium">Total Records (This Page)</p>
        <p className="text-3xl font-bold text-slate-900 mt-2">{sales.length}</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-slate-600 text-sm font-medium">Total Sales Value</p>
        <p className="text-3xl font-bold text-green-600 mt-2">{formatCurrency(totalValue)}</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-slate-600 text-sm font-medium">Average Price</p>
        <p className="text-3xl font-bold text-blue-600 mt-2">{formatCurrency(avgPrice)}</p>
      </div>
    </div>
  );
};