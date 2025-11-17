import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = createAdminClient();

    // Fetch all bookings with related data
    const { data: bookings, error } = await supabase
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
          description,
          size,
          price_per_month
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

    if (error) {
      console.error("Supabase error fetching bookings:", error);
      throw error;
    }

    console.log("Fetched bookings count:", bookings?.length || 0);
    console.log("Sample booking:", bookings?.[0]);

    return NextResponse.json({
      success: true,
      bookings: bookings || [],
      count: bookings?.length || 0,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings", details: error.message },
      { status: 500 }
    );
  }
}
