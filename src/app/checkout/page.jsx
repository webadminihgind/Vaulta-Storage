"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@/components/CheckoutForm";
import InvoiceDisplay from "@/components/InvoiceDisplay";
import { Loader2 } from "lucide-react";

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const searchParams = useSearchParams();

  // Retrieve booking data from query params
  const bookingId = searchParams.get("bookingId");
  const bookingData = {
    name: searchParams.get("name") || "",
    email: searchParams.get("email") || "",
    phone: searchParams.get("phone") || "",
    moveInDate: searchParams.get("moveInDate") || "",
    address: searchParams.get("address") || "",
    size: searchParams.get("size") || "Not Selected",
    price: searchParams.get("price") || "N/A",
    dimensions: searchParams.get("dimensions") || "",
    totalPrice: searchParams.get("totalPrice") || "0",
  };

  const [clientSecret, setClientSecret] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    if (!bookingId) {
      setError("No booking found. Please start from the booking page.");
      setLoading(false);
      return;
    }

    // Create PaymentIntent
    const createPaymentIntent = async () => {
      try {
        console.log('Creating payment intent for booking:', bookingId);
        console.log('Amount:', parseInt(bookingData.totalPrice));

        const response = await fetch('/api/checkout/create-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            bookingId: bookingId,
            amount: parseInt(bookingData.totalPrice),
            currency: 'AED',
            customer: {
              name: bookingData.name,
              email: bookingData.email,
              phone: bookingData.phone,
            },
            metadata: {
              size: bookingData.size,
              moveInDate: bookingData.moveInDate,
            },
          }),
        });

        const data = await response.json();
        console.log('Payment intent response:', data);

        if (!response.ok) {
          throw new Error(data.error || 'Failed to create payment intent');
        }

        if (!data.clientSecret) {
          throw new Error('No client secret returned from server');
        }

        setClientSecret(data.clientSecret);
        setPaymentId(data.paymentId);
        console.log('Client secret set successfully');
      } catch (err) {
        console.error('Error creating payment intent:', err);
        setError(err.message || "Failed to initialize payment. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, [bookingId]);

  const handlePaymentSuccess = (paymentData) => {
    setPaymentSuccess(true);
    setPaymentData(paymentData);
  };

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#7fb539',
        colorBackground: '#ffffff',
        colorText: '#1f2937',
        colorDanger: '#ef4444',
        fontFamily: 'system-ui, sans-serif',
        borderRadius: '8px',
        spacingUnit: '4px',
      },
      rules: {
        '.Input': {
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
        },
        '.Input:focus': {
          border: '1px solid #7fb539',
          boxShadow: '0 0 0 1px #7fb539',
        },
        '.Tab': {
          backgroundColor: '#f9fafb',
          border: '1px solid #e5e7eb',
        },
        '.Tab:hover': {
          backgroundColor: '#f3f4f6',
        },
        '.Tab--selected': {
          backgroundColor: '#ffffff',
          border: '1px solid #7fb539',
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="bg-background animated-gradient flex items-center justify-center py-24 min-h-[calc(100vh-4rem)]">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Setting up secure payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-background animated-gradient flex items-center justify-center py-24 min-h-[calc(100vh-4rem)]">
        <div className="max-w-md mx-auto text-center p-8 bg-card rounded-lg border border-destructive">
          <h2 className="text-2xl font-bold mb-2 text-destructive">Error</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <a href="/" className="text-primary hover:underline">
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  if (paymentSuccess && paymentData) {
    return (
      <InvoiceDisplay
        paymentData={paymentData}
        bookingData={bookingData}
        bookingId={bookingId}
      />
    );
  }

  return (
    <div className="bg-background animated-gradient py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            Secure{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Checkout
            </span>
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Payment Form */}
            <div className="bg-card p-8 rounded-lg border border-border">
              {!clientSecret ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">Loading payment form...</p>
                  </div>
                </div>
              ) : (
                <Elements stripe={stripePromise} options={options}>
                  <CheckoutForm
                    bookingData={bookingData}
                    paymentId={paymentId}
                    onSuccess={handlePaymentSuccess}
                  />
                </Elements>
              )}
            </div>

            {/* Booking Summary */}
            <div className="bg-card p-8 rounded-lg border border-border h-fit">
              <h2 className="text-2xl font-bold mb-6">Booking Summary</h2>
              <div className="space-y-4">
                <div className="border-b border-border pb-4">
                  <div className="text-sm text-muted-foreground">Customer</div>
                  <div className="font-semibold">{bookingData.name}</div>
                  <div className="text-sm text-muted-foreground">{bookingData.email}</div>
                  <div className="text-sm text-muted-foreground">{bookingData.phone}</div>
                </div>

                <div className="border-b border-border pb-4">
                  <div className="text-sm text-muted-foreground">Storage Unit</div>
                  <div className="text-xl font-bold">{bookingData.size}</div>
                  <div className="text-sm text-muted-foreground">{bookingData.dimensions}</div>
                </div>

                <div className="border-b border-border pb-4">
                  <div className="text-sm text-muted-foreground">Move-in Date</div>
                  <div className="font-semibold">{bookingData.moveInDate}</div>
                </div>

                <div className="pt-4">
                  <div className="border-t border-border pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Total Due</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        AED {parseInt(bookingData.totalPrice).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      * First month payment will be charged now
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
