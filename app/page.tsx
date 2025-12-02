// 'use client'

// import React, { useState, useEffect } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Calendar, DollarSign, Mail, Phone, Loader } from 'lucide-react';
// import { getSalesData } from './api/sales';

// interface Sale {
//   _id: string;
//   date: string;
//   price: number;
//   customerEmail: string;
//   customerPhone: string;
// }

// interface TotalSale {
//   day: string;
//   totalSale: number;
// }

// interface PaginationData {
//   before: string;
//   after: string;
// }

// interface DashboardData {
//   results: {
//     TotalSales: TotalSale[];
//     Sales: Sale[];
//   };
//   pagination: PaginationData;
// }

// type SortField = 'date' | 'price' | null;
// type SortDirection = 'asc' | 'desc';

// interface PageHistory {
//   data: DashboardData;
//   token?: string;
// }

// export default function SalesDashboard() {
//   const [data, setData] = useState<DashboardData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [startDate, setStartDate] = useState('2025-01-01');
//   const [endDate, setEndDate] = useState('2025-01-30');
//   const [minPrice, setMinPrice] = useState('');
//   const [customerEmail, setCustomerEmail] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [sortField, setSortField] = useState<SortField>(null);
//   const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
//   const [pageHistory, setPageHistory] = useState<PageHistory[]>([]);
//   const [currentPageIndex, setCurrentPageIndex] = useState(0);

//   // Load initial data
//   useEffect(() => {
//     const loadSales = async () => {
//       try {
//         setLoading(true);
//         const result = await getSalesData({
//           startDate,
//           endDate,
//           minPrice: minPrice ? parseInt(minPrice) : undefined,
//           customerEmail: customerEmail || undefined,
//           customerPhone: phoneNumber || undefined,
//         });
        
//         if (result) {
//           setData(result);
//           setPageHistory([{ data: result }]);
//           setCurrentPageIndex(0);
//         }
//       } catch (err) {
//         console.error('Fetch error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadSales();
//   }, [startDate, endDate, minPrice, customerEmail, phoneNumber]);

//   const handleSort = (field: SortField) => {
//     if (sortField === field) {
//       setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSortField(field);
//       setSortDirection('asc');
//     }
//   };

//   const handleNextPage = async () => {
//     if (!data || !data.pagination.after) return;

//     try {
//       setLoading(true);
//       const result = await getSalesData({
//         startDate,
//         endDate,
//         minPrice: minPrice ? parseInt(minPrice) : undefined,
//         customerEmail: customerEmail || undefined,
//         customerPhone: phoneNumber || undefined,
//         after: data.pagination.after,
//       });

//       if (result) {
//         const newHistory = pageHistory.slice(0, currentPageIndex + 1);
//         newHistory.push({ data: result, token: data.pagination.after });
//         setPageHistory(newHistory);
//         setCurrentPageIndex(newHistory.length - 1);
//         setData(result);
//       }
//     } catch (err) {
//       console.error('Error loading next page:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePreviousPage = async () => {
//     if (currentPageIndex === 0) return;

//     const prevIndex = currentPageIndex - 1;
//     const prevPage = pageHistory[prevIndex];

//     if (prevPage) {
//       setData(prevPage.data);
//       setCurrentPageIndex(prevIndex);
//     }
//   };

//   if (loading && !data) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
//         <div className="text-center">
//           <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
//           <p className="text-slate-600 text-lg">Loading dashboard data...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!data) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-red-600 text-lg">Error loading data. Please try again.</p>
//         </div>
//       </div>
//     );
//   }

//   const allSales = data.results.Sales;
//   const totalSalesData = data.results.TotalSales;

//   const sortedData = [...allSales].sort((a, b) => {
//     if (!sortField) return 0;

//     let aVal = sortField === 'date' ? new Date(a.date).getTime() : a.price;
//     let bVal = sortField === 'date' ? new Date(b.date).getTime() : b.price;

//     return sortDirection === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
//   });

//   const chartData = totalSalesData.filter(d => {
//     const date = new Date(d.day);
//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     return date >= start && date <= end;
//   });

//   const resetFilters = () => {
//     setStartDate('2025-01-01');
//     setEndDate('2025-01-30');
//     setMinPrice('');
//     setCustomerEmail('');
//     setPhoneNumber('');
//     setSortField(null);
//     setSortDirection('asc');
//   };

//   const totalValue = sortedData.reduce((sum, item) => sum + item.price, 0);
//   const avgPrice = sortedData.length > 0 ? Math.round(totalValue / sortedData.length) : 0;
//   const hasNextPage = !!data.pagination.after;
//   const hasPrevPage = currentPageIndex > 0;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-slate-900 mb-2">Sales Dashboard</h1>
//           <p className="text-slate-600">Monitor your sales data with filters and analytics</p>
//         </div>

//         {/* Filters */}
//         <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//           <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
//             <h2 className="text-xl font-semibold text-slate-900">Filters</h2>
//             <button
//               onClick={resetFilters}
//               className="px-4 py-2 text-sm bg-slate-200 cursor-pointer text-slate-700 rounded-lg hover:bg-slate-300 transition"
//             >
//               Reset Filters
//             </button>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
//             {/* Start Date */}
//             <div>
//               <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
//                 <Calendar className="w-4 h-4 mr-2" />
//                 Start Date
//               </label>
//               <input
//                 type="date"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//                 className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             {/* End Date */}
//             <div>
//               <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
//                 <Calendar className="w-4 h-4 mr-2" />
//                 End Date
//               </label>
//               <input
//                 type="date"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//                 className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             {/* Min Price */}
//             <div>
//               <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
//                 <DollarSign className="w-4 h-4 mr-2" />
//                 Min Price
//               </label>
//               <input
//                 type="number"
//                 placeholder="Min price"
//                 value={minPrice}
//                 onChange={(e) => setMinPrice(e.target.value)}
//                 className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
//                 <Mail className="w-4 h-4 mr-2" />
//                 Email
//               </label>
//               <input
//                 type="text"
//                 placeholder="Customer email"
//                 value={customerEmail}
//                 onChange={(e) => setCustomerEmail(e.target.value)}
//                 className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             {/* Phone */}
//             <div>
//               <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
//                 <Phone className="w-4 h-4 mr-2" />
//                 Phone
//               </label>
//               <input
//                 type="tel"
//                 placeholder="Phone number"
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//                 className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Chart */}
//         <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//           <h2 className="text-xl font-semibold text-slate-900 mb-6">Total Sales Over Time</h2>
//           {chartData.length > 0 ? (
//             <ResponsiveContainer width="100%" height={400}>
//               <LineChart data={chartData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
//                 <XAxis 
//                   dataKey="day" 
//                   tick={{ fontSize: 12 }}
//                   tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//                 />
//                 <YAxis tick={{ fontSize: 12 }} />
//                 <Tooltip 
//                   contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
//                   formatter={(value) => `$${(value as number).toLocaleString()}`}
//                   labelFormatter={(label) => new Date(label).toLocaleDateString()}
//                 />
//                 <Legend />
//                 <Line 
//                   type="monotone" 
//                   dataKey="totalSale" 
//                   stroke="#3b82f6" 
//                   dot={false}
//                   strokeWidth={2}
//                   name="Total Sales"
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           ) : (
//             <div className="text-center py-12 text-slate-500">No data available for selected date range</div>
//           )}
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <p className="text-slate-600 text-sm font-medium">Total Records (This Page)</p>
//             <p className="text-3xl font-bold text-slate-900 mt-2">{sortedData.length}</p>
//           </div>
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <p className="text-slate-600 text-sm font-medium">Total Sales Value</p>
//             <p className="text-3xl font-bold text-green-600 mt-2">${totalValue.toLocaleString()}</p>
//           </div>
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <p className="text-slate-600 text-sm font-medium">Average Price</p>
//             <p className="text-3xl font-bold text-blue-600 mt-2">${avgPrice}</p>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="p-6 border-b border-slate-200">
//             <h2 className="text-xl font-semibold text-slate-900">Sales Details</h2>
//           </div>

//           {sortedData.length > 0 ? (
//             <>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-slate-50 border-b border-slate-200">
//                     <tr>
//                       <th className="px-6 py-3 text-left">
//                         <button
//                           onClick={() => handleSort('date')}
//                           className="flex items-center text-sm cursor-pointer font-semibold text-slate-900 hover:text-blue-600 transition"
//                         >
//                           Date
//                           {sortField === 'date' && (
//                             sortDirection === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
//                           )}
//                         </button>
//                       </th>
//                       <th className="px-6 py-3 text-left">
//                         <button
//                           onClick={() => handleSort('price')}
//                           className="flex items-center text-sm cursor-pointer font-semibold text-slate-900 hover:text-blue-600 transition"
//                         >
//                           Price
//                           {sortField === 'price' && (
//                             sortDirection === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
//                           )}
//                         </button>
//                       </th>
//                       <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Email</th>
//                       <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Phone</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {sortedData.map((sale, idx) => (
//                       <tr key={sale._id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
//                         <td className="px-6 py-4 text-sm text-slate-900">
//                           {new Date(sale.date).toLocaleDateString('en-US', { 
//                             year: 'numeric', 
//                             month: 'short', 
//                             day: 'numeric',
//                             hour: '2-digit',
//                             minute: '2-digit'
//                           })}
//                         </td>
//                         <td className="px-6 py-4 text-sm font-medium text-slate-900">${sale.price}</td>
//                         <td className="px-6 py-4 text-sm text-slate-600">{sale.customerEmail}</td>
//                         <td className="px-6 py-4 text-sm text-slate-600">{sale.customerPhone}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Pagination */}
//               <div className="px-6 py-4 border-t border-slate-200 flex justify-between items-center flex-wrap gap-4">
//                 <div className="text-sm text-slate-600">
//                   Page <span className="font-semibold">{currentPageIndex + 1}</span> • 
//                   Showing <span className="font-semibold">{sortedData.length}</span> results
//                 </div>

//                 <div className="flex gap-2">
//                   <button
//                     onClick={handlePreviousPage}
//                     disabled={!hasPrevPage || loading}
//                     className="flex items-center gap-2 px-4 py-2 cursor-pointer border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
//                   >
//                     <ChevronLeft className="w-4 h-4" />
//                     Previous
//                   </button>
//                   <button
//                     onClick={handleNextPage}
//                     disabled={!hasNextPage || loading}
//                     className="flex items-center gap-2 px-4 py-2 border cursor-pointer border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
//                   >
//                     Next
//                     <ChevronRight className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </>
//           ) : (
//             <div className="p-12 text-center text-slate-500">
//               No sales data found matching your filters
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { Dashboard } from '@/components/Dashboard';

export default function Home() {
  return <Dashboard />;
}