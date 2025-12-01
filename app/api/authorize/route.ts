import { NextResponse } from "next/server";

export async function POST() {
  try {
    const base = process.env.AUTOBIZZ_BASE_URL;
    const token = process.env.AUTOBIZZ_TOKEN
    console.log('token:', token);
    if (!base) return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });

    const response = await fetch(`${base}/getAuthorize`, {
      method: "POST",
      headers: {
        Authorization: token || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tokenType: "frontEndTest" }),
    });

    const data = await response.json();
    console.log("Authorize response data:", data);
    return NextResponse.json(data, { status: response.status });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}