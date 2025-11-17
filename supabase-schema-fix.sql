-- Vaulta Storage - Schema Fix and Migration
-- This fixes the mismatch between the schema and the booking API
-- Run this in Supabase SQL Editor

-- ============================================
-- PART 1: Update storage_plans table structure
-- ============================================

-- Add missing columns to storage_plans if they don't exist
ALTER TABLE storage_plans
  ADD COLUMN IF NOT EXISTS size_value INTEGER,
  ADD COLUMN IF NOT EXISTS price TEXT,
  ADD COLUMN IF NOT EXISTS premium_price TEXT,
  ADD COLUMN IF NOT EXISTS dimensions TEXT,
  ADD COLUMN IF NOT EXISTS use_case TEXT,
  ADD COLUMN IF NOT EXISTS is_popular BOOLEAN DEFAULT false;

-- Update existing columns to allow NULL where needed
ALTER TABLE storage_plans
  ALTER COLUMN name DROP NOT NULL,
  ALTER COLUMN price_per_month DROP NOT NULL;

-- Migrate data from price_per_month to price (text format)
UPDATE storage_plans
SET price = 'AED ' || price_per_month::TEXT || '/month'
WHERE price IS NULL AND price_per_month IS NOT NULL;

-- ============================================
-- PART 2: Update bookings table structure
-- ============================================

-- Add missing columns to bookings
ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS move_in_date DATE,
  ADD COLUMN IF NOT EXISTS size TEXT,
  ADD COLUMN IF NOT EXISTS dimensions TEXT,
  ADD COLUMN IF NOT EXISTS add_ons JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS company_name TEXT,
  ADD COLUMN IF NOT EXISTS address TEXT;

-- Add missing columns to users table
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS company_name TEXT,
  ADD COLUMN IF NOT EXISTS address TEXT;

-- Migrate start_date to move_in_date if needed
UPDATE bookings
SET move_in_date = start_date
WHERE move_in_date IS NULL AND start_date IS NOT NULL;

-- ============================================
-- PART 3: Insert default storage options
-- ============================================

-- Delete existing storage plans if you want to start fresh
-- TRUNCATE storage_plans CASCADE;

-- Insert default storage options
INSERT INTO storage_plans (
  size,
  size_value,
  price,
  premium_price,
  dimensions,
  features,
  use_case,
  is_popular,
  is_active
)
VALUES
  (
    '500 SQ FT',
    500,
    'AED 4,500/month',
    'AED 6,000/month',
    'SME storage / light operations',
    '["24/7 secure access", "Flexible lease terms", "Loading dock access", "Base rate: AED 9/sq ft"]'::jsonb,
    'Small to medium enterprises',
    false,
    true
  ),
  (
    '1,000 SQ FT',
    1000,
    'AED 9,000/month',
    'AED 12,000/month',
    'Contractors / e-commerce',
    '["Perfect for contractors & online businesses", "Premium climate available (+AED 3/sq ft)", "Inventory management space", "Easy truck access"]'::jsonb,
    'Contractors & E-commerce',
    true,
    true
  ),
  (
    '2,000 SQ FT',
    2000,
    'AED 18,000/month',
    'AED 24,000/month',
    'Distribution / staging',
    '["Distribution center operations", "Product staging & fulfillment", "Racking systems available", "Forklift accessible"]'::jsonb,
    'Distribution & Staging',
    false,
    true
  ),
  (
    '3,000 SQ FT',
    3000,
    'AED 27,000/month',
    'AED 36,000/month',
    'Industrial storage',
    '["Heavy-duty industrial use", "High ceiling clearance", "Multiple loading bays", "Equipment storage ready"]'::jsonb,
    'Industrial Operations',
    false,
    true
  ),
  (
    '5,000 SQ FT',
    5000,
    'AED 45,000/month',
    'AED 60,000/month',
    'Corporate multi-tenant',
    '["Large corporate operations", "Multi-tenant configurations", "Dedicated account manager", "Custom build-out options"]'::jsonb,
    'Corporate & Enterprise',
    false,
    true
  )
ON CONFLICT DO NOTHING;

-- ============================================
-- PART 4: Link existing bookings to storage plans
-- ============================================

-- Update bookings to link with storage_plans based on size
UPDATE bookings b
SET
  plan_id = sp.id,
  dimensions = sp.dimensions
FROM storage_plans sp
WHERE
  b.size = sp.size
  AND b.plan_id IS NULL;

-- ============================================
-- PART 5: Create/Update indexes
-- ============================================

CREATE INDEX IF NOT EXISTS idx_storage_plans_size_value ON storage_plans(size_value);
CREATE INDEX IF NOT EXISTS idx_bookings_move_in_date ON bookings(move_in_date);
CREATE INDEX IF NOT EXISTS idx_bookings_plan_id ON bookings(plan_id);

-- ============================================
-- PART 6: Update RLS policies
-- ============================================

-- Drop old policies if they exist
DROP POLICY IF EXISTS "Anyone can read active storage plans" ON storage_plans;
DROP POLICY IF EXISTS "Allow public read access to active storage plans" ON storage_plans;
DROP POLICY IF EXISTS "Allow admin full access to storage plans" ON storage_plans;

-- Create new policies
CREATE POLICY "Public can view active storage plans"
  ON storage_plans FOR SELECT
  USING (is_active = true);

CREATE POLICY "Service role has full access to storage plans"
  ON storage_plans FOR ALL
  USING (true);

-- ============================================
-- PART 7: Verify the migration
-- ============================================

-- Check storage plans
SELECT
  '=== STORAGE PLANS ===' as info,
  COUNT(*) as total_plans,
  COUNT(*) FILTER (WHERE is_active = true) as active_plans,
  COUNT(*) FILTER (WHERE is_popular = true) as popular_plans
FROM storage_plans;

-- Check bookings
SELECT
  '=== BOOKINGS ===' as info,
  COUNT(*) as total_bookings,
  COUNT(*) FILTER (WHERE plan_id IS NOT NULL) as linked_to_plans,
  COUNT(*) FILTER (WHERE status = 'pending') as pending,
  COUNT(*) FILTER (WHERE status = 'confirmed') as confirmed
FROM bookings;

-- Show recent bookings with all details
SELECT
  b.id as booking_id,
  b.created_at,
  b.move_in_date,
  u.name as customer_name,
  u.email,
  u.phone,
  b.size as booking_size,
  sp.size as plan_size,
  sp.price as plan_price,
  b.total_amount,
  b.status as booking_status,
  p.status as payment_status,
  p.amount as payment_amount
FROM bookings b
LEFT JOIN users u ON b.user_id = u.id
LEFT JOIN storage_plans sp ON b.plan_id = sp.id
LEFT JOIN payments p ON p.booking_id = b.id
ORDER BY b.created_at DESC
LIMIT 10;

-- Show summary
SELECT
  '=== SUMMARY ===' as section,
  (SELECT COUNT(*) FROM users) as total_users,
  (SELECT COUNT(*) FROM storage_plans WHERE is_active = true) as active_storage_plans,
  (SELECT COUNT(*) FROM bookings) as total_bookings,
  (SELECT COUNT(*) FROM payments WHERE status = 'completed') as completed_payments,
  (SELECT SUM(amount) FROM payments WHERE status = 'completed') as total_revenue;
