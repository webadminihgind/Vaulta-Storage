# 🚀 Quick Start Guide

## ⚡ Get Started in 3 Steps

### Step 1: Set Up Supabase Database (5 minutes)

1. Go to https://supabase.com/dashboard
2. Open your project: `gfldphpwsybxtrdimrft`
3. Click **SQL Editor** (left sidebar)
4. Click **New Query**
5. Copy everything from `supabase-schema.sql` file
6. Paste and click **Run** ▶️

**✅ Done!** Your database is ready.

### Step 2: Start Your App

```bash
npm run dev
```

Open http://localhost:3000

### Step 3: Test a Booking

1. **Select a storage size** on the homepage
2. **Fill in booking details:**
   - Name: Test User
   - Email: test@example.com
   - Phone: +971501234567
   - Move-in Date: (pick any future date)

3. **Checkout with Stripe test card:**
   - Card: `4242 4242 4242 4242`
   - Expiry: `12/25`
   - CVV: `123`

4. **See confirmation!** ✨

---

## 🔑 What Was Fixed?

| Issue | Status |
|-------|--------|
| Supabase connection errors | ✅ Fixed |
| Booking creation failing | ✅ Fixed |
| Checkout/Stripe errors | ✅ Fixed |
| Payment method mismatch | ✅ Fixed |
| Missing database tables | ✅ Schema created |

---

## 📁 Important Files

- **`supabase-schema.sql`** - Run this in Supabase SQL Editor
- **`SETUP-GUIDE.md`** - Detailed setup instructions
- **`FIXES-APPLIED.md`** - What was fixed and why
- **`.env.local`** - Already configured ✅

---

## 🎯 Stripe Test Cards

| Card | Result |
|------|--------|
| `4242 4242 4242 4242` | ✅ Success |
| `4000 0025 0000 3155` | 🔐 Requires auth |
| `4000 0000 0000 9995` | ❌ Declined |

---

## ❓ Troubleshooting

**"Failed to create booking"**
→ Did you run the SQL schema in Supabase? (Step 1)

**"Payment failed"**
→ Use test card `4242 4242 4242 4242`

**"No tables found"**
→ Run `supabase-schema.sql` in Supabase SQL Editor

---

## 📞 Your Contact Info (Already in App)

- Phone: +971 4 258 5754
- Email: info@vaultastorage.com
- WhatsApp: +971 4 258 5754

---

## ✨ You're All Set!

1. ✅ Supabase keys configured
2. ✅ Stripe test keys configured
3. ✅ Code bugs fixed
4. ⚠️ **Run SQL schema** (Step 1 above)

**That's it! Your booking system is ready to go.**

---

Need help? Check `SETUP-GUIDE.md` for detailed instructions.
