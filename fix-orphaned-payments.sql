-- Fix Orphaned Payments
-- Run this in Supabase SQL Editor to fix confirmed bookings with pending payments

-- Step 1: View the problem
-- Find confirmed bookings with pending payments
SELECT
  b.id as booking_id,
  b.status as booking_status,
  b.created_at as booking_created,
  p.id as payment_id,
  p.status as payment_status,
  p.transaction_id,
  p.amount
FROM bookings b
JOIN payments p ON p.booking_id = b.id
WHERE b.status = 'confirmed'
  AND p.status = 'pending'
ORDER BY b.created_at DESC;

-- Step 2: Fix them
-- Update pending payments to completed for confirmed bookings
UPDATE payments
SET
  status = 'completed',
  updated_at = NOW()
WHERE id IN (
  SELECT p.id
  FROM payments p
  JOIN bookings b ON b.id = p.booking_id
  WHERE b.status = 'confirmed'
    AND p.status = 'pending'
);

-- Step 3: Verify the fix
-- Should return 0 rows after running Step 2
SELECT
  b.id as booking_id,
  b.status as booking_status,
  p.id as payment_id,
  p.status as payment_status
FROM bookings b
JOIN payments p ON p.booking_id = b.id
WHERE b.status = 'confirmed'
  AND p.status = 'pending';

-- Optional: View all bookings with their payment status
SELECT
  b.id as booking_id,
  b.status as booking_status,
  b.total_amount,
  b.created_at as booking_created,
  p.id as payment_id,
  p.status as payment_status,
  p.amount as payment_amount,
  p.transaction_id
FROM bookings b
LEFT JOIN payments p ON p.booking_id = b.id
ORDER BY b.created_at DESC
LIMIT 20;
