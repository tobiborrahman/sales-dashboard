'use client'
import { useEffect } from "react";

interface Props {
  filters: any;
  setFilters: any;
}

export default function Filters({ filters, setFilters }: Props) {
  console.log(filters)
  const update = (field: string, value: string) => {
    setFilters({ ...filters, [field]: value, before: "", after: "" });
  };

  useEffect(() => {
  console.log("Filters updated:", filters);
}, [filters]);


  return (
    <div className="grid md:grid-cols-5 gap-4 bg-white p-4 rounded-lg shadow">
      <input type="date"
        className="border p-2 rounded"
        value={filters.startDate}
        onChange={(e) => update("startDate", e.target.value)}
      />
      <input type="date"
        className="border p-2 rounded"
        value={filters.endDate}
        onChange={(e) => update("endDate", e.target.value)}
      />

      <input type="number" placeholder="Min Price"
        className="border p-2 rounded"
        value={filters.minPrice}
        onChange={(e) => update("minPrice", e.target.value)}
      />

      <input type="email" placeholder="Customer Email"
        className="border p-2 rounded"
        value={filters.email}
        onChange={(e) => update("email", e.target.value)}
      />

      <input type="text" placeholder="Phone"
        className="border p-2 rounded"
        value={filters.phone}
        onChange={(e) => update("phone", e.target.value)}
      />
    </div>
  );
}
