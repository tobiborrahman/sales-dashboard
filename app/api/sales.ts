const BASE_URL = "https://autobizz-425913.uc.r.appspot.com";

async function authorize() {
  const res = await fetch(`${BASE_URL}/getAuthorize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tokenType: "frontEndTest" }),
  });

  if (!res.ok) throw new Error("Authorization failed");

  const data = await res.json();

  // REAL KEY IS "token"
  return data.token; 
}

export async function getSalesData(filters: any) {
  // 1️⃣ Get token from /getAuthorize
  const token = await authorize();
  if (!token) throw new Error("Missing server token");

  // 2️⃣ Build params
  const params = new URLSearchParams({
    startDate: filters.startDate || "",
    endDate: filters.endDate || "",
    priceMin: filters.priceMin || "",
    email: filters.email || "",
    phone: filters.phone || "",
    sortBy: filters.sortBy || "date",
    sortOrder: filters.sortOrder || "asc",
    before: filters.before || "",
    after: filters.after || "",
  });

  // 3️⃣ GET /sales with header
  const res = await fetch(`${BASE_URL}/sales?${params.toString()}`, {
    method: "GET",
    headers: {
      "X-AUTOBIZZ-TOKEN": token,
    },
  });

  if (!res.ok) throw new Error("Sales fetch failed");
  return res.json();
}
