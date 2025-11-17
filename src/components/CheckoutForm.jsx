"use client";

import { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/Button";
import { Lock, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const CheckoutForm = ({ bookingData, paymentId, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    try {
      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + "/checkout",
        },
        redirect: "if_required",
      });

      if (error) {
        throw new Error(error.message);
      }

      // If payment succeeded, confirm with our backend
      if (paymentIntent && paymentIntent.status === "succeeded") {
        const confirmResponse = await fetch('/api/checkout/confirm-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
            paymentId: paymentId,
          }),
        });

        const confirmData = await confirmResponse.json();

        if (!confirmResponse.ok) {
          throw new Error(confirmData.error || 'Failed to confirm payment');
        }

        toast({
          title: "Payment Successful!",
          description: "Your booking has been confirmed.",
        });

        // Call success callback with payment data
        onSuccess(confirmData.payment);
      } else {
        throw new Error("Payment was not successful");
      }
    } catch (err) {
      console.error('Payment error:', err);
      toast({
        title: "Payment Failed",
        description: err.message || "Failed to process payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Lock className="w-5 h-5 text-primary" />
        <h2 className="text-2xl font-bold">Payment Details</h2>
      </div>

      {/* Stripe Payment Element */}
      <div className="stripe-payment-element-container p-4 border border-border rounded-lg bg-white dark:bg-card">
        <PaymentElement
          id="payment-element"
          options={{
            layout: "tabs",
            defaultValues: {
              billingDetails: {
                name: bookingData.name,
                email: bookingData.email,
                phone: bookingData.phone,
              }
            }
          }}
        />
      </div>

      <div className="bg-muted/30 p-4 rounded-lg border border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Lock className="w-4 h-4" />
          Your payment information is encrypted and secure
        </div>
      </div>

      <Button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
        size="lg"
      >
        {processing ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            <CheckCircle className="w-4 h-4 mr-2" />
            Pay AED {parseInt(bookingData.totalPrice).toLocaleString()}
          </>
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        By completing this payment, you agree to our terms and conditions.
      </p>
    </form>
  );
};

export default CheckoutForm;
