# Admin Panel - Complete Guide

## Overview
A comprehensive admin panel for managing your Vaulta Storage warehouse business. View bookings, users, payments, and dynamically manage storage options.

---

## Access the Admin Panel

### Login URL:
```
http://localhost:3000/admin/login
```

### Default Credentials:
- **Email:** admin@vaultastorage.com
- **Password:** admin123

**IMPORTANT:** Change these credentials in production!

---

## Features

### 1. Dashboard (`/admin`)
**Overview of your entire business**

Statistics displayed:
- Total Bookings
- Total Users
- Total Revenue (AED)
- Active Storage Units
- Pending Bookings
- Completed Payments

Quick Actions:
- View All Bookings
- Manage Users
- Manage Storage Options

System Status:
- Database connection
- Payment gateway status
- Email service status

---

### 2. Bookings Management (`/admin/bookings`)
**View and manage all warehouse bookings**

Features:
- ✅ View all bookings with complete details
- ✅ Search by customer name, email, or booking ID
- ✅ See booking status (pending, confirmed, active, cancelled)
- ✅ View payment status for each booking
- ✅ See storage unit details
- ✅ View move-in dates
- ✅ Customer contact information

Columns displayed:
- Booking ID
- Customer (name, email, phone)
- Storage Unit (size, dimensions)
- Move-in Date
- Amount (AED)
- Booking Status
- Payment Status
- Created Date

---

### 3. Users Management (`/admin/users`)
**View all registered customers**

Features:
- ✅ View all users in the system
- ✅ Search by name, email, or phone
- ✅ See user details (name, company, email, phone)
- ✅ View number of bookings per user
- ✅ See registration date

Columns displayed:
- User ID
- Name (+ Company name if available)
- Email
- Phone
- Number of Bookings
- Joined Date

---

### 4. Payment History (`/admin/payments`)
**Track all payment transactions**

Features:
- ✅ View all payment transactions
- ✅ Search by customer or transaction ID
- ✅ See payment status (completed, pending, failed)
- ✅ View payment method used
- ✅ Track total revenue
- ✅ Count completed/pending payments

Statistics shown:
- Total Revenue (sum of completed payments)
- Completed Payments count
- Pending Payments count

Columns displayed:
- Transaction ID
- Customer (name, email)
- Storage Unit
- Amount (AED)
- Payment Method
- Status
- Date

---

### 5. Storage Options Management (`/admin/storage-options`)
**Dynamically manage warehouse storage units**

This is the MOST IMPORTANT feature - allows you to:
- ✅ Add new storage options
- ✅ Edit existing storage options
- ✅ Delete storage options
- ✅ Mark options as popular
- ✅ Activate/deactivate options
- ✅ Set pricing (base + premium)

#### Adding a New Storage Option:

1. Click **"Add Storage Option"** button
2. Fill in the form:
   - **Size*** (e.g., "500 SQ FT") - Required
   - **Size Value*** (e.g., 500) - For sorting, Required
   - **Name** (e.g., "Small Business Storage") - Optional
   - **Base Price*** (e.g., "AED 4,500/month") - Required
   - **Premium Price** (e.g., "AED 6,000/month") - Optional
   - **Dimensions*** (e.g., "SME storage / light operations") - Required
   - **Use Case** (e.g., "Contractors & E-commerce") - Optional
   - **Features** (one per line):
     ```
     24/7 secure access
     Flexible lease terms
     Loading dock access
     Base rate: AED 9/sq ft
     ```
   - **Mark as Popular** - Checkbox
   - **Active** - Checkbox (enabled by default)

3. Click **"Create"**
4. New option appears on your website immediately!

#### Editing a Storage Option:

1. Click **"Edit"** button on any storage option card
2. Modal opens with pre-filled data
3. Make your changes
4. Click **"Update"**
5. Changes appear on website immediately!

#### Deleting a Storage Option:

1. Click **"Delete"** button on any storage option card
2. Confirm deletion
3. Option is removed from database and website

---

## Technical Architecture

### Admin Panel Pages:
```
/admin/login          - Admin authentication
/admin                - Dashboard
/admin/bookings       - Bookings list
/admin/users          - Users list
/admin/payments       - Payment history
/admin/storage-options - Storage management
```

### API Endpoints:

#### Admin Authentication:
```
POST /api/admin/auth
Body: { email, password }
Response: { success, message }
```

#### Bookings:
```
GET /api/admin/bookings
Response: { success, bookings[] }
```

#### Users:
```
GET /api/admin/users
Response: { success, users[] }
```

#### Payments:
```
GET /api/admin/payments
Response: { success, payments[] }
```

#### Storage Options:
```
GET /api/admin/storage-options
Response: { success, storageOptions[] }

POST /api/admin/storage-options
Body: { name, size, price, ... }
Response: { success, storageOption }

PUT /api/admin/storage-options
Body: { id, name, size, price, ... }
Response: { success, storageOption }

DELETE /api/admin/storage-options?id=xxx
Response: { success, message }
```

#### Public Storage Plans (for website):
```
GET /api/storage-plans
Response: { success, storagePlans[] }
```

---

## Database Schema

### `storage_plans` Table:
```sql
CREATE TABLE storage_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT,
  size TEXT NOT NULL,
  size_value INTEGER NOT NULL,  -- For sorting
  price TEXT NOT NULL,
  premium_price TEXT,
  dimensions TEXT NOT NULL,
  features JSONB,              -- Array of features
  use_case TEXT,
  is_popular BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Indexes:
```sql
CREATE INDEX idx_storage_plans_active ON storage_plans(is_active);
CREATE INDEX idx_storage_plans_size_value ON storage_plans(size_value);
```

---

## How Storage Options Work on Website

### Flow:
1. Admin adds/edits storage option in admin panel
2. Changes saved to `storage_plans` table in database
3. Website's StorageOptions component fetches from `/api/storage-plans`
4. Only **active** storage options are shown
5. Options are sorted by `size_value` (ascending)
6. Popular options show "MOST POPULAR" badge

### Update StorageOptions Component:

To make the website fetch storage options dynamically, update:

`src/components/StorageOptions.jsx`:
```jsx
"use client";

import React, { useEffect, useState } from "react";
import { StorageCard } from "./StorageCard";
import { Loader2 } from "lucide-react";

export const StorageOptions = () => {
  const [storageOptions, setStorageOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStorageOptions();
  }, []);

  const fetchStorageOptions = async () => {
    try {
      const response = await fetch("/api/storage-plans");
      const data = await response.json();

      if (data.success) {
        // Transform database format to StorageCard format
        const transformed = data.storagePlans.map(plan => ({
          size: plan.size,
          price: plan.price,
          pricePerSqFt: `AED ${Math.round(parseInt(plan.price.replace(/[^0-9]/g, '')) / plan.size_value)}/sq ft/mo`,
          premiumPrice: plan.premium_price,
          dimensions: plan.dimensions,
          features: plan.features || [],
          image: "/assets/vault1.webp",  // Set default or based on size
          isPopular: plan.is_popular,
          useCase: plan.use_case,
        }));

        setStorageOptions(transformed);
      }
    } catch (error) {
      console.error("Error fetching storage options:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Commercial Storage <span className="text-primary">Solutions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Flexible warehouse space for businesses of all sizes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {storageOptions.map((option, index) => (
            <div
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <StorageCard {...option} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
```

---

## Security

### Authentication:
- Simple localStorage-based authentication
- **Production TODO:** Implement proper JWT tokens
- **Production TODO:** Add session management
- **Production TODO:** Hash passwords with bcrypt

### Current Setup:
```typescript
// .env.local
ADMIN_EMAIL=admin@vaultastorage.com
ADMIN_PASSWORD=admin123  // CHANGE THIS!
```

### Protected Routes:
All admin pages check authentication:
```javascript
useEffect(() => {
  const isAuthenticated = localStorage.getItem("adminAuthenticated");
  if (!isAuthenticated) {
    router.push("/admin/login");
    return;
  }
}, []);
```

---

## Production Deployment

### Before Going Live:

1. **Change Admin Credentials:**
   - Update `.env.local`:
     ```
     ADMIN_EMAIL=your-admin@email.com
     ADMIN_PASSWORD=your-strong-password-here
     ```

2. **Implement Proper Authentication:**
   - Use NextAuth.js or similar
   - Hash passwords with bcrypt
   - Implement JWT tokens
   - Add session management

3. **Add Role-Based Access:**
   - Create admin users table
   - Add role column (admin, super_admin, viewer)
   - Implement permission checks

4. **Security Enhancements:**
   - Add CSRF protection
   - Implement rate limiting
   - Add IP whitelisting
   - Enable audit logs

5. **Database:**
   - Add indexes for performance
   - Enable Row Level Security (RLS)
   - Add backup strategy

---

## Common Tasks

### Add a New Storage Option:
1. Go to `/admin/storage-options`
2. Click "Add Storage Option"
3. Fill required fields (size, size_value, price, dimensions)
4. Add features (one per line)
5. Mark as popular if needed
6. Click "Create"
7. Verify it appears on website immediately

### Edit Pricing:
1. Go to `/admin/storage-options`
2. Find the storage option
3. Click "Edit"
4. Update price or premium_price
5. Click "Update"
6. Pricing updates on website immediately

### Deactivate a Storage Option:
1. Go to `/admin/storage-options`
2. Find the storage option
3. Click "Edit"
4. Uncheck "Active"
5. Click "Update"
6. Option disappears from website but stays in database

### View Booking Details:
1. Go to `/admin/bookings`
2. Use search to find specific booking
3. View all details in the table
4. Check payment status

### Track Revenue:
1. Go to `/admin/payments`
2. See "Total Revenue" at top
3. Filter by date if needed
4. Export data if required

---

## Troubleshooting

### Can't Login:
- Check `.env.local` has correct credentials
- Verify API route is working: `/api/admin/auth`
- Check browser console for errors

### Storage Options Not Showing:
- Verify storage option is marked as "Active"
- Check browser console for API errors
- Verify database connection
- Check `/api/storage-plans` returns data

### Changes Not Appearing on Website:
- Hard refresh browser (Ctrl+Shift+R)
- Check if storage option is "Active"
- Verify `/api/storage-plans` returns updated data
- Clear browser cache

---

## Files Created

### Admin Panel Files:
```
src/app/admin/
├── layout.jsx                    # Admin layout with sidebar
├── login/
│   └── page.jsx                  # Admin login page
├── page.jsx                      # Dashboard
├── bookings/
│   └── page.jsx                  # Bookings management
├── users/
│   └── page.jsx                  # Users management
├── payments/
│   └── page.jsx                  # Payment history
└── storage-options/
    └── page.jsx                  # Storage options management

src/app/api/admin/
├── auth/
│   └── route.ts                  # Authentication
├── bookings/
│   └── route.ts                  # Get bookings
├── users/
│   └── route.ts                  # Get users
├── payments/
│   └── route.ts                  # Get payments
└── storage-options/
    └── route.ts                  # CRUD for storage options

src/app/api/storage-plans/
└── route.ts                      # Public API for active storage plans
```

---

## Summary

✅ **Complete Admin Panel** - Dashboard, bookings, users, payments, storage options
✅ **Dynamic Storage Management** - Add/edit/delete storage options in real-time
✅ **Database-Driven** - All data from Supabase
✅ **Search & Filter** - Find bookings, users, payments easily
✅ **Real-Time Updates** - Changes appear on website immediately
✅ **Mobile Responsive** - Works on all devices
✅ **Professional UI** - Clean, modern design

Your admin panel is ready to use! 🎉

Login at: **http://localhost:3000/admin/login**
