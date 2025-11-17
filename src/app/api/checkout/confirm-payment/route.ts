import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createAdminClient } from "@/utils/supabase/server";

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
      await supabase
        .from("payments")
        .update({ status: "completed" })
        .eq("id", paymentId);

      // Update booking status to confirmed
      await supabase
        .from("bookings")
        .update({ status: "confirmed" })
        .eq("id", payment.booking_id);

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
  } catch (error) {
    console.error("Confirm payment error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
