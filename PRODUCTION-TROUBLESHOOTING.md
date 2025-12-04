# Production Booking Error - Troubleshooting Guide

## Error Overview
The booking creation API is failing with a 500 error in production but works locally.

## Changes Made to Help Diagnose

I've added extensive logging to [src/app/api/booking/create/route.ts](src/app/api/booking/create/route.ts) to help identify the exact failure point:

1. ✅ Environment variable validation at the start
2. ✅ Request data logging
3. ✅ User lookup error handling with `.maybeSingle()`
4. ✅ Storage plan lookup error handling with `.maybeSingle()`
5. ✅ Added `size_value` field to storage plan creation
6. ✅ Detailed error stack trace logging
7. ✅ TypeScript error handling improved

## Most Likely Causes

### 1. Missing Environment Variables ⚠️ **MOST COMMON**

**Check your production environment variables:**

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` (⚠️ This is different from ANON_KEY!)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**In Vercel:**
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Verify ALL three variables are set
4. **IMPORTANT**: `SUPABASE_SERVICE_ROLE_KEY` must be the **service_role key**, NOT the anon key
5. You can find this in Supabase Dashboard → Settings → API → `service_role` key (secret)

**After adding/updating:**
- Redeploy your application
- The new error message will tell you if env vars are missing

### 2. Database Schema Mismatch

**Check if your production database has all required columns:**

#### `users` table needs:
- `id` (uuid, primary key)
- `email` (text)
- `name` (text)
- `phone` (text)
- `created_at` (timestamp)

#### `storage_plans` table needs:
- `id` (uuid, primary key)
- `name` (text)
- `description` (text)
- `size` (text)
- `size_value` (integer) ← **NEWLY ADDED**
- `price_per_month` (numeric/decimal)
- `features` (text[] or jsonb)
- `is_active` (boolean)
- `created_at` (timestamp)

#### `bookings` table needs:
- `id` (uuid, primary key)
- `user_id` (uuid, foreign key → users.id)
- `plan_id` (uuid, foreign key → storage_plans.id)
- `start_date` (date)
- `end_date` (date, nullable)
- `status` (text)
- `total_amount` (numeric/decimal)
- `notes` (text, nullable)
- `created_at` (timestamp)

**If `size_value` column is missing from `storage_plans`:**

Run this SQL in Supabase SQL Editor:

```sql
ALTER TABLE storage_plans ADD COLUMN IF NOT EXISTS size_value INTEGER;
```

### 3. Row Level Security (RLS) Policies

Even though we're using the service_role key (which bypasses RLS), check if:

1. RLS is enabled on tables
2. Policies exist for INSERT operations
3. Foreign key constraints are properly set up

**Check RLS in Supabase:**
- Dashboard → Table Editor → Select table → RLS tab
- Service role key should bypass all policies, but constraints still apply

### 4. Foreign Key Constraints

If users or storage_plans creation fails silently, the booking creation will fail.

**Check production logs for:**
- "Error creating user:"
- "Error creating storage plan:"
- "Error looking up user:"
- "Error looking up storage plan:"

## How to Debug in Production

### Step 1: Check Logs

**In Vercel:**
1. Go to your deployment
2. Click on "Functions" tab
3. Find `/api/booking/create`
4. Check real-time logs

**Look for these specific log messages:**
```
"Missing Supabase environment variables" → Fix env vars
"Looking for existing user: [email]" → User lookup started
"Found existing user: [id]" → User found
"Creating new user" → New user being created
"Error creating user:" → User creation failed (check details)
"Looking for storage plan:" → Plan lookup started
"Found existing plan: [id]" → Plan found
"Creating new storage plan" → New plan being created
"Error creating storage plan:" → Plan creation failed (check details)
"Error creating booking:" → Final booking creation failed
```

### Step 2: Test API Directly

Use curl or Postman to test the API:

```bash
curl -X POST https://your-domain.vercel.app/api/booking/create \
  -H "Content-Type: application/json" \
  -d '{
    "customer": {
      "name": "Test User",
      "email": "test@example.com",
      "phone": "+971501234567",
      "companyName": "Test Co",
      "address": "Dubai"
    },
    "booking": {
      "size": "500 SQ FT",
      "basePrice": 5000,
      "moveInDate": "2024-12-01",
      "totalPrice": 5000,
      "dimensions": "20x25 ft"
    }
  }'
```

### Step 3: Check Supabase Connection

In Supabase Dashboard:
1. Go to Settings → API
2. Verify the URL matches your `NEXT_PUBLIC_SUPABASE_URL`
3. Copy the `service_role` key and ensure it matches `SUPABASE_SERVICE_ROLE_KEY`

### Step 4: Check Database Logs

In Supabase:
1. Go to Database → Logs
2. Look for errors during the time of booking attempt
3. Check for constraint violations, permission errors, or missing columns

## Quick Fixes to Try

### Fix 1: Redeploy with Environment Variables

1. Verify all env vars in Vercel
2. Trigger a redeploy (don't reuse build cache)
3. Test booking again

### Fix 2: Add Missing Column

```sql
-- Run in Supabase SQL Editor
ALTER TABLE storage_plans ADD COLUMN IF NOT EXISTS size_value INTEGER;

-- Update existing rows
UPDATE storage_plans
SET size_value = CAST(regexp_replace(size, '[^0-9]', '', 'g') AS INTEGER)
WHERE size_value IS NULL;
```

### Fix 3: Simplify Booking Creation (Temporary)

If you need to get production working ASAP, you can temporarily remove the automatic plan creation and require plan_id to be passed:

In booking page, fetch existing plans and pass the plan_id instead of creating new ones.

## Testing After Fixes

1. Deploy changes
2. Open browser console
3. Attempt booking
4. Check Vercel Function logs
5. Error message should now be more specific

## Expected Success Flow

When working correctly, you should see these logs in order:

```
Booking request received: { hasCustomer: true, hasBooking: true, ... }
Looking for existing user: [email]
Found existing user: [uuid] OR Creating new user
Looking for storage plan: { size: "500 SQ FT", basePrice: 5000 }
Found existing plan: [uuid] OR Creating new storage plan
[Success response]
```

## Contact Support If Needed

If none of these fixes work:

1. Export logs from Vercel Functions showing the error
2. Screenshot of Supabase environment variables (hide actual values)
3. Confirm database schema matches requirements above
4. Check if issue occurs with a fresh deployment

## After Issue is Resolved

Once working, you can optionally reduce logging by removing console.log statements, but keep the error logging for production monitoring.
