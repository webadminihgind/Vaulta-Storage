# Vaulta Storage - Setup Guide

This guide will help you set up Supabase and Stripe for your Vaulta Storage application.

## Issues Fixed

1. ✅ Fixed environment variable references in booking API route
2. ✅ Fixed Stripe payment method mismatch (credit_card vs card)
3. ✅ Created proper Supabase admin client usage
4. ✅ Created database schema for Supabase

## Supabase Setup

### Step 1: Create Database Tables

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `supabase-schema.sql` file
5. Paste it into the SQL editor
6. Click **Run** to execute the SQL

This will create:
- `users` table - stores customer information
- `storage_plans` table - stores warehouse storage plans
- `bookings` table - stores booking records
- `payments` table - stores payment information
- All necessary indexes and RLS policies
- Sample storage plans

### Step 2: Verify Environment Variables

Your `.env.local` file should have these variables (already configured):

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://gfldphpwsybxtrdimrft.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 3: Test Supabase Connection

After creating the tables, you can verify by:
1. Going to **Table Editor** in Supabase
2. You should see: `users`, `storage_plans`, `bookings`, `payments`
3. Check that `storage_plans` has 4 sample entries

## Stripe Setup

### Step 1: Verify Stripe Keys

Your `.env.local` already has Stripe test keys configured:

```env
# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51STesl572eQKUtVk...
STRIPE_SECRET_KEY=sk_test_51STesl572eQKUtVkz6UzfUScu9z2lkw0...
```

### Step 2: Configure Stripe Webhook (Optional for Production)

For production, you'll need to set up webhooks:
1. Go to Stripe Dashboard: https://dashboard.stripe.com/
2. Navigate to **Developers** > **Webhooks**
3. Click **Add endpoint**
4. Enter URL: `https://yourdomain.com/api/checkout/webhook`
5. Select events: `checkout.session.completed`, `payment_intent.succeeded`

### Step 3: Test Stripe Payments

Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Requires authentication: `4000 0025 0000 3155`
- Declined: `4000 0000 0000 9995`
- Expiry: Any future date (e.g., 12/25)
- CVV: Any 3 digits (e.g., 123)

## Testing the Application

### 1. Start the Development Server

```bash
npm run dev
```

### 2. Test Booking Flow

1. Navigate to `http://localhost:3000`
2. Select a storage size
3. Click "Book Now"
4. Fill in the booking form with:
   - Full Name
   - Email
   - Phone Number
   - Move-in Date
   - Optional: Select add-on services
5. Click "Proceed to Checkout"

### 3. Test Checkout Flow

1. Select payment method:
   - **Credit Card**: Uses Stripe Checkout
   - **Bank Transfer**: Manual payment (no Stripe)
   - **Cash**: Manual payment (no Stripe)

2. For Credit Card payments:
   - Use test card: `4242 4242 4242 4242`
   - Enter any future expiry date
   - Enter any 3-digit CVV
   - Click "Complete Payment"

3. You should be redirected to Stripe Checkout
4. After payment, you'll be redirected back to confirmation page

## Troubleshooting

### Error: "Missing required customer fields"
- Make sure all required fields in the booking form are filled
- Check: name, email, phone, moveInDate

### Error: "Failed to create user profile"
- Verify Supabase tables are created (run `supabase-schema.sql`)
- Check that `SUPABASE_SERVICE_ROLE_KEY` is set in `.env.local`
- Verify the service role key has admin privileges

### Error: "Booking not found"
- Make sure you're being redirected from the booking page
- Check browser console for API errors
- Verify `bookingId` is in the URL query params

### Error: "Failed to create checkout session"
- Verify `STRIPE_SECRET_KEY` is correct in `.env.local`
- Check that the Stripe key starts with `sk_test_`
- Make sure the amount is valid (greater than 0)

### Stripe Checkout not opening
- Verify `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set
- Check that the key starts with `pk_test_`
- Look for JavaScript errors in browser console

### Database Connection Errors
- Verify Supabase URL is correct
- Check that your Supabase project is active
- Ensure RLS policies are properly configured

## Database Schema Overview

### Users Table
- `id`: UUID (primary key)
- `email`: Text (unique)
- `name`: Text
- `phone`: Text
- `created_at`, `updated_at`: Timestamps

### Storage Plans Table
- `id`: UUID (primary key)
- `name`: Text (e.g., "Small Warehouse")
- `size`: Text (e.g., "500 SQ FT")
- `price_per_month`: Decimal
- `features`: JSONB array
- `is_active`: Boolean

### Bookings Table
- `id`: UUID (primary key)
- `user_id`: UUID (foreign key to users)
- `plan_id`: UUID (foreign key to storage_plans)
- `start_date`: Date
- `status`: Text (pending/confirmed/active/cancelled/completed)
- `total_amount`: Decimal
- `notes`: Text (includes add-ons info)

### Payments Table
- `id`: UUID (primary key)
- `booking_id`: UUID (foreign key to bookings)
- `amount`: Decimal
- `payment_method`: Text (credit_card/bank_transfer/cash)
- `status`: Text (pending/completed/failed/refunded)
- `transaction_id`: Text (Stripe session ID)

## Next Steps

1. ✅ Run the SQL schema in Supabase
2. ✅ Test the booking flow
3. ✅ Test the checkout flow with Stripe test cards
4. Consider adding email notifications for bookings
5. Set up Stripe webhooks for production
6. Add booking confirmation emails

## Support

If you encounter any issues:
1. Check the browser console for JavaScript errors
2. Check the terminal for API route errors
3. Verify all environment variables are set correctly
4. Ensure Supabase tables exist and have proper RLS policies
