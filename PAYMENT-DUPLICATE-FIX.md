# Payment Duplicate Issue - Fixed

## The Problem

You were experiencing **duplicate payment records** in the admin panel. Here's what was happening:

### Symptoms:
1. ✅ Booking status shows "confirmed"
2. ❌ Multiple payment records for the same booking
3. ❌ Only one payment shows "completed", others remain "pending"
4. 💵 User gets receipt/invoice successfully

### Root Cause:

The `/api/checkout/create-session` route was creating a **NEW payment record every time it was called**, which happened whenever:
- User loaded the checkout page
- User refreshed the checkout page
- React re-rendered the checkout component
- User navigated back and forth

**Example scenario:**
```
1. User books → Booking created (status: pending)
2. User goes to checkout → Payment #1 created (status: pending)
3. User refreshes page → Payment #2 created (status: pending) ❌
4. User completes payment → Only Payment #2 updated to "completed"
5. Result: Payment #1 still shows "pending" in admin panel
```

## The Fix

### Changes Made to [api/checkout/create-session/route.ts](vaultastorage/src/app/api/checkout/create-session/route.ts)

#### 1. **Check for Existing Pending Payment** (Lines 40-46)

```typescript
// Check if a pending payment already exists for this booking
const { data: existingPayment } = await supabase
  .from("payments")
  .select("*")
  .eq("booking_id", bookingId)
  .eq("status", "pending")
  .maybeSingle();
```

#### 2. **Reuse Existing Payment** (Lines 51-88)

If a pending payment exists:
- Retrieve the existing Stripe PaymentIntent
- If the PaymentIntent is still usable (not succeeded/canceled), reuse it
- If not usable, create a new PaymentIntent but link it to the same payment record
- **No duplicate payment records created!**

```typescript
if (existingPayment && existingPayment.transaction_id) {
  console.log("Reusing existing payment:", existingPayment.id);
  payment = existingPayment;

  try {
    paymentIntent = await stripe.paymentIntents.retrieve(existingPayment.transaction_id);

    if (paymentIntent.status === "succeeded" || paymentIntent.status === "canceled") {
      // Create new PaymentIntent for same payment record
      throw new Error("Existing PaymentIntent is not reusable");
    }

    console.log("Reusing existing PaymentIntent:", paymentIntent.id);
  } catch (error) {
    // Create new PaymentIntent, update same payment record
    paymentIntent = await stripe.paymentIntents.create({ ... });
    await supabase.from("payments").update({ transaction_id: paymentIntent.id }).eq("id", payment.id);
  }
}
```

#### 3. **Create New Payment Only When Needed** (Lines 89-134)

If no pending payment exists, create one:
```typescript
else {
  console.log("Creating new payment for booking:", bookingId);
  const { data: newPayment, error: paymentError } = await supabase
    .from("payments")
    .insert({ ... })
    .select("*")
    .single();

  payment = newPayment;
  paymentIntent = await stripe.paymentIntents.create({ ... });
}
```

### Additional Improvements

#### 1. Added `dynamic = 'force-dynamic'` to all checkout routes:
- `/api/checkout/create-session`
- `/api/checkout/confirm-payment`
- `/api/checkout/verify-payment`

This prevents static generation and ensures fresh data on every request.

#### 2. Improved TypeScript error handling:
```typescript
} catch (error: unknown) {
  // Proper error handling
}
```

#### 3. Added detailed logging:
```typescript
console.log("Reusing existing payment:", existingPayment.id);
console.log("Creating new payment for booking:", bookingId);
```

## Benefits

### ✅ No More Duplicates
- Only ONE payment record per booking (unless intentionally retrying after failure)
- Cleaner admin panel
- Accurate payment tracking

### ✅ Better User Experience
- Page refreshes don't create new payment intents
- Existing payment intent is reused
- Seamless payment flow

### ✅ Better Data Integrity
- One-to-one relationship between booking and payment (mostly)
- Easier to track payment status
- Simpler admin dashboard logic

### ✅ Cost Savings
- Fewer unnecessary Stripe PaymentIntent creations
- Reduced database writes

## How It Works Now

### New Flow:

```
1. User creates booking → Booking created (status: pending)
2. User goes to checkout → Check for existing pending payment
   ├─ Found? → Reuse it with same PaymentIntent
   └─ Not found? → Create new payment + PaymentIntent
3. User refreshes → Check for existing pending payment
   └─ Found! → Reuse same payment + PaymentIntent ✅
4. User completes payment → Update SAME payment to "completed"
5. Result: Only ONE payment record with correct status ✅
```

## Testing

### Before Fix:
1. Create a booking
2. Go to checkout page
3. Refresh 3 times
4. Check admin payments panel
   - **Result**: 4 payment records (1 completed, 3 pending) ❌

### After Fix:
1. Create a booking
2. Go to checkout page
3. Refresh 3 times
4. Check admin payments panel
   - **Result**: 1 payment record (pending, then completed) ✅

## Cleanup Existing Duplicates (Optional)

If you want to clean up existing duplicate payments in your database, you can run this SQL in Supabase SQL Editor:

```sql
-- Find duplicate pending payments for same booking
SELECT booking_id, COUNT(*) as count
FROM payments
WHERE status = 'pending'
GROUP BY booking_id
HAVING COUNT(*) > 1;

-- Delete older duplicate pending payments (keep the newest one)
WITH ranked_payments AS (
  SELECT
    id,
    booking_id,
    created_at,
    ROW_NUMBER() OVER (PARTITION BY booking_id ORDER BY created_at DESC) as rn
  FROM payments
  WHERE status = 'pending'
)
DELETE FROM payments
WHERE id IN (
  SELECT id FROM ranked_payments WHERE rn > 1
);
```

⚠️ **Warning**: Always backup your database before running DELETE queries!

## What About "confirmed" Booking with "pending" Payment?

This was happening because:
- [confirm-payment/route.ts:42-44](vaultastorage/src/app/api/checkout/confirm-payment/route.ts#L42-L44) updates booking to "confirmed"
- [confirm-payment/route.ts:36-39](vaultastorage/src/app/api/checkout/confirm-payment/route.ts#L36-L39) updates **only the specific payment** to "completed"
- **Duplicate payments remained "pending"**

Now with the fix, there will only be ONE payment per booking, so this mismatch won't occur.

## Future Enhancements (Optional)

1. **Add unique constraint** to prevent duplicates at database level:
   ```sql
   -- Only allow one pending payment per booking
   CREATE UNIQUE INDEX unique_pending_payment_per_booking
   ON payments (booking_id)
   WHERE status = 'pending';
   ```

2. **Add payment cleanup job** to automatically cancel old pending payments after 24 hours

3. **Show payment status** on booking confirmation page to match admin panel

## Summary

This was **not a bug** per se, but a **design issue** where the create-session API was too eager to create new payment records. The fix implements **idempotency** - calling the same API multiple times with the same booking ID will reuse the existing payment record instead of creating duplicates.

The fix is **backward compatible** and **production-safe**. Existing completed payments are unaffected.
