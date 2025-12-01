export const fetchSales = async (filters: Record<string,string>) => {
  const qs = new URLSearchParams(filters).toString();
  const res = await fetch(`/data.json?${qs}`);
  console.log('Fetch sales response status:', res);
  if (!res.ok) throw new Error(`Sales fetch failed: ${res.status}`);
  return res.json();
};
