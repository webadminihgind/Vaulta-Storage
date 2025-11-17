import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createAdminClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, paymentId } = body;

    if (!paymentId) return NextResponse.json({ error: "Missing paymentId" }, { status: 400 });
    if (!process.env.STRIPE_SECRET_KEY) throw new Error("STRIPE_SECRET_KEY not set");

    const supabase = createAdminClient();
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Fetch payment
    const { data: payment } = await supabase
      .from("payments")
      .select("*, bookings(id,status)")
      .eq("id", paymentId)
      .single();

    if (!payment) return NextResponse.json({ error: "Payment not found" }, { status: 404 });

    // Retrieve Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId || payment.transaction_id);

    if (session.payment_status === "paid") {
      // Update payment
      await supabase.from("payments").update({ status: "completed" }).eq("id", paymentId);
      // Update booking
      await supabase.from("bookings").update({ status: "confirmed" }).eq("id", payment.booking_id);

      return NextResponse.json({
        success: true,
        verified: true,
        status: "completed",
        paymentId,
        bookingId: payment.booking_id,
      });
    }

    return NextResponse.json({ success: false, status: session.payment_status });
  } catch (error) {
    console.error("Verify payment error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// Optional GET for payment status
export async function GET(request: NextRequest) {
  try {
    const paymentId = request.nextUrl.searchParams.get("paymentId");
    if (!paymentId) return NextResponse.json({ error: "Missing paymentId" }, { status: 400 });

    const supabase = createAdminClient();
    const { data: payment } = await supabase
      .from("payments")
      .select("*, bookings(id,status)")
      .eq("id", paymentId)
      .single();

    if (!payment) return NextResponse.json({ error: "Payment not found" }, { status: 404 });

    return NextResponse.json({ success: true, payment });
  } catch (error) {
    console.error("Get payment error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
