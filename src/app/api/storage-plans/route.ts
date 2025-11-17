import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export const dynamic = 'force-dynamic';

// Public API to fetch active storage plans
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();

    const { data: storagePlans, error } = await supabase
      .from("storage_plans")
      .select("*")
      .eq("is_active", true)
      .order("size_value", { ascending: true});

    if (error) throw error;

    return NextResponse.json({
      success: true,
      storagePlans,
    });
  } catch (error: unknown) {
    console.error("Error fetching storage plans:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Failed to fetch storage plans", details: message },
      { status: 500 }
    );
  }
}
