import { NextRequest, NextResponse } from "next/server";

// Simple admin authentication
// In production, use proper authentication with hashed passwords
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Simple check - in production, use database and hashed passwords
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@vaultastorage.com";
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      return NextResponse.json({
        success: true,
        message: "Login successful",
      });
    } else {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
