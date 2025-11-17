"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { CheckCircle, Mail, Calendar, MapPin, Download, Loader2 } from "lucide-react";

function ConfirmationContent() {
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

  return (
    <div className="min-h-screen bg-background animated-gradient">
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          <div className="bg-card p-8 md:p-12 rounded-lg border border-border text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent mb-6">
              <CheckCircle className="w-12 h-12 text-primary-foreground" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Booking{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Confirmed!
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8">
              Your storage unit has been successfully reserved
            </p>

            <div className="bg-muted/30 p-6 rounded-lg border border-border text-left space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-1" />
                <div>
                  <div className="font-semibold">Confirmation Email</div>
                  <div className="text-sm text-muted-foreground">
                    A confirmation email has been sent to {bookingData.email}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-accent mt-1" />
                <div>
                  <div className="font-semibold">Move-in Date</div>
                  <div className="text-sm text-muted-foreground">
                    {bookingData.moveInDate}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-cyan mt-1" />
                <div>
                  <div className="font-semibold">Location</div>
                  <div className="text-sm text-muted-foreground">
                    {bookingData.address || "72 6B Street, Al Quoz Industrial Area 3, Dubai"}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                size="lg"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Receipt
              </Button>

              <Button
                variant="outline"
                className="w-full"
                size="lg"
                onClick={() => router.push("/")}
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Confirmation() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background animated-gradient flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
