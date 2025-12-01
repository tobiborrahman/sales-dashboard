import { toggleSort } from "@/lib/utils";

export default function SalesTable({ data, filters, setFilters }: any) {
  console.log(data)
  const sort = (field: string) => {
    setFilters({
      ...filters,
      sortBy: field,
      sortOrder: toggleSort(filters.sortOrder),
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <table className="w-full border">
        <thead className="px-3">
          <tr className="bg-gray-100 text-left">
            <th className="p-2 cursor-pointer" onClick={() => sort("date")}>
              Date ⬍
            </th>
            <th className="p-2 cursor-pointer" onClick={() => sort("price")}>
              Price ⬍
            </th>
            <th className="p-2">Email</th>
            <th className="p-2">Phone</th>
          </tr>
        </thead>

        <tbody className="px-3">
          {data?.results?.Sales?.map((s: any) => (
            <tr key={s.id} className="border-b">
              <td className="p-2">{s.date}</td>
              <td className="p-2">${s.price}</td>
              <td className="p-2">{s.customerEmail}</td>
              <td className="p-2">{s.customerPhone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="flex justify-between mt-4">
        <button
          disabled={!data?.pagination?.before}
          onClick={() =>
            setFilters({ ...filters, before: data.before, after: "" })
          }
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-40"
        >
          Previous
        </button>

        <button
          disabled={!data?.pagination?.after}
          onClick={() =>
            setFilters({ ...filters, after: data.after, before: "" })
          }
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
