# 🧪 Testing Your New Integrated Payment Flow

## Quick Test (5 Minutes)

### 1. Start the Development Server
```bash
npm run dev
```

### 2. Test the Complete Flow

#### Step 1: Create a Booking
1. Go to http://localhost:3000
2. Click on any storage size (e.g., "Book Now" on 500 SQ FT)
3. Fill in the booking form:
   - **Name:** Test User
   - **Email:** test@example.com
   - **Phone:** +971501234567
   - **Move-in Date:** (select any future date)
   - **Company Name:** (optional)
   - **Address:** (optional)
4. (Optional) Select add-on services
5. Click **"Proceed to Checkout"**

#### Step 2: Make Payment
1. You should see the checkout page with:
   - Payment form on the left
   - Booking summary on the right
2. In the payment form, enter:
   - **Card Number:** `4242 4242 4242 4242`
   - **Expiry:** `12/25` (any future date)
   - **CVC:** `123` (any 3 digits)
   - **Name:** `Test User`
   - **Country:** Select any country
3. Click **"Pay AED X,XXX"**
4. Wait for processing (3-5 seconds)

#### Step 3: View Invoice
1. You should see a professional invoice with:
   - ✅ Success checkmark
   - Your booking details
   - Payment information
   - Transaction ID
   - Next steps
2. Try clicking:
   - **"Download Invoice"** - Should trigger print dialog
   - **"Return to Home"** - Should go back to homepage

---

## What to Check

### ✅ Checkout Page Loaded Correctly
- [ ] Payment form displays
- [ ] Card input fields are visible
- [ ] Booking summary shows correct data
- [ ] Total amount is correct
- [ ] Loading spinner appears briefly on page load

### ✅ Payment Processing Works
- [ ] Card validation works in real-time
- [ ] Error messages show for invalid cards
- [ ] Processing button shows "Processing Payment..."
- [ ] No redirect to external page
- [ ] Payment completes successfully

### ✅ Invoice Displays Correctly
- [ ] Invoice appears on same page (no redirect)
- [ ] All booking details are correct
- [ ] Payment status shows "Completed"
- [ ] Transaction ID is displayed
- [ ] Contact information is visible
- [ ] Buttons work (Download, Return Home)

---

## Test Different Scenarios

### 1. Test Successful Payment
**Card:** `4242 4242 4242 4242`
**Expected:** Payment succeeds, invoice shows

### 2. Test 3D Secure Authentication
**Card:** `4000 0025 0000 3155`
**Expected:** 3D Secure popup appears, then payment succeeds

### 3. Test Declined Card
**Card:** `4000 0000 0000 9995`
**Expected:** Error message shows, payment fails gracefully

### 4. Test Insufficient Funds
**Card:** `4000 0000 0000 9995`
**Expected:** Error message: "Your card has insufficient funds"

### 5. Test Invalid Card
**Card:** `4242 4242 4242 4241` (wrong last digit)
**Expected:** Stripe shows validation error

---

## Verify in Stripe Dashboard

### Check Payment in Stripe
1. Go to https://dashboard.stripe.com/test/payments
2. You should see your test payment
3. Click on it to see details:
   - Amount: AED X,XXX
   - Status: Succeeded
   - Customer Email: test@example.com
   - Metadata: bookingId, customerName, etc.

### Check Payment Intent
1. Go to https://dashboard.stripe.com/test/payment-intents
2. Find your payment intent
3. Verify:
   - Status: Succeeded
   - Amount: Correct
   - Metadata: Contains booking information

---

## Verify in Supabase

### Check Database Records

1. Go to https://supabase.com/dashboard
2. Open your project
3. Go to **Table Editor**

#### Check Users Table
- [ ] New user created with email: test@example.com
- [ ] User ID is a valid UUID

#### Check Bookings Table
- [ ] New booking created
- [ ] Status: "confirmed"
- [ ] User ID matches the user created
- [ ] Total amount is correct
- [ ] Start date matches move-in date

#### Check Payments Table
- [ ] New payment created
- [ ] Status: "completed"
- [ ] Booking ID matches the booking
- [ ] Amount is correct
- [ ] Transaction ID starts with `pi_` (PaymentIntent ID)
- [ ] Payment method: "card"

---

## Common Issues & Solutions

### Issue: "Payment form not loading"
**Solution:**
- Check browser console for errors
- Verify `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` in `.env.local`
- Restart dev server

### Issue: "Payment fails immediately"
**Solution:**
- Check terminal for API errors
- Verify `STRIPE_SECRET_KEY` in `.env.local`
- Check Stripe dashboard for error logs

### Issue: "Invoice not showing after payment"
**Solution:**
- Check browser console for errors
- Verify `/api/checkout/confirm-payment` is working
- Check payment status in Stripe dashboard

### Issue: "Booking not in database"
**Solution:**
- Check Supabase tables exist (run `supabase-schema.sql`)
- Verify `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`
- Check terminal for Supabase errors

---

## Mobile Testing

### Test on Mobile Devices
1. Find your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Open on mobile: `http://YOUR_IP:3000`
3. Test the complete flow:
   - [ ] Payment form is responsive
   - [ ] Card input works on mobile keyboard
   - [ ] Invoice is readable on small screen
   - [ ] Buttons are tap-friendly

---

## Performance Checks

### Page Load Speed
- [ ] Checkout page loads in < 3 seconds
- [ ] Payment form appears quickly
- [ ] No layout shifts while loading

### Payment Processing
- [ ] Payment processes in < 5 seconds
- [ ] Loading states are clear
- [ ] No flickering or glitches

### Invoice Display
- [ ] Invoice appears immediately after payment
- [ ] All data loads correctly
- [ ] Print dialog works

---

## Security Checks

### Card Data Security
- [ ] Card details never sent to your server
- [ ] All payment handled by Stripe
- [ ] HTTPS in production (check when deployed)

### Error Handling
- [ ] Invalid cards show proper errors
- [ ] Network errors are caught
- [ ] User-friendly error messages

---

## Browser Compatibility

Test in different browsers:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

---

## Final Checklist

### Before Going Live
- [ ] All tests pass with test cards
- [ ] Database records update correctly
- [ ] Invoice displays properly
- [ ] Mobile experience is smooth
- [ ] Error handling works
- [ ] Performance is acceptable

### Production Setup
- [ ] Switch to live Stripe keys
- [ ] Test with real card (small amount)
- [ ] Verify email notifications (if added)
- [ ] Set up Stripe webhooks (optional)
- [ ] Monitor first few real transactions

---

## Test Data Summary

### Test Cards
| Purpose | Card Number | Expiry | CVV |
|---------|-------------|--------|-----|
| Success | 4242 4242 4242 4242 | 12/25 | 123 |
| 3D Secure | 4000 0025 0000 3155 | 12/25 | 123 |
| Declined | 4000 0000 0000 9995 | 12/25 | 123 |

### Test Customer Data
```
Name: Test User
Email: test@example.com
Phone: +971501234567
Move-in Date: (any future date)
```

---

## Need Help?

If tests fail:
1. ✅ Check browser console (F12)
2. ✅ Check terminal output
3. ✅ Verify environment variables
4. ✅ Check Stripe dashboard
5. ✅ Check Supabase tables

All systems should be working correctly! 🚀
