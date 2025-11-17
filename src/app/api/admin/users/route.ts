import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/server";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const supabase = createAdminClient();

    // Fetch all users with their booking count
    const { data: users, error } = await supabase
      .from("users")
      .select(`
        *,
        bookings (count)
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      users,
    });
  } catch (error: unknown) {
    console.error("Error fetching users:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Failed to fetch users", details: message },
      { status: 500 }
    );
  }
}
