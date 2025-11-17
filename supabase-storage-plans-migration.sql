-- Migration: Add storage_plans table and columns
-- Run this in Supabase SQL Editor

-- 1. Create storage_plans table if it doesn't exist
CREATE TABLE IF NOT EXISTS storage_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT,
  size TEXT NOT NULL,
  size_value INTEGER NOT NULL,
  price TEXT NOT NULL,
  premium_price TEXT,
  dimensions TEXT NOT NULL,
  features JSONB DEFAULT '[]'::jsonb,
  use_case TEXT,
  is_popular BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_storage_plans_active ON storage_plans(is_active);
CREATE INDEX IF NOT EXISTS idx_storage_plans_size_value ON storage_plans(size_value);

-- 3. Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_storage_plans_updated_at BEFORE UPDATE
    ON storage_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 4. Insert default storage options (from your current website)
INSERT INTO storage_plans (size, size_value, price, premium_price, dimensions, features, use_case, is_popular, is_active)
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

-- 5. If your bookings reference storage plans, update the foreign key
-- First check if plan_id column exists in bookings
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'bookings' AND column_name = 'plan_id'
    ) THEN
        -- Add plan_id column if it doesn't exist
        ALTER TABLE bookings ADD COLUMN plan_id UUID REFERENCES storage_plans(id);

        -- Update existing bookings to reference storage plans
        -- This assumes you have a size field in bookings that matches storage_plans.size
        UPDATE bookings b
        SET plan_id = sp.id
        FROM storage_plans sp
        WHERE b.size = sp.size
        AND b.plan_id IS NULL;
    END IF;
END $$;

-- 6. Grant permissions (if using RLS)
ALTER TABLE storage_plans ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active storage plans
CREATE POLICY "Allow public read access to active storage plans"
  ON storage_plans FOR SELECT
  USING (is_active = true);

-- Allow authenticated admin users to do everything
CREATE POLICY "Allow admin full access to storage plans"
  ON storage_plans FOR ALL
  USING (true);

-- 7. Verify the data
SELECT
  id,
  size,
  price,
  is_active,
  is_popular,
  created_at
FROM storage_plans
ORDER BY size_value;

-- 8. Check bookings with storage plans
SELECT
  b.id as booking_id,
  b.created_at,
  u.name as customer_name,
  u.email,
  sp.size as storage_size,
  sp.price,
  b.status,
  b.total_amount
FROM bookings b
LEFT JOIN users u ON b.user_id = u.id
LEFT JOIN storage_plans sp ON b.plan_id = sp.id
ORDER BY b.created_at DESC
LIMIT 10;
