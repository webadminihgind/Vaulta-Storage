# Quick Fix - Show Bookings in Admin Panel

## 🚨 Problem
Admin panel shows "No bookings found" even though you have 3 bookings in the database.

## ✅ Solution (2 minutes)

### Step 1: Open Supabase
1. Go to https://supabase.com/dashboard
2. Select your project
3. Click **"SQL Editor"** in left sidebar

### Step 2: Run This SQL
Copy and paste this ENTIRE script into the SQL Editor and click **"Run"**:

```sql
-- Add missing columns to storage_plans
ALTER TABLE storage_plans
  ADD COLUMN IF NOT EXISTS size_value INTEGER,
  ADD COLUMN IF NOT EXISTS price TEXT,
  ADD COLUMN IF NOT EXISTS premium_price TEXT,
  ADD COLUMN IF NOT EXISTS dimensions TEXT,
  ADD COLUMN IF NOT EXISTS use_case TEXT,
  ADD COLUMN IF NOT EXISTS is_popular BOOLEAN DEFAULT false;

-- Add missing columns to bookings
ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS move_in_date DATE,
  ADD COLUMN IF NOT EXISTS size TEXT,
  ADD COLUMN IF NOT EXISTS dimensions TEXT,
  ADD COLUMN IF NOT EXISTS add_ons JSONB DEFAULT '{}'::jsonb;

-- Migrate data
UPDATE bookings SET move_in_date = start_date WHERE move_in_date IS NULL;

-- Insert default storage options
INSERT INTO storage_plans (size, size_value, price, premium_price, dimensions, features, use_case, is_popular, is_active)
VALUES
  ('500 SQ FT', 500, 'AED 4,500/month', 'AED 6,000/month', 'SME storage / light operations', '["24/7 secure access", "Flexible lease terms"]'::jsonb, 'Small to medium enterprises', false, true),
  ('1,000 SQ FT', 1000, 'AED 9,000/month', 'AED 12,000/month', 'Contractors / e-commerce', '["Perfect for contractors", "Premium climate available"]'::jsonb, 'Contractors & E-commerce', true, true),
  ('2,000 SQ FT', 2000, 'AED 18,000/month', 'AED 24,000/month', 'Distribution / staging', '["Distribution center operations", "Racking systems available"]'::jsonb, 'Distribution & Staging', false, true),
  ('3,000 SQ FT', 3000, 'AED 27,000/month', 'AED 36,000/month', 'Industrial storage', '["Heavy-duty industrial use", "High ceiling clearance"]'::jsonb, 'Industrial Operations', false, true),
  ('5,000 SQ FT', 5000, 'AED 45,000/month', 'AED 60,000/month', 'Corporate multi-tenant', '["Large corporate operations", "Custom build-out options"]'::jsonb, 'Corporate & Enterprise', false, true)
ON CONFLICT DO NOTHING;

-- Link bookings to storage plans
UPDATE bookings b SET plan_id = sp.id FROM storage_plans sp WHERE b.size = sp.size AND b.plan_id IS NULL;

-- Verify
SELECT b.id, u.name, sp.size, b.total_amount, b.status, p.status as payment_status
FROM bookings b
LEFT JOIN users u ON b.user_id = u.id
LEFT JOIN storage_plans sp ON b.plan_id = sp.id
LEFT JOIN payments p ON p.booking_id = b.id
ORDER BY b.created_at DESC;
```

### Step 3: Check Result
You should see your 3 bookings displayed at the bottom of the SQL Editor result!

### Step 4: Refresh Admin Panel
1. Go to `http://localhost:3000/admin/bookings`
2. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
3. **Your 3 bookings should now appear!** 🎉

---

## What This Does
- Adds missing columns to match what the admin panel expects
- Inserts 5 default storage options
- Links your existing bookings to the storage plans
- Shows you the result

---

## Still Not Working?

### Check 1: Environment Variables
Make sure `.env.local` has:
```
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Check 2: Restart Dev Server
```bash
npm run dev
```

### Check 3: Check Browser Console
- Open browser DevTools (F12)
- Go to Console tab
- Look for errors when loading bookings page
- Check Network tab for API calls to `/api/admin/bookings`

---

## Done!
After running the SQL script, your admin panel will show all bookings, users, and payments. The 5 storage options will also appear in Storage Options management page.

For detailed explanation, see: `DATABASE-FIX-GUIDE.md`
For complete admin guide, see: `ADMIN-PANEL-GUIDE.md`
