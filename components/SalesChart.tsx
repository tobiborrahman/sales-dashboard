import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatChartDate, formatCurrency } from '@/utils/formatters';
import type { TotalSale } from '@/types';

interface SalesChartProps {
  data: TotalSale[];
}

export const SalesChart = ({ data }: SalesChartProps) => {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-slate-900 mb-6">Total Sales Over Time</h2>
        <div className="text-center py-12 text-slate-500">No data available for selected date range</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold text-slate-900 mb-6">Total Sales Over Time</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="day" 
            tick={{ fontSize: 12 }}
            tickFormatter={formatChartDate}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
            formatter={(value) => formatCurrency(value as number)}
            labelFormatter={(label) => new Date(label).toLocaleDateString()}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="totalSale" 
            stroke="#3b82f6" 
            dot={false}
            strokeWidth={2}
            name="Total Sales"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};