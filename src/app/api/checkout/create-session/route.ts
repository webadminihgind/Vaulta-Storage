import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createAdminClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId, amount, currency = "AED", customer, metadata } = body;

    if (!bookingId || !amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!customer?.email || !customer?.name) {
      return NextResponse.json({ error: "Missing customer info" }, { status: 400 });
    }

    if (!process.env.STRIPE_SECRET_KEY) throw new Error("STRIPE_SECRET_KEY not set");

    const supabase = createAdminClient();
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Fetch booking
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .select("*, storage_plans(id,name,size,price_per_month)")
      .eq("id", bookingId)
      .single();

    if (bookingError || !booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (Math.abs(booking.total_amount - amount) > 0.01) {
      return NextResponse.json({ error: "Amount mismatch" }, { status: 400 });
    }

    // Create payment record
    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .insert({
        booking_id: bookingId,
        amount,
        payment_method: "card",
        status: "pending",
        payment_date: new Date().toISOString(),
        transaction_id: null,
      })
      .select("*")
      .single();

    if (paymentError || !payment) {
      return NextResponse.json({ error: "Failed to create payment" }, { status: 500 });
    }

    // Create Stripe PaymentIntent for direct card payment
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe uses cents
      currency: currency.toLowerCase(),
      automatic_payment_methods: {
        enabled: true,
      },
      description: `${booking.storage_plans.name} - ${booking.storage_plans.size}`,
      receipt_email: customer.email,
      metadata: {
        bookingId,
        paymentId: payment.id,
        customerName: customer.name,
        ...metadata,
      },
    });

    // Update payment with Stripe PaymentIntent ID
    await supabase
      .from("payments")
      .update({ transaction_id: paymentIntent.id })
      .eq("id", payment.id);

    return NextResponse.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentId: payment.id,
      bookingId,
    });
  } catch (error) {
    console.error("Create payment intent error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
