-- Vaulta Storage - Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor to create the necessary tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Storage Plans table
CREATE TABLE IF NOT EXISTS storage_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  size TEXT NOT NULL,
  price_per_month DECIMAL(10, 2) NOT NULL,
  features JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES storage_plans(id) ON DELETE SET NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'active', 'cancelled', 'completed')),
  total_amount DECIMAL(10, 2) NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('credit_card', 'card', 'bank_transfer', 'cash')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_date TIMESTAMPTZ DEFAULT NOW(),
  transaction_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_payments_booking_id ON payments(booking_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_storage_plans_is_active ON storage_plans(is_active);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at columns
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_storage_plans_updated_at BEFORE UPDATE ON storage_plans
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE storage_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users: Users can read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (true);

-- Storage Plans: Everyone can read active plans
CREATE POLICY "Anyone can read active storage plans" ON storage_plans
  FOR SELECT USING (is_active = true);

-- Bookings: Users can read their own bookings
CREATE POLICY "Users can read own bookings" ON bookings
  FOR SELECT USING (true);

-- Payments: Users can read their own payments
CREATE POLICY "Users can read own payments" ON payments
  FOR SELECT USING (true);

-- Service role can do everything (bypasses RLS)
-- This is already handled by the service_role key in your API routes

-- Insert some default storage plans (optional)
INSERT INTO storage_plans (name, description, size, price_per_month, features, is_active)
VALUES
  ('Small Warehouse', 'Perfect for small businesses', '500 SQ FT', 2500, '["24/7 Access", "Security Monitoring", "Loading Dock Access", "Flexible Lease Terms"]', true),
  ('Medium Warehouse', 'Ideal for growing businesses', '1000 SQ FT', 4500, '["24/7 Access", "Security Monitoring", "Loading Dock Access", "Flexible Lease Terms", "Priority Support"]', true),
  ('Large Warehouse', 'For established operations', '2000 SQ FT', 8000, '["24/7 Access", "Security Monitoring", "Loading Dock Access", "Flexible Lease Terms", "Priority Support", "Dedicated Manager"]', true),
  ('Extra Large Warehouse', 'Maximum storage capacity', '5000 SQ FT', 18000, '["24/7 Access", "Security Monitoring", "Loading Dock Access", "Flexible Lease Terms", "Priority Support", "Dedicated Manager", "Custom Solutions"]', true)
ON CONFLICT DO NOTHING;

-- Grant necessary permissions
GRANT ALL ON users TO service_role;
GRANT ALL ON storage_plans TO service_role;
GRANT ALL ON bookings TO service_role;
GRANT ALL ON payments TO service_role;

-- Grant read access to authenticated users
GRANT SELECT ON storage_plans TO authenticated;
GRANT SELECT ON users TO authenticated;
GRANT SELECT ON bookings TO authenticated;
GRANT SELECT ON payments TO authenticated;
