"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Checkout = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Retrieve booking data from query params
  const bookingData = {
    name: searchParams.get("name") || "",
    email: searchParams.get("email") || "",
    phone: searchParams.get("phone") || "",
    moveInDate: searchParams.get("moveInDate") || "",
    address: searchParams.get("address") || "",
    size: searchParams.get("size") || "Not Selected",
    price: searchParams.get("price") || "N/A",
    dimensions: searchParams.get("dimensions") || "",
  };

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const handleInputChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handlePayment = (e) => {
    e.preventDefault();

    // Simple validation
    if (
      !paymentData.cardNumber ||
      !paymentData.cardName ||
      !paymentData.expiryDate ||
      !paymentData.cvv
    ) {
      toast({
        title: "Missing Payment Info",
        description: "Please fill all payment fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate payment processing
    toast({
      title: "Payment Successful!",
      description: "Your storage unit has been booked successfully.",
    });

    setTimeout(() => {
      // Redirect to confirmation page
      const queryParams = new URLSearchParams(bookingData).toString();
      router.push(`/confirmation?${queryParams}`);
    }, 1500);
  };

  const totalDue =
    bookingData.price && bookingData.price !== "N/A"
      ? `AED ${parseInt(bookingData.price.match(/\d+/)[0]) + 100}`
      : "N/A";

  return (
    <div className="min-h-screen bg-background animated-gradient">

      <main className="container mx-auto px-4 py-24">
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
              <div className="flex items-center gap-2 mb-6">
                <Lock className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-bold">Payment Details</h2>
              </div>

              <form onSubmit={handlePayment} className="space-y-6">
                <div>
                  <Label htmlFor="cardNumber" className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Card Number *
                  </Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="cardName">Cardholder Name *</Label>
                  <Input
                    id="cardName"
                    name="cardName"
                    value={paymentData.cardName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date *</Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      value={paymentData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV *</Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      type="password"
                      value={paymentData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      maxLength={4}
                      required
                    />
                  </div>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg border border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="w-4 h-4" />
                    Your payment information is encrypted and secure
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  size="lg"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Complete Payment
                </Button>
              </form>
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
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Monthly Rate</span>
                    <span className="font-semibold">{bookingData.price}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Setup Fee</span>
                    <span className="font-semibold">AED 100</span>
                  </div>
                  <div className="border-t border-border pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Total Due Today</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {totalDue}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default Checkout;
