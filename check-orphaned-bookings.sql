-- Find bookings that are confirmed but have no completed payment
SELECT 
  b.id as booking_id,
  b.status as booking_status,
  b.total_amount,
  b.created_at as booking_created,
  p.id as payment_id,
  p.status as payment_status,
  p.amount as payment_amount
FROM bookings b
LEFT JOIN payments p ON p.booking_id = b.id
WHERE b.status = 'confirmed'
ORDER BY b.created_at DESC;
