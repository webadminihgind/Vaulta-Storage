import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/server";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customer, booking } = body;

    // Validate required fields
    if (!customer?.name || !customer?.email || !customer?.phone) {
      return NextResponse.json(
        { error: "Missing required customer fields: name, email, phone" },
        { status: 400 }
      );
    }

    if (!booking?.size || !booking?.moveInDate || !booking?.totalPrice) {
      return NextResponse.json(
        { error: "Missing required booking fields: size, moveInDate, totalPrice" },
        { status: 400 }
      );
    }

    // Create Supabase admin client
    const supabaseAdmin = createAdminClient();

    // --- USER CREATION OR FETCH ---
    let userId: string;

    // Check if user exists
    const { data: existingUser } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("email", customer.email)
      .single();

    if (existingUser) {
      userId = existingUser.id;
    } else {
      // Create new user using service role (bypasses RLS)
      const { data: newUser, error: userError } = await supabaseAdmin
        .from("users")
        .insert({
          email: customer.email,
          name: customer.name,
          phone: customer.phone,
        })
        .select("id")
        .single();

      if (userError || !newUser) {
        console.error("Error creating user:", userError);
        return NextResponse.json(
          { error: "Failed to create user profile", details: userError?.message },
          { status: 500 }
        );
      }

      userId = newUser.id;
    }

    // --- PLAN CREATION OR FETCH ---
    let planId = booking.plan_id;

    if (!planId) {
      const { data: existingPlan } = await supabaseAdmin
        .from("storage_plans")
        .select("id")
        .eq("size", booking.size)
        .eq("price_per_month", booking.basePrice)
        .single();

      if (existingPlan) {
        planId = existingPlan.id;
      } else {
        const { data: newPlan, error: planError } = await supabaseAdmin
          .from("storage_plans")
          .insert({
            name: `Warehouse ${booking.size}`,
            description: `Custom warehouse space - ${booking.dimensions || booking.size}`,
            size: booking.size,
            price_per_month: booking.basePrice,
            features: ["24/7 Access", "Security Monitoring", "Loading Dock Access"],
            is_active: true,
          })
          .select("id")
          .single();

        if (planError || !newPlan) {
          console.error("Error creating storage plan:", planError);
          return NextResponse.json(
            { error: "Failed to create storage plan", details: planError?.message },
            { status: 500 }
          );
        }

        planId = newPlan.id;
      }
    }

    // --- ADD-ONS SUMMARY ---
    const addOnsSummary: string[] = [];
    if (booking.addOns) {
      if (booking.addOns.forklift?.selected && booking.addOns.forklift.hours > 0) {
        addOnsSummary.push(
          `Forklift: ${booking.addOns.forklift.hours} hours @ AED ${booking.addOns.forklift.rate}/hr`
        );
      }
      if (booking.addOns.cctvRemote?.selected) {
        addOnsSummary.push(`CCTV Remote View: AED ${booking.addOns.cctvRemote.rate}/month`);
      }
      if (booking.addOns.climateControl?.selected) {
        addOnsSummary.push(
          `Climate Control: AED ${booking.addOns.climateControl.rate}/sq ft/month`
        );
      }
      if (booking.addOns.dedicatedDock?.selected) {
        addOnsSummary.push(`Dedicated Dock: AED ${booking.addOns.dedicatedDock.rate}/month`);
      }
      if (booking.addOns.racking?.selected && booking.addOns.racking.bays > 0) {
        addOnsSummary.push(
          `Racking: ${booking.addOns.racking.bays} bays @ AED ${booking.addOns.racking.rate}/bay/month`
        );
      }
    }

    const notes = [
      customer.companyName ? `Company: ${customer.companyName}` : null,
      customer.address ? `Address: ${customer.address}` : null,
      booking.dimensions ? `Dimensions: ${booking.dimensions}` : null,
      addOnsSummary.length > 0 ? `Add-ons: ${addOnsSummary.join(", ")}` : null,
    ]
      .filter(Boolean)
      .join(" | ");

    // --- CREATE BOOKING ---
    const { data: newBooking, error: bookingError } = await supabaseAdmin
      .from("bookings")
      .insert({
        user_id: userId,
        plan_id: planId,
        start_date: booking.moveInDate,
        end_date: null,
        status: "pending",
        total_amount: booking.totalPrice,
        notes: notes || null,
      })
      .select(`
        *,
        storage_plans (
          id,
          name,
          size,
          price_per_month,
          features
        )
      `)
      .single();

    if (bookingError || !newBooking) {
      console.error("Error creating booking:", bookingError);
      return NextResponse.json(
        { error: "Failed to create booking", details: bookingError?.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        booking: newBooking,
        customer: {
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
        },
        message: "Booking created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Unexpected error in booking creation:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
