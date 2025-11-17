import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/server";

// GET all storage options
export async function GET(request: NextRequest) {
  try {
    const supabase = createAdminClient();

    const { data: storageOptions, error } = await supabase
      .from("storage_plans")
      .select("*")
      .order("size_value", { ascending: true });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      storageOptions,
    });
  } catch (error) {
    console.error("Error fetching storage options:", error);
    return NextResponse.json(
      { error: "Failed to fetch storage options" },
      { status: 500 }
    );
  }
}

// POST - Create new storage option
export async function POST(request: NextRequest) {
  try {
    const supabase = createAdminClient();
    const data = await request.json();

    const { data: newOption, error } = await supabase
      .from("storage_plans")
      .insert([
        {
          name: data.name,
          size: data.size,
          size_value: data.size_value,
          price: data.price,
          premium_price: data.premium_price,
          dimensions: data.dimensions,
          features: data.features,
          use_case: data.use_case,
          is_popular: data.is_popular || false,
          is_active: data.is_active !== false,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      storageOption: newOption,
    });
  } catch (error) {
    console.error("Error creating storage option:", error);
    return NextResponse.json(
      { error: "Failed to create storage option" },
      { status: 500 }
    );
  }
}

// PUT - Update storage option
export async function PUT(request: NextRequest) {
  try {
    const supabase = createAdminClient();
    const data = await request.json();

    if (!data.id) {
      return NextResponse.json(
        { error: "Storage option ID is required" },
        { status: 400 }
      );
    }

    const { data: updatedOption, error } = await supabase
      .from("storage_plans")
      .update({
        name: data.name,
        size: data.size,
        size_value: data.size_value,
        price: data.price,
        premium_price: data.premium_price,
        dimensions: data.dimensions,
        features: data.features,
        use_case: data.use_case,
        is_popular: data.is_popular,
        is_active: data.is_active,
      })
      .eq("id", data.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      storageOption: updatedOption,
    });
  } catch (error) {
    console.error("Error updating storage option:", error);
    return NextResponse.json(
      { error: "Failed to update storage option" },
      { status: 500 }
    );
  }
}

// DELETE - Delete storage option
export async function DELETE(request: NextRequest) {
  try {
    const supabase = createAdminClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Storage option ID is required" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("storage_plans")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: "Storage option deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting storage option:", error);
    return NextResponse.json(
      { error: "Failed to delete storage option" },
      { status: 500 }
    );
  }
}
