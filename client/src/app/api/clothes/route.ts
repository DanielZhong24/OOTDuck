import backendRoute from '../variable';
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiCall = backendRoute + "clothes";
    console.log("Calling backend:", apiCall);

    const response = await fetch(apiCall);

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Fetch failed:", err);
    return NextResponse.json({ error: "Failed to fetch clothes" }, { status: 500 });
  }
}
