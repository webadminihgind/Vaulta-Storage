/**
 * Example React Hooks for Supabase Data Fetching
 *
 * This file demonstrates how to use Supabase with React Query
 * for efficient data fetching, caching, and state management.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/browser';

// ============================================
// STORAGE PLANS
// ============================================

/**
 * Hook to fetch all storage plans
 * Uses React Query for automatic caching and refetching
 */
export function useStoragePlans() {
  return useQuery({
    queryKey: ['storage-plans'],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('storage_plans')
        .select('*')
        .eq('is_active', true)
        .order('price_per_month', { ascending: true });

      if (error) throw error;
      return data;
    },
  });
}

/**
 * Hook to fetch a single storage plan by ID
 */
export function useStoragePlan(planId: string | null) {
  return useQuery({
    queryKey: ['storage-plan', planId],
    queryFn: async () => {
      if (!planId) return null;

      const supabase = createClient();
      const { data, error } = await supabase
        .from('storage_plans')
        .select('*')
        .eq('id', planId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!planId, // Only run query if planId is provided
  });
}

// ============================================
// BOOKINGS
// ============================================

/**
 * Hook to fetch all bookings for the current user
 */
export function useBookings() {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
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

      if (error) throw error;
      return data;
    },
  });
}

/**
 * Hook to create a new booking
 * Automatically invalidates and refetches bookings after success
 */
export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingData: {
      plan_id: string;
      start_date: string;
      end_date?: string;
      notes?: string;
    }) => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) throw new Error('Not authenticated');

      // Fetch plan to calculate total
      const { data: plan } = await supabase
        .from('storage_plans')
        .select('price_per_month')
        .eq('id', bookingData.plan_id)
        .single();

      if (!plan) throw new Error('Invalid storage plan');

      const { data, error } = await supabase
        .from('bookings')
        .insert({
          user_id: user.id,
          plan_id: bookingData.plan_id,
          start_date: bookingData.start_date,
          end_date: bookingData.end_date || null,
          notes: bookingData.notes || null,
          status: 'pending',
          total_amount: plan.price_per_month,
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

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch bookings after creating a new one
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}

/**
 * Hook to update a booking status
 */
export function useUpdateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      bookingId,
      status,
    }: {
      bookingId: string;
      status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
    }) => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', bookingId)
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

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}

// ============================================
// PAYMENTS
// ============================================

/**
 * Hook to fetch all payments for the current user
 */
export function usePayments() {
  return useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
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

      if (error) throw error;
      return data;
    },
  });
}

/**
 * Hook to create a new payment
 */
export function useCreatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (paymentData: {
      booking_id: string;
      amount: number;
      payment_method: 'credit_card' | 'bank_transfer' | 'cash';
      transaction_id?: string;
    }) => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('payments')
        .insert({
          booking_id: paymentData.booking_id,
          amount: paymentData.amount,
          payment_method: paymentData.payment_method,
          transaction_id: paymentData.transaction_id || null,
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

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}

/**
 * Hook to update a payment status
 */
export function useUpdatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      paymentId,
      status,
    }: {
      paymentId: string;
      status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
    }) => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('payments')
        .update({ status })
        .eq('id', paymentId)
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

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
    },
  });
}

// ============================================
// USAGE EXAMPLES
// ============================================

/**
 * Example Component: Display Storage Plans
 *
 * import { useStoragePlans } from '@/hooks/useSupabase';
 *
 * function StoragePlansPage() {
 *   const { data: plans, isLoading, error } = useStoragePlans();
 *
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *
 *   return (
 *     <div>
 *       {plans?.map(plan => (
 *         <div key={plan.id}>
 *           <h3>{plan.name}</h3>
 *           <p>{plan.size} - ${plan.price_per_month}/month</p>
 *         </div>
 *       ))}
 *     </div>
 *   );
 * }
 */

/**
 * Example Component: Create a Booking
 *
 * import { useCreateBooking } from '@/hooks/useSupabase';
 * import { toast } from '@/components/ui/Toaster';
 *
 * function BookingForm({ planId }: { planId: string }) {
 *   const createBooking = useCreateBooking();
 *
 *   const handleSubmit = async (e: React.FormEvent) => {
 *     e.preventDefault();
 *
 *     try {
 *       await createBooking.mutateAsync({
 *         plan_id: planId,
 *         start_date: '2024-12-01',
 *         notes: 'Need climate control',
 *       });
 *       toast({ title: 'Booking created successfully!' });
 *     } catch (error) {
 *       toast({ title: 'Failed to create booking', variant: 'destructive' });
 *     }
 *   };
 *
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       <button type="submit" disabled={createBooking.isPending}>
 *         {createBooking.isPending ? 'Creating...' : 'Book Now'}
 *       </button>
 *     </form>
 *   );
 * }
 */

/**
 * Example Component: List User's Bookings
 *
 * import { useBookings, useUpdateBooking } from '@/hooks/useSupabase';
 *
 * function MyBookings() {
 *   const { data: bookings, isLoading } = useBookings();
 *   const updateBooking = useUpdateBooking();
 *
 *   const handleCancel = async (bookingId: string) => {
 *     await updateBooking.mutateAsync({
 *       bookingId,
 *       status: 'cancelled',
 *     });
 *   };
 *
 *   if (isLoading) return <div>Loading bookings...</div>;
 *
 *   return (
 *     <div>
 *       {bookings?.map(booking => (
 *         <div key={booking.id}>
 *           <h4>{booking.storage_plans.name}</h4>
 *           <p>Status: {booking.status}</p>
 *           <p>Start: {booking.start_date}</p>
 *           <button onClick={() => handleCancel(booking.id)}>
 *             Cancel Booking
 *           </button>
 *         </div>
 *       ))}
 *     </div>
 *   );
 * }
 */
