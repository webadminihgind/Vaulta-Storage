import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

/**
 * GET /api/payments
 * Fetches all payments for the authenticated user's bookings
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();

    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch payments with related booking data
    // RLS policy ensures user can only see payments for their own bookings
    const { data: payments, error } = await supabase
      .from('payments')
      .select(`
        *,
        bookings (
          id,
          start_date,
          end_date,
          status,
          storage_plans (
            id,
            name,
            size
          )
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching payments:', error);
      return NextResponse.json(
        { error: 'Failed to fetch payments', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ payments }, { status: 200 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/payments
 * Creates a new payment for a booking
 *
 * Request body:
 * {
 *   booking_id: string (UUID),
 *   amount: number,
 *   payment_method: 'credit_card' | 'bank_transfer' | 'cash',
 *   transaction_id?: string
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();

    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { booking_id, amount, payment_method, transaction_id } = body;

    // Validate required fields
    if (!booking_id || !amount || !payment_method) {
      return NextResponse.json(
        { error: 'Missing required fields: booking_id, amount, payment_method' },
        { status: 400 }
      );
    }

    // Validate payment method
    const validMethods = ['credit_card', 'bank_transfer', 'cash'];
    if (!validMethods.includes(payment_method)) {
      return NextResponse.json(
        { error: 'Invalid payment method' },
        { status: 400 }
      );
    }

    // Verify booking exists and belongs to user
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .select('id, user_id')
      .eq('id', booking_id)
      .eq('user_id', user.id)
      .single();

    if (bookingError || !booking) {
      return NextResponse.json(
        { error: 'Booking not found or unauthorized' },
        { status: 404 }
      );
    }

    // Create payment
    const { data: payment, error } = await supabase
      .from('payments')
      .insert({
        booking_id,
        amount,
        payment_method,
        transaction_id: transaction_id || null,
        status: 'pending',
        payment_date: new Date().toISOString(),
      })
      .select(`
        *,
        bookings (
          id,
          start_date,
          end_date,
          status,
          storage_plans (
            id,
            name,
            size
          )
        )
      `)
      .single();

    if (error) {
      console.error('Error creating payment:', error);
      return NextResponse.json(
        { error: 'Failed to create payment', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ payment }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/payments
 * Updates a payment status
 *
 * Request body:
 * {
 *   payment_id: string (UUID),
 *   status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
 * }
 */
export async function PATCH(request: NextRequest) {
  try {
    const supabase = createClient();

    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { payment_id, status } = body;

    // Validate required fields
    if (!payment_id || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: payment_id, status' },
        { status: 400 }
      );
    }

    // Validate status value
    const validStatuses = ['pending', 'processing', 'completed', 'failed', 'refunded'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      );
    }

    // Update payment (RLS ensures user can only update payments for their own bookings)
    const { data: payment, error } = await supabase
      .from('payments')
      .update({ status })
      .eq('id', payment_id)
      .select(`
        *,
        bookings (
          id,
          user_id,
          start_date,
          end_date,
          status,
          storage_plans (
            id,
            name,
            size
          )
        )
      `)
      .single();

    if (error) {
      console.error('Error updating payment:', error);
      return NextResponse.json(
        { error: 'Failed to update payment', details: error.message },
        { status: 500 }
      );
    }

    if (!payment) {
      return NextResponse.json(
        { error: 'Payment not found or unauthorized' },
        { status: 404 }
      );
    }

    return NextResponse.json({ payment }, { status: 200 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
