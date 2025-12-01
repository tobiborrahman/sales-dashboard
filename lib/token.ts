// src/lib/token.ts
let cachedToken: string | null = null;
let tokenExpiry: number | null = null;

export async function getAutobizzToken(): Promise<string> {
  const now = Date.now();

  // Return cached token if valid
  if (cachedToken && tokenExpiry && now < tokenExpiry) {
    return cachedToken;
  }

  // Fetch new token
  const base = process.env.AUTOBIZZ_BASE_URL;
  if (!base) throw new Error("AUTOBIZZ_BASE_URL not set");

  const res = await fetch(`${base}/getAuthorize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tokenType: "frontEndTest" }),
  });

  if (!res.ok) throw new Error(`Failed to get token: ${res.status}`);
  const data = await res.json();

  cachedToken = data.token;
  tokenExpiry = Date.now() + (data.expire - 60) * 1000; // subtract 60s for safety

  return cachedToken;
}
