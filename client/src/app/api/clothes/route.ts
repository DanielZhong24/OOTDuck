/* eslint-disable @typescript-eslint/no-explicit-any */
import backendRoute from "../variable";
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
    return NextResponse.json(
      { error: "Failed to fetch clothes" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const apiCall: string = backendRoute + "clothes";
    const body: FormData = await request.formData();

    const response: Response = await fetch(apiCall, {
      method: "POST",
      headers: {
        "Content-Type": request.headers.get("Content-Type") || "",
      },
      body: body,
    });

    const data: Response = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in POST /api/clothes:", error);
    return NextResponse.json(
      { error: "Failed to upload clothing" },
      { status: 500 },
    );
  }
}
