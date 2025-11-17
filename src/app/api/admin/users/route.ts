import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/server";

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
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
