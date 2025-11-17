import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/server";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const supabase = createAdminClient();

    // Fetch all payments with related booking and user data
    const { data: payments, error } = await supabase
      .from("payments")
      .select(`
        *,
        bookings (
          id,
          users (
            id,
            name,
            email
          ),
          storage_plans (
            name,
            size
          )
        )
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      payments,
    });
  } catch (error: unknown) {
    console.error("Error fetching payments:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Failed to fetch payments", details: message },
      { status: 500 }
    );
  }
}
