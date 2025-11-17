"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Clock, Mail, Phone, MapPin, Calendar, Package, Download, ArrowLeft } from "lucide-react";

const BookingConfirmation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const bookingId = searchParams.get("booking_id");
  const paymentId = searchParams.get("payment_id");
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      if (!paymentId) {
        setError("No payment information found");
        setLoading(false);
        return;
      }

      try {
        // Fetch payment status
        const response = await fetch(`/api/checkout/verify-payment?paymentId=${paymentId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch payment status');
        }

        setPaymentData(data.payment);

        // If payment is still pending/processing, verify it
        if (data.payment.status === 'pending' || data.payment.status === 'processing') {
          const verifyResponse = await fetch('/api/checkout/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              paymentId: paymentId,
              sessionId: sessionId,
            }),
          });

          const verifyData = await verifyResponse.json();
          if (verifyData.success) {
            setPaymentData(verifyData.payment);
          }
        }

      } catch (err) {
        console.error('Error fetching payment:', err);
        setError(err.message || 'Failed to load payment information');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentStatus();
  }, [paymentId, sessionId]);

  const handleDownloadReceipt = () => {
    // In production, generate a PDF receipt
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background animated-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your booking details...</p>
        </div>
      </div>
    );
  }

  if (error || !paymentData) {
    return (
      <div className="min-h-screen bg-background animated-gradient flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8 bg-card rounded-lg border border-border">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Booking Not Found</h2>
          <p className="text-muted-foreground mb-6">
            {error || "We couldn't find your booking information."}
          </p>
          <Button onClick={() => router.push('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Return Home
          </Button>
        </div>
      </div>
    );
  }

  const isPaymentCompleted = paymentData.status === 'completed';
  const isPaymentPending = paymentData.status === 'pending' || paymentData.status === 'processing';

  return (
    <div className="min-h-screen bg-background animated-gradient">
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className={`w-20 h-20 rounded-full ${isPaymentCompleted ? 'bg-primary/10' : 'bg-amber-500/10'} flex items-center justify-center mx-auto mb-6 animate-bounce`}>
              {isPaymentCompleted ? (
                <CheckCircle2 className="w-10 h-10 text-primary" />
              ) : (
                <Clock className="w-10 h-10 text-amber-500" />
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {isPaymentCompleted ? 'Booking Confirmed!' : 'Booking Received'}
            </h1>
            <p className="text-xl text-muted-foreground">
              {isPaymentCompleted
                ? 'Your warehouse space has been successfully reserved.'
                : 'Your booking request is being processed.'}
            </p>
          </div>

          {/* Booking Details Card */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden mb-8">
            {/* Header */}
            <div className="bg-primary/10 border-b border-border p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Booking Details</h2>
                  <p className="text-sm text-muted-foreground">
                    Reference: <span className="font-mono font-semibold">#{bookingId?.slice(0, 8).toUpperCase()}</span>
                  </p>
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  isPaymentCompleted
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-amber-500 text-white'
                }`}>
                  {paymentData.booking?.status?.toUpperCase() || 'PENDING'}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              {/* Storage Unit */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">Storage Unit</h3>
                  <p className="text-muted-foreground">
                    {paymentData.booking?.storage_plans?.name || 'Warehouse Space'} - {paymentData.booking?.storage_plans?.size}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">
                    AED {paymentData.amount?.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">per month</p>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Move-in Date */}
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Move-in Date</p>
                      <p className="font-semibold">
                        {paymentData.booking?.start_date
                          ? new Date(paymentData.booking.start_date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })
                          : 'To be confirmed'}
                      </p>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Payment Method</p>
                      <p className="font-semibold capitalize">
                        {paymentData.payment_method?.replace('_', ' ') || 'Not specified'}
                      </p>
                    </div>
                  </div>

                  {/* Transaction ID */}
                  {paymentData.transaction_id && (
                    <div className="flex items-start gap-3 md:col-span-2">
                      <Package className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Transaction ID</p>
                        <p className="font-mono text-sm font-semibold">{paymentData.transaction_id}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-card rounded-2xl border border-border p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">What's Next?</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">1</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Confirmation Email</h3>
                  <p className="text-sm text-muted-foreground">
                    You'll receive a detailed booking confirmation via email within 24 hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">2</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Welcome Call</h3>
                  <p className="text-sm text-muted-foreground">
                    Our team will contact you to schedule a facility tour and answer any questions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">3</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Move-In Preparation</h3>
                  <p className="text-sm text-muted-foreground">
                    We'll prepare your unit and provide access details before your move-in date.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-primary/5 rounded-2xl border border-primary/20 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Need Assistance?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Call us</p>
                  <a href="tel:+97142585754" className="font-semibold hover:text-primary transition-colors">
                    +971 4 258 5754
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email us</p>
                  <a href="mailto:info@vaultastorage.com" className="font-semibold hover:text-primary transition-colors">
                    info@vaultastorage.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Visit us</p>
                  <p className="font-semibold text-sm">72 6B Street, Al Quoz<br />Dubai, UAE</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              size="lg"
              onClick={handleDownloadReceipt}
              className="gap-2"
            >
              <Download className="w-5 h-5" /> Download Receipt
            </Button>
            <Button
              size="lg"
              onClick={() => router.push('/')}
              className="gap-2 bg-gradient-to-r from-primary to-accent"
            >
              <ArrowLeft className="w-5 h-5" /> Return to Home
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingConfirmation;
