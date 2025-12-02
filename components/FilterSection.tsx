import { Calendar, DollarSign, Mail, Phone } from 'lucide-react';
import type { FilterParams } from '@/types';

interface FilterSectionProps {
  filters: FilterParams;
  onFilterChange: (filters: FilterParams) => void;
  onReset: () => void;
}

export const FilterSection = ({ filters, onFilterChange, onReset }: FilterSectionProps) => {
  const handleChange = (key: keyof FilterParams, value: string | number) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-xl font-semibold text-slate-900">Filters</h2>
        <button
          onClick={onReset}
          className="px-4 py-2 text-sm bg-[#EFE9E3] cursor-pointer text-slate-700 rounded-md hover:bg-slate-300 transition"
        >
          Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
            <Calendar className="w-4 h-4 mr-2" />
            Start Date
          </label>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => handleChange('startDate', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
            <Calendar className="w-4 h-4 mr-2" />
            End Date
          </label>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => handleChange('endDate', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
            <DollarSign className="w-4 h-4 mr-2" />
            Min Price
          </label>
          <input
            type="number"
            placeholder="Min price"
            value={filters.minPrice || ''}
            onChange={(e) => handleChange('minPrice', e.target.value ? parseInt(e.target.value) : '')}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
            <Mail className="w-4 h-4 mr-2" />
            Email
          </label>
          <input
            type="text"
            placeholder="Customer email"
            value={filters.customerEmail || ''}
            onChange={(e) => handleChange('customerEmail', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
            <Phone className="w-4 h-4 mr-2" />
            Phone
          </label>
          <input
            type="tel"
            placeholder="Phone number"
            value={filters.customerPhone || ''}
            onChange={(e) => handleChange('customerPhone', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};