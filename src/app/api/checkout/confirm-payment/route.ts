import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createAdminClient } from "@/utils/supabase/server";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { paymentIntentId, paymentId } = body;

    if (!paymentIntentId || !paymentId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!process.env.STRIPE_SECRET_KEY) throw new Error("STRIPE_SECRET_KEY not set");

    const supabase = createAdminClient();
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Fetch payment record
    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .select("*, bookings(id, status, user_id, total_amount, start_date, storage_plans(name, size))")
      .eq("id", paymentId)
      .single();

    if (paymentError || !payment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    // Check if payment was successful
    if (paymentIntent.status === "succeeded") {
      // Update payment status to completed
      const { error: paymentUpdateError } = await supabase
        .from("payments")
        .update({ status: "completed" })
        .eq("id", paymentId);

      if (paymentUpdateError) {
        console.error("Failed to update payment status:", paymentUpdateError);
        // Don't fail the request, but log the error
      }

      // Update booking status to confirmed
      const { error: bookingUpdateError } = await supabase
        .from("bookings")
        .update({ status: "confirmed" })
        .eq("id", payment.booking_id);

      if (bookingUpdateError) {
        console.error("Failed to update booking status:", bookingUpdateError);
        // Don't fail the request, but log the error
      }

      // Safety check: Verify both updates succeeded
      if (paymentUpdateError || bookingUpdateError) {
        console.error("Warning: Some updates failed. Payment ID:", paymentId, "Booking ID:", payment.booking_id);
      }

      return NextResponse.json({
        success: true,
        status: "succeeded",
        payment: {
          ...payment,
          status: "completed",
          bookings: {
            ...payment.bookings,
            status: "confirmed",
          },
        },
        message: "Payment successful! Your booking is confirmed.",
      });
    } else if (paymentIntent.status === "processing") {
      return NextResponse.json({
        success: true,
        status: "processing",
        message: "Your payment is being processed.",
      });
    } else {
      return NextResponse.json({
        success: false,
        status: paymentIntent.status,
        message: "Payment failed or was cancelled.",
      }, { status: 400 });
    }
  } catch (error: unknown) {
    console.error("Confirm payment error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
