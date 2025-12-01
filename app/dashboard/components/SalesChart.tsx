"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function SalesChart({ data }: { data: any[] }) {
  // Transform data: rename 'day' -> 'date' and 'totalSale' -> 'totalSales'
  const chartData = data.map(item => ({
    date: item.day,
    totalSales: item.totalSale,
  }));

  console.log(chartData);

  return (
    <div className="bg-white p-4 rounded-lg shadow h-72">
      <h2 className="font-bold mb-3">Total Sales Over Time</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="totalSales" stroke="#2563eb" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

