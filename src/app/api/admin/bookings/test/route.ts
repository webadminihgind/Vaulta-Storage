import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/server";

export const dynamic = 'force-dynamic';

// Debug endpoint to test bookings fetch
export async function GET(request: NextRequest) {
  try {
    const supabase = createAdminClient();

    // Test 1: Fetch raw bookings without relations
    const { data: rawBookings, error: rawError } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    console.log("Raw bookings:", rawBookings);
    console.log("Raw error:", rawError);

    // Test 2: Fetch with relations
    const { data: bookingsWithRelations, error: relError } = await supabase
      .from("bookings")
      .select(`
        *,
        users (
          id,
          name,
          email,
          phone
        ),
        storage_plans (
          id,
          name,
          size,
          price,
          dimensions
        ),
        payments (
          id,
          amount,
          status,
          payment_method,
          transaction_id,
          created_at
        )
      `)
      .order("created_at", { ascending: false });

    console.log("Bookings with relations:", bookingsWithRelations);
    console.log("Relations error:", relError);

    return NextResponse.json({
      success: true,
      rawBookings,
      rawError,
      bookingsWithRelations,
      relError,
      counts: {
        raw: rawBookings?.length || 0,
        withRelations: bookingsWithRelations?.length || 0,
      }
    });
  } catch (error: unknown) {
    console.error("Error in test:", error);

    // Ensure TypeScript knows what 'message' is
    const message = error instanceof Error ? error.message : String(error);

    return NextResponse.json(
      { error: "Test failed", details: message },
      { status: 500 }
    );
  }

}
