# Booking & Checkout API Setup

## Overview

Complete booking and payment system with Supabase backend integration. The system handles:
- Customer information collection
- Booking creation with add-on services
- Multiple payment methods (Credit Card, Bank Transfer, Cash)
- Payment processing and verification
- Booking confirmation

---

## API Endpoints

### 1. **POST /api/booking/create**
Creates a new booking with customer information.

**Request Body:**
```json
{
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+971 50 123 4567",
    "companyName": "Acme LLC", // optional
    "address": "Dubai Marina" // optional
  },
  "booking": {
    "size": "500 SQ FT",
    "dimensions": "20m x 25m",
    "basePrice": 4500,
    "moveInDate": "2024-12-01",
    "addOns": {
      "forklift": { "selected": true, "hours": 2, "rate": 150 },
      "cctvRemote": { "selected": true, "rate": 50 },
      "climateControl": { "selected": false },
      "dedicatedDock": { "selected": true, "rate": 500 },
      "racking": { "selected": false }
    },
    "totalPrice": 5200
  }
}
```

**Response (201):**
```json
{
  "success": true,
  "booking": {
    "id": "uuid",
    "user_id": "uuid",
    "plan_id": "uuid",
    "start_date": "2024-12-01",
    "status": "pending",
    "total_amount": 5200,
    "storage_plans": { ... }
  },
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+971 50 123 4567"
  },
  "message": "Booking created successfully"
}
```

---

### 2. **POST /api/checkout/create-session**
Creates a checkout session for payment processing.

**Request Body:**
```json
{
  "bookingId": "uuid",
  "amount": 5200,
  "currency": "AED",
  "paymentMethod": "credit_card", // or "bank_transfer", "cash"
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+971 50 123 4567"
  },
  "metadata": {
    "size": "500 SQ FT",
    "moveInDate": "2024-12-01"
  }
}
```

**Response (200):**
```json
{
  "success": true,
  "sessionId": "session_xxx",
  "paymentId": "uuid",
  "bookingId": "uuid",
  "sessionUrl": "/booking/confirmation?booking_id=xxx&payment_id=xxx",
  "message": "Payment session created successfully"
}
```

**For Cash/Bank Transfer:**
```json
{
  "success": true,
  "paymentMethod": "cash",
  "paymentId": "uuid",
  "bookingId": "uuid",
  "requiresAction": true,
  "redirectUrl": "/booking/confirmation?booking_id=xxx&payment_id=xxx",
  "message": "Cash payment - pending confirmation. Our team will contact you shortly."
}
```

---

### 3. **POST /api/checkout/verify-payment**
Verifies payment status from payment gateway.

**Request Body:**
```json
{
  "paymentId": "uuid",
  "sessionId": "session_xxx", // optional
  "transactionId": "txn_xxx" // optional
}
```

**Response (200):**
```json
{
  "success": true,
  "verified": true,
  "status": "completed",
  "payment": {
    "id": "uuid",
    "amount": 5200,
    "status": "completed",
    "booking_id": "uuid"
  },
  "booking": {
    "id": "uuid",
    "status": "confirmed"
  },
  "message": "Payment verified successfully"
}
```

---

### 4. **GET /api/checkout/verify-payment?paymentId=xxx**
Retrieves payment status.

**Response (200):**
```json
{
  "success": true,
  "payment": {
    "id": "uuid",
    "amount": 5200,
    "status": "completed",
    "payment_method": "credit_card",
    "transaction_id": "txn_xxx",
    "booking": {
      "id": "uuid",
      "status": "confirmed",
      "start_date": "2024-12-01",
      "total_amount": 5200,
      "storage_plans": {
        "name": "Warehouse 500 SQ FT",
        "size": "500 SQ FT"
      }
    }
  }
}
```

---

## Database Schema

### Tables

#### **users**
```sql
- id: UUID (PK)
- email: VARCHAR(255) UNIQUE
- name: VARCHAR(255)
- phone: VARCHAR(50)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

#### **storage_plans**
```sql
- id: UUID (PK)
- name: VARCHAR(255)
- description: TEXT
- size: VARCHAR(100)
- price_per_month: DECIMAL(10, 2)
- features: TEXT[]
- is_active: BOOLEAN
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

#### **bookings**
```sql
- id: UUID (PK)
- user_id: UUID (FK → users.id)
- plan_id: UUID (FK → storage_plans.id)
- start_date: DATE
- end_date: DATE (nullable)
- status: VARCHAR(50) -- 'pending', 'confirmed', 'active', 'completed', 'cancelled'
- total_amount: DECIMAL(10, 2)
- notes: TEXT
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

#### **payments**
```sql
- id: UUID (PK)
- booking_id: UUID (FK → bookings.id)
- amount: DECIMAL(10, 2)
- status: VARCHAR(50) -- 'pending', 'processing', 'completed', 'failed', 'refunded'
- payment_method: VARCHAR(50) -- 'credit_card', 'bank_transfer', 'cash'
- transaction_id: VARCHAR(255)
- payment_date: TIMESTAMP
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

---

## User Flow

### 1. Booking Page (`/booking`)
1. User selects storage size (passed via URL params)
2. Fills in contact details:
   - Name, Email, Phone (required)
   - Company Name, Address (optional)
3. Selects move-in date
4. Chooses optional add-on services:
   - Forklift & Pallet Handling (hourly)
   - CCTV Remote View (monthly)
   - Climate-Controlled Zone (per sq ft)
   - Dedicated Dock Window (monthly)
   - Heavy-Duty Pallet Racking (per bay)
5. Reviews order summary with total price
6. Clicks "Proceed to Checkout"
7. **API Call:** `POST /api/booking/create`
8. Redirects to checkout with `bookingId`

### 2. Checkout Page (`/checkout`)
1. Shows booking summary from URL params
2. User selects payment method:
   - **Credit Card**: Shows card input form
   - **Bank Transfer**: Shows bank details
   - **Cash**: Shows payment at facility message
3. Fills payment details (if credit card)
4. Clicks "Complete Payment" or "Confirm Booking"
5. **API Call:** `POST /api/checkout/create-session`
6. Shows processing spinner
7. Redirects to confirmation page

### 3. Confirmation Page (`/booking/confirmation`)
1. **API Call:** `GET /api/checkout/verify-payment?paymentId=xxx`
2. If payment pending/processing:
   - **API Call:** `POST /api/checkout/verify-payment`
3. Shows booking details:
   - Reference number
   - Storage unit info
   - Move-in date
   - Payment method
   - Transaction ID
4. Shows "What's Next" steps
5. Shows contact information
6. Provides download receipt button

---

## Payment Gateway Integration

### Current Status: **Development Mode**
The API currently returns mock responses for testing. To integrate a real payment gateway:

### Option 1: Stripe (Most Popular)

**Install:**
```bash
npm install stripe
```

**In `/api/checkout/create-session/route.ts`:**
```typescript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [{
    price_data: {
      currency: 'aed',
      product_data: {
        name: `${booking.storage_plans.name}`,
        description: `Warehouse storage from ${booking.start_date}`,
      },
      unit_amount: Math.round(amount * 100),
    },
    quantity: 1,
  }],
  mode: 'payment',
  success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/booking/confirmation?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout?cancelled=true`,
  customer_email: customer.email,
  metadata: { bookingId, paymentId: payment.id },
});

return NextResponse.json({
  success: true,
  sessionId: session.id,
  sessionUrl: session.url,
  paymentId: payment.id,
});
```

**Environment Variables:**
```env
STRIPE_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
```

---

### Option 2: Telr (Middle East)

**Install:**
```bash
npm install axios
```

**In `/api/checkout/create-session/route.ts`:**
```typescript
const telrResponse = await fetch('https://secure.telr.com/gateway/order.json', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    method: 'create',
    store: process.env.TELR_STORE_ID,
    authkey: process.env.TELR_AUTH_KEY,
    order: {
      cartid: bookingId,
      amount: amount,
      currency: 'AED',
      description: `Warehouse ${booking.storage_plans.size}`,
    },
    return: {
      authorised: `${process.env.NEXT_PUBLIC_SITE_URL}/booking/confirmation`,
      declined: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout?declined=true`,
      cancelled: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout?cancelled=true`,
    },
    customer: {
      email: customer.email,
      name: { forenames: customer.name },
    },
  }),
});
```

**Environment Variables:**
```env
TELR_STORE_ID=xxxxx
TELR_AUTH_KEY=xxxxx
```

---

### Option 3: PayTabs (Middle East)

**Environment Variables:**
```env
PAYTABS_PROFILE_ID=xxxxx
PAYTABS_SERVER_KEY=xxxxx
```

---

## Environment Variables

Add these to your `.env.local`:

```env
# Supabase (Already configured)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Payment Gateway (Choose one)
# Stripe
STRIPE_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx

# OR Telr
TELR_STORE_ID=xxxxx
TELR_AUTH_KEY=xxxxx

# OR PayTabs
PAYTABS_PROFILE_ID=xxxxx
PAYTABS_SERVER_KEY=xxxxx
```

---

## Testing

### Test the Booking Flow

1. **Start dev server:**
```bash
npm run dev
```

2. **Navigate to booking page:**
```
http://localhost:3000/booking?size=500%20SQ%20FT&price=AED%204,500/month&dimensions=20m%20x%2025m
```

3. **Fill in the form:**
   - Name: Test User
   - Email: test@example.com
   - Phone: +971 50 123 4567
   - Move-in Date: [Select future date]
   - Select some add-ons

4. **Click "Proceed to Checkout"**
   - Check browser console for API call
   - Verify booking created in Supabase

5. **Select payment method:**
   - Credit Card: Fill mock card details
   - Bank Transfer: Review bank info
   - Cash: Review facility payment message

6. **Click "Complete Payment"**
   - Check browser console for API call
   - Verify payment created in Supabase

7. **View confirmation page:**
   - Verify booking details displayed
   - Check payment status

### Check Database

**In Supabase SQL Editor:**
```sql
-- View recent bookings
SELECT b.*, u.email, sp.name, sp.size
FROM bookings b
JOIN users u ON b.user_id = u.id
JOIN storage_plans sp ON b.plan_id = sp.id
ORDER BY b.created_at DESC
LIMIT 10;

-- View recent payments
SELECT p.*, b.total_amount
FROM payments p
JOIN bookings b ON p.booking_id = b.id
ORDER BY p.created_at DESC
LIMIT 10;
```

---

## Error Handling

All API endpoints return consistent error responses:

```json
{
  "error": "Error message",
  "details": "Detailed error information"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (missing/invalid data)
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

---

## Security Features

1. **Row Level Security (RLS)** on all Supabase tables
2. **Input validation** on all API endpoints
3. **CORS protection** (Next.js default)
4. **Payment data encryption** (when payment gateway integrated)
5. **User authentication checks** (Supabase Auth)
6. **Transaction ID tracking** for audit trails

---

## Next Steps

1. ✅ Database migration applied
2. ✅ API routes created
3. ✅ Booking page integrated
4. ✅ Checkout page integrated
5. ✅ Confirmation page created
6. ⏳ **Choose and integrate payment gateway** (Stripe/Telr/PayTabs)
7. ⏳ **Test with real payment gateway**
8. ⏳ **Set up email notifications** (booking confirmation, payment receipts)
9. ⏳ **Add webhook handlers** for payment gateway callbacks
10. ⏳ **Implement admin dashboard** to manage bookings

---

## Support

For questions or issues:
- Email: dev@vaultastorage.com
- Documentation: See inline comments in API route files
