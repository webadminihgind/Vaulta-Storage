"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { Calendar, MapPin, User, Mail, Phone, CreditCard } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Booking = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Retrieve order info from URL query if needed
  const size = searchParams.get("size") || "Not Selected";
  const price = searchParams.get("price") || "N/A";
  const dimensions = searchParams.get("dimensions") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    moveInDate: "",
    address: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProceedToCheckout = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.moveInDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Pass form + order info via query params to Checkout page
    const queryParams = new URLSearchParams({
      size,
      price,
      dimensions,
      ...formData,
    }).toString();

    router.push(`/checkout?${queryParams}`);
  };

  return (
    <div className="min-h-screen bg-background animated-gradient">
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            Book Your{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Storage
            </span>
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Booking Form */}
            <div className="bg-card p-8 rounded-lg border border-border">
              <h2 className="text-2xl font-bold mb-6">Your Details</h2>
              <form onSubmit={handleProceedToCheckout} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="w-4 h-4" /> Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+971 52 117 9039"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="moveInDate" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Move-in Date *
                  </Label>
                  <Input
                    id="moveInDate"
                    name="moveInDate"
                    type="date"
                    value={formData.moveInDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Pickup Address (Optional)
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Street, City, Area"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  size="lg"
                >
                  <CreditCard className="w-4 h-4 mr-2" /> Proceed to Checkout
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="bg-card p-8 rounded-lg border border-border h-fit">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4">
                <div className="border-b border-border pb-4">
                  <div className="text-sm text-muted-foreground">Storage Size</div>
                  <div className="text-xl font-bold">{size}</div>
                  <div className="text-sm text-muted-foreground">{dimensions}</div>
                </div>

                <div className="border-b border-border pb-4">
                  <div className="text-sm text-muted-foreground">Monthly Rate</div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {price}
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-primary"></div> 24/7 Access
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-accent"></div> Climate Controlled
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-cyan"></div> Security Monitored
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

export default Booking;
