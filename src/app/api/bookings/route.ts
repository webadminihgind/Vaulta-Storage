import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

/**
 * GET /api/bookings
 * Fetches all bookings for the authenticated user
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

    // Fetch user's bookings with related storage plan data
    const { data: bookings, error } = await supabase
      .from('bookings')
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
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching bookings:', error);
      return NextResponse.json(
        { error: 'Failed to fetch bookings', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/bookings
 * Creates a new booking for the authenticated user
 *
 * Request body:
 * {
 *   plan_id: string (UUID),
 *   start_date: string (ISO date),
 *   end_date?: string (ISO date, optional),
 *   notes?: string
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
    const { plan_id, start_date, end_date, notes } = body;

    // Validate required fields
    if (!plan_id || !start_date) {
      return NextResponse.json(
        { error: 'Missing required fields: plan_id, start_date' },
        { status: 400 }
      );
    }

    // Fetch storage plan to calculate total amount
    const { data: plan, error: planError } = await supabase
      .from('storage_plans')
      .select('price_per_month')
      .eq('id', plan_id)
      .single();

    if (planError || !plan) {
      return NextResponse.json(
        { error: 'Invalid storage plan' },
        { status: 400 }
      );
    }

    // Calculate total amount (for now, use monthly price)
    // In production, calculate based on start_date and end_date
    const total_amount = plan.price_per_month;

    // Create booking
    const { data: booking, error } = await supabase
      .from('bookings')
      .insert({
        user_id: user.id,
        plan_id,
        start_date,
        end_date: end_date || null,
        status: 'pending',
        total_amount,
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

    if (error) {
      console.error('Error creating booking:', error);
      return NextResponse.json(
        { error: 'Failed to create booking', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/bookings
 * Updates a booking status
 *
 * Request body:
 * {
 *   booking_id: string (UUID),
 *   status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled'
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
    const { booking_id, status } = body;

    // Validate required fields
    if (!booking_id || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: booking_id, status' },
        { status: 400 }
      );
    }

    // Validate status value
    const validStatuses = ['pending', 'confirmed', 'active', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      );
    }

    // Update booking (RLS ensures user can only update their own bookings)
    const { data: booking, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', booking_id)
      .eq('user_id', user.id)
      .select(`
        *,
        storage_plans (
          id,
          name,
          size,
          price_per_month
        )
      `)
      .single();

    if (error) {
      console.error('Error updating booking:', error);
      return NextResponse.json(
        { error: 'Failed to update booking', details: error.message },
        { status: 500 }
      );
    }

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found or unauthorized' },
        { status: 404 }
      );
    }

    return NextResponse.json({ booking }, { status: 200 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
