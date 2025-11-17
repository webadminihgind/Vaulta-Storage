# Database Fix Guide - Show Bookings in Admin Panel

## Problem
Your admin panel is not showing the 3 bookings you have in the database. This is because the database schema doesn't match the API expectations.

---

## Solution

### Step 1: Run the Schema Fix SQL

1. **Go to Supabase Dashboard**
   - Log in to your Supabase project
   - Go to **SQL Editor** (left sidebar)

2. **Run the Fix Script**
   - Open the file: `supabase-schema-fix.sql`
   - Copy ALL the SQL code
   - Paste it into the Supabase SQL Editor
   - Click **"Run"** button

This script will:
- ✅ Add missing columns to `storage_plans` table
- ✅ Add missing columns to `bookings` table
- ✅ Insert 5 default storage options
- ✅ Link existing bookings to storage plans
- ✅ Update indexes for better performance
- ✅ Verify the migration worked

### Step 2: Verify the Fix

After running the script, you'll see a summary at the bottom showing:
- Total users
- Active storage plans
- Total bookings
- Completed payments
- Total revenue

You should also see a table showing your 3 bookings with all details.

### Step 3: Refresh the Admin Panel

1. Go to your admin panel: `http://localhost:3000/admin/login`
2. Login with default credentials
3. Go to **Bookings** page
4. You should now see all 3 bookings! 🎉

---

## What the Script Does

### 1. Updates `storage_plans` Table

Adds these columns:
- `size_value` - Integer for sorting (500, 1000, 2000, etc.)
- `price` - Text format (e.g., "AED 4,500/month")
- `premium_price` - Premium pricing option
- `dimensions` - Description (e.g., "SME storage / light operations")
- `use_case` - Use case description
- `is_popular` - Boolean flag for popular options

### 2. Updates `bookings` Table

Adds these columns:
- `move_in_date` - When customer wants to move in
- `size` - Storage size booked (e.g., "1,000 SQ FT")
- `dimensions` - Storage description
- `add_ons` - JSON field for additional services
- `company_name` - Customer's company
- `address` - Customer's address

### 3. Updates `users` Table

Adds these columns:
- `company_name` - User's company
- `address` - User's address

### 4. Inserts Default Storage Options

Adds 5 storage options:
- 500 SQ FT - AED 4,500/month
- 1,000 SQ FT - AED 9,000/month (Popular)
- 2,000 SQ FT - AED 18,000/month
- 3,000 SQ FT - AED 27,000/month
- 5,000 SQ FT - AED 45,000/month

### 5. Links Bookings to Storage Plans

Automatically connects your existing bookings to the correct storage plan based on the size field.

---

## Expected Result

### Before Fix:
```
Admin Bookings Page:
┌─────────────────────────┐
│ No bookings found       │
└─────────────────────────┘
```

### After Fix:
```
Admin Bookings Page:
┌────────────────────────────────────────────────────────────────┐
│ Booking ID  | Customer      | Storage | Amount    | Status     │
├────────────────────────────────────────────────────────────────┤
│ A7B2C3D4... | John Doe      | 1000 SF | AED 9,000 | confirmed  │
│ E8F9G0H1... | Jane Smith    | 500 SF  | AED 4,500 | pending    │
│ I2J3K4L5... | Bob Johnson   | 2000 SF | AED 18,000| confirmed  │
└────────────────────────────────────────────────────────────────┘
```

---

## Troubleshooting

### Issue: Script fails with "column already exists" error
**Solution:** This is normal if you've run parts of the schema before. The script uses `ADD COLUMN IF NOT EXISTS` so it's safe to run multiple times.

### Issue: Still no bookings showing
**Possible causes:**
1. **RLS Policies blocking access**
   - Check if you're using the service role key for admin API
   - Verify in `.env.local`: `SUPABASE_SERVICE_ROLE_KEY` is set

2. **Bookings don't have user_id**
   - Run this query in Supabase:
     ```sql
     SELECT id, user_id, plan_id, size, status, created_at
     FROM bookings;
     ```
   - If `user_id` is NULL, you need to link bookings to users

3. **API not using correct Supabase client**
   - Verify `src/app/api/admin/bookings/route.ts` uses `createAdminClient()`

### Issue: Column type mismatch
**Solution:** Run this to check column types:
```sql
SELECT
  column_name,
  data_type
FROM information_schema.columns
WHERE table_name = 'bookings'
ORDER BY ordinal_position;
```

---

## Manual Fix (Alternative)

If the automated script doesn't work, you can manually add columns:

### 1. Add columns to storage_plans:
```sql
ALTER TABLE storage_plans
  ADD COLUMN size_value INTEGER,
  ADD COLUMN price TEXT,
  ADD COLUMN premium_price TEXT,
  ADD COLUMN dimensions TEXT,
  ADD COLUMN use_case TEXT,
  ADD COLUMN is_popular BOOLEAN DEFAULT false;
```

### 2. Add columns to bookings:
```sql
ALTER TABLE bookings
  ADD COLUMN move_in_date DATE,
  ADD COLUMN size TEXT,
  ADD COLUMN dimensions TEXT;
```

### 3. Insert storage options manually:
```sql
INSERT INTO storage_plans (size, size_value, price, dimensions, features, is_active)
VALUES ('1,000 SQ FT', 1000, 'AED 9,000/month', 'Contractors / e-commerce',
        '["24/7 access", "Climate control available"]'::jsonb, true);
```

### 4. Link bookings to plans:
```sql
UPDATE bookings b
SET plan_id = sp.id
FROM storage_plans sp
WHERE b.size = sp.size;
```

---

## Quick Test

After running the fix, test each API endpoint:

### Test 1: Get Storage Plans
```bash
curl http://localhost:3000/api/storage-plans
```
**Expected:** List of 5 storage options

### Test 2: Get Bookings (as admin)
```bash
curl http://localhost:3000/api/admin/bookings
```
**Expected:** Your 3 bookings with customer details

### Test 3: Get Users
```bash
curl http://localhost:3000/api/admin/users
```
**Expected:** List of users who made bookings

---

## Summary

1. ✅ Run `supabase-schema-fix.sql` in Supabase SQL Editor
2. ✅ Verify the output shows your bookings
3. ✅ Refresh admin panel
4. ✅ All 3 bookings should now be visible!

The issue was that the database schema was missing columns that the admin panel API expects. The fix script adds all missing columns and links your existing data properly.

Your bookings are in the database - they just weren't showing because of the schema mismatch. After running the fix, everything will work! 🚀
