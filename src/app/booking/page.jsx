"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/Checkbox";
import { Calendar, MapPin, User, Mail, Phone, CreditCard, Plus, Package } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Booking = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Retrieve order info from URL query
  const size = searchParams.get("size") || "Not Selected";
  const price = searchParams.get("price") || "AED 0/month";
  const dimensions = searchParams.get("dimensions") || "";

  // Extract base price number (e.g., "AED 4,500/month" -> 4500)
  const basePrice = parseInt(price.replace(/[^0-9]/g, "")) || 0;
  
  // Extract sq ft from size (e.g., "500 SQ FT" -> 500)
  const sqFt = parseInt(size.replace(/[^0-9]/g, "")) || 0;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    moveInDate: "",
    address: "",
    companyName: "",
  });

  // Add-on services state
  const [addOns, setAddOns] = useState({
    forklift: { selected: false, hours: 0, rate: 150 },
    cctvRemote: { selected: false, rate: 50 },
    climateControl: { selected: false, rate: 3 }, // per sq ft
    dedicatedDock: { selected: false, rate: 500 },
    racking: { selected: false, bays: 0, rate: 100 },
  });

  const [totalPrice, setTotalPrice] = useState(basePrice);

  // Calculate total price whenever add-ons change
  useEffect(() => {
    let addOnTotal = 0;

    // Forklift (hourly, one-time or recurring)
    if (addOns.forklift.selected && addOns.forklift.hours > 0) {
      addOnTotal += addOns.forklift.hours * addOns.forklift.rate;
    }

    // CCTV Remote View (monthly)
    if (addOns.cctvRemote.selected) {
      addOnTotal += addOns.cctvRemote.rate;
    }

    // Climate Control (per sq ft monthly)
    if (addOns.climateControl.selected && sqFt > 0) {
      addOnTotal += sqFt * addOns.climateControl.rate;
    }

    // Dedicated Dock (monthly)
    if (addOns.dedicatedDock.selected) {
      addOnTotal += addOns.dedicatedDock.rate;
    }

    // Racking Rental (per bay monthly)
    if (addOns.racking.selected && addOns.racking.bays > 0) {
      addOnTotal += addOns.racking.bays * addOns.racking.rate;
    }

    setTotalPrice(basePrice + addOnTotal);
  }, [addOns, basePrice, sqFt]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOnToggle = (service) => {
    setAddOns({
      ...addOns,
      [service]: { ...addOns[service], selected: !addOns[service].selected },
    });
  };

  const handleAddOnQuantity = (service, field, value) => {
    const numValue = Math.max(0, parseInt(value) || 0);
    setAddOns({
      ...addOns,
      [service]: { ...addOns[service], [field]: numValue },
    });
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

    // Pass form + order info + add-ons via query params to Checkout page
    const queryParams = new URLSearchParams({
      size,
      price,
      dimensions,
      totalPrice: totalPrice.toString(),
      addOns: JSON.stringify(addOns),
      ...formData,
    }).toString();

    router.push(`/checkout?${queryParams}`);
  };

  return (
    <div className="min-h-screen bg-background animated-gradient">
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            Book Your{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Warehouse Space
            </span>
          </h1>

          <form onSubmit={handleProceedToCheckout}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Contact Details */}
              <div className="lg:col-span-2 space-y-8">
                {/* Contact Information */}
                <div className="bg-card p-8 rounded-lg border border-border">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <User className="w-6 h-6 text-primary" />
                    Contact Details
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
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
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="Your Company LLC"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@company.com"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
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
                      <Label htmlFor="moveInDate">Move-in Date *</Label>
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
                      <Label htmlFor="address">Business Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Street, City, Area"
                      />
                    </div>
                  </div>
                </div>

                {/* Value-Added Services */}
                <div className="bg-card p-8 rounded-lg border border-border">
                  <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <Package className="w-6 h-6 text-primary" />
                    Value-Added Services
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Enhance your storage with optional add-on services
                  </p>

                  <div className="space-y-6">
                    {/* Forklift Service */}
                    <div className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="forklift"
                          checked={addOns.forklift.selected}
                          onCheckedChange={() => handleAddOnToggle("forklift")}
                        />
                        <div className="flex-1">
                          <Label htmlFor="forklift" className="text-base font-semibold cursor-pointer">
                            Forklift & Pallet Handling
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            On-demand loading/unloading services
                          </p>
                          <div className="flex items-center gap-3 mt-3">
                            <span className="text-sm font-bold text-primary">AED 150/hour</span>
                            {addOns.forklift.selected && (
                              <div className="flex items-center gap-2">
                                <Label htmlFor="forklift-hours" className="text-sm">Hours needed:</Label>
                                <Input
                                  id="forklift-hours"
                                  type="number"
                                  min="0"
                                  value={addOns.forklift.hours}
                                  onChange={(e) => handleAddOnQuantity("forklift", "hours", e.target.value)}
                                  className="w-20"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CCTV Remote View */}
                    <div className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="cctv"
                          checked={addOns.cctvRemote.selected}
                          onCheckedChange={() => handleAddOnToggle("cctvRemote")}
                        />
                        <div className="flex-1">
                          <Label htmlFor="cctv" className="text-base font-semibold cursor-pointer">
                            CCTV Remote View Access
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            View your storage unit remotely via mobile app
                          </p>
                          <div className="mt-2">
                            <span className="text-sm font-bold text-primary">AED 50/month</span>
                            <span className="text-xs text-muted-foreground ml-2">(Included free with premium climate)</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Climate Control */}
                    <div className="p-4 rounded-lg border border-primary/30 bg-primary/5 hover:border-primary/50 transition-colors">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="climate"
                          checked={addOns.climateControl.selected}
                          onCheckedChange={() => handleAddOnToggle("climateControl")}
                        />
                        <div className="flex-1">
                          <Label htmlFor="climate" className="text-base font-semibold cursor-pointer">
                            Climate-Controlled Zone
                            <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                              PREMIUM
                            </span>
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            Temperature control (20–24°C) with humidity monitoring
                          </p>
                          <div className="mt-2">
                            <span className="text-sm font-bold text-primary">+AED 3/sq ft/month</span>
                            {sqFt > 0 && addOns.climateControl.selected && (
                              <span className="text-sm text-muted-foreground ml-2">
                                (AED {(sqFt * 3).toLocaleString()} for {sqFt} sq ft)
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Dedicated Dock Window */}
                    <div className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="dock"
                          checked={addOns.dedicatedDock.selected}
                          onCheckedChange={() => handleAddOnToggle("dedicatedDock")}
                        />
                        <div className="flex-1">
                          <Label htmlFor="dock" className="text-base font-semibold cursor-pointer">
                            Dedicated Dock Window
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            Priority receiving/dispatch time slot for your operations
                          </p>
                          <div className="mt-2">
                            <span className="text-sm font-bold text-primary">AED 500/month</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Racking Rental */}
                    <div className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="racking"
                          checked={addOns.racking.selected}
                          onCheckedChange={() => handleAddOnToggle("racking")}
                        />
                        <div className="flex-1">
                          <Label htmlFor="racking" className="text-base font-semibold cursor-pointer">
                            Heavy-Duty Pallet Racking
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            Industrial pallet racking systems for optimal space utilization
                          </p>
                          <div className="flex items-center gap-3 mt-3">
                            <span className="text-sm font-bold text-primary">AED 100/bay/month</span>
                            {addOns.racking.selected && (
                              <div className="flex items-center gap-2">
                                <Label htmlFor="racking-bays" className="text-sm">Number of bays:</Label>
                                <Input
                                  id="racking-bays"
                                  type="number"
                                  min="0"
                                  value={addOns.racking.bays}
                                  onChange={(e) => handleAddOnQuantity("racking", "bays", e.target.value)}
                                  className="w-20"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card p-8 rounded-lg border-2 border-primary/30 sticky top-24">
                  <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                  
                  {/* Storage Unit */}
                  <div className="space-y-4 mb-6">
                    <div className="pb-4 border-b border-border">
                      <div className="text-sm text-muted-foreground mb-1">Storage Unit</div>
                      <div className="text-lg font-bold">{size}</div>
                      <div className="text-xs text-muted-foreground">{dimensions}</div>
                      <div className="text-right mt-2">
                        <span className="text-lg font-bold text-foreground">
                          AED {basePrice.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Add-ons Summary */}
                    {(addOns.forklift.selected || addOns.cctvRemote.selected || addOns.climateControl.selected || addOns.dedicatedDock.selected || addOns.racking.selected) && (
                      <div className="space-y-3 pb-4 border-b border-border">
                        <div className="text-sm font-semibold text-primary">Add-on Services:</div>
                        
                        {addOns.forklift.selected && addOns.forklift.hours > 0 && (
                          <div className="flex justify-between text-sm">
                            <span>Forklift ({addOns.forklift.hours}h)</span>
                            <span className="font-semibold">AED {(addOns.forklift.hours * 150).toLocaleString()}</span>
                          </div>
                        )}

                        {addOns.cctvRemote.selected && (
                          <div className="flex justify-between text-sm">
                            <span>CCTV Remote View</span>
                            <span className="font-semibold">AED 50</span>
                          </div>
                        )}

                        {addOns.climateControl.selected && sqFt > 0 && (
                          <div className="flex justify-between text-sm">
                            <span>Climate Control</span>
                            <span className="font-semibold">AED {(sqFt * 3).toLocaleString()}</span>
                          </div>
                        )}

                        {addOns.dedicatedDock.selected && (
                          <div className="flex justify-between text-sm">
                            <span>Dedicated Dock</span>
                            <span className="font-semibold">AED 500</span>
                          </div>
                        )}

                        {addOns.racking.selected && addOns.racking.bays > 0 && (
                          <div className="flex justify-between text-sm">
                            <span>Racking ({addOns.racking.bays} bays)</span>
                            <span className="font-semibold">AED {(addOns.racking.bays * 100).toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Total */}
                    <div className="pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">Total Monthly:</span>
                        <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                          AED {totalPrice.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        * Prices in AED per month. Taxes may apply.
                      </p>
                    </div>
                  </div>

                  {/* Included Features */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-border">
                    <div className="text-sm font-semibold mb-3">Included Features:</div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-primary"></div> 24/7 Secure Access
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-primary"></div> Loading Dock Access
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-primary"></div> Security Monitoring
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-primary"></div> Flexible Lease Terms
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg py-6"
                    size="lg"
                  >
                    <CreditCard className="w-5 h-5 mr-2" /> Proceed to Checkout
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Booking;
