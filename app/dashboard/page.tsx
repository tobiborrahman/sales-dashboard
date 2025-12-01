"use client";

import { useEffect, useState } from "react";
import { getSalesData } from "../api/sales";

const Dashboard = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSales() {
      try {
        const data = await getSalesData({
          startDate: "2025-01-01",
          endDate: "2025-01-05",
        });
        console.log(data)

        setSales(data.results.Sales || []); // depends on your API structure
      } catch (err) {
        setError("Failed to load sales");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadSales();
  }, []);

  if (loading) return <p>Loading sales...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">Sales Data</h1>

      {sales.length === 0 ? (
        <p>No sales found</p>
      ) : (
        <div className="space-y-3">
          {sales.map((sale: any) => (
            <div
              key={sale.id}
              className="p-3 border rounded bg-gray-50 shadow-sm"
            >
              <p><strong>ID:</strong> {sale.id}</p>
              <p><strong>Date:</strong> {sale.date}</p>
              <p><strong>Email:</strong> {sale.customerEmail}</p>
              <p><strong>Phone:</strong> {sale.customerPhone}</p>
              <p><strong>Price:</strong> {sale.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
