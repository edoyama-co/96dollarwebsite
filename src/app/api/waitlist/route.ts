import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, business } = await request.json();

    if (!name || !email || !business) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

    if (!GOOGLE_SCRIPT_URL) {
      // Fallback: log to console if Google Script URL isn't set yet
      console.log("WAITLIST SIGNUP:", { name, email, business, timestamp: new Date().toISOString() });
      return NextResponse.json({ success: true, fallback: true });
    }

    const res = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        business,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      throw new Error("Google Script request failed");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist signup error:", error);
    return NextResponse.json(
      { error: "Failed to process signup" },
      { status: 500 }
    );
  }
}
