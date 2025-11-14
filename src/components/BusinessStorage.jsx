"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Check, Shield, Truck, Clock, Lock, Package } from "lucide-react";

const BusinessStorage = () => {
  const storagePackages = [
    {
      title: "Startup Package",
      description: "Ideal for small businesses and startups",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      features: ["Secure storage", "Flexible access", "Insurance options"],
      price: "750 AED/month",
      size: "50 sq. ft.",
      contract: "6 months - 4,500 AED",
      badge: "Popular"
    },
    {
      title: "Enterprise Package",
      description: "Full-service storage for large businesses",
      image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
      features: ["Climate control", "24/7 monitoring", "Pickup & delivery"],
      price: "1,250 AED/month",
      size: "100 sq. ft.",
      contract: "6 months - 7,500 AED",
      badge: "Premium"
    }
  ];

  const benefits = [
    { icon: Shield, title: "Secure & Safe", description: "24/7 surveillance and climate-controlled storage" },
    { icon: Truck, title: "Pickup & Delivery", description: "We handle your items professionally" },
    { icon: Clock, title: "Flexible Terms", description: "Scale storage as your business grows" },
    { icon: Lock, title: "Private Access", description: "Dedicated units for your business" }
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Business Storage Solutions</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tailored storage for your business needs with full security and flexible contracts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {storagePackages.map((pkg, index) => (
            <Card key={index} className="card overflow-hidden group hover:border-glow">
              <div className="relative h-64 overflow-hidden">
                <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-[#BFF747] text-background text-sm font-semibold">{pkg.badge}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-foreground">{pkg.title}</h3>
                <p className="text-muted-foreground mb-4">{pkg.description}</p>
                <div className="space-y-3 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-[#BFF747]" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Storage Size:</span>
                    <span className="text-foreground font-semibold">{pkg.size}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Monthly:</span>
                    <span className="text-[#BFF747] font-bold text-xl">{pkg.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Contract:</span>
                    <span className="text-foreground font-semibold">{pkg.contract}</span>
                  </div>
                </div>
                <Button className="w-full mt-6 btn-primary">Book This Package</Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="card p-6 text-center group hover:border-glow">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green/10 flex items-center justify-center group-hover:shadow-glow transition-all">
                  <Icon className="w-8 h-8 text-[#BFF747]" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BusinessStorage;
