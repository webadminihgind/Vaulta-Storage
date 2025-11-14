"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Shield, Thermometer, Clock, Sofa } from "lucide-react";

const FurnitureStorage = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Secure & Protected",
      description: "24/7 surveillance and climate-controlled units to keep your furniture safe."
    },
    {
      icon: Thermometer,
      title: "Climate-Controlled Units",
      description: "Humidity and temperature control ensures your furniture stays in pristine condition."
    },
    {
      icon: Clock,
      title: "Flexible Access Hours",
      description: "Access your storage unit whenever you need, with flexible timing options."
    },
    {
      icon: Sofa,
      title: "Expert Handling",
      description: "Professional team to help you pack, move, and store your furniture safely."
    }
  ];

  const storagePackages = [
    {
      title: "Standard Unit",
      description: "Perfect for small furniture sets and household items",
      features: ["Climate Control", "24/7 Security", "Flexible Access"],
      size: "50 sq. ft.",
      price: "450 AED/month",
      contract: "6 months - 2,700 AED",
      badge: "Most Popular"
    },
    {
      title: "Premium Unit",
      description: "Spacious unit with full-service support",
      features: ["Climate Control", "24/7 Security", "Packing & Delivery Options"],
      size: "100 sq. ft.",
      price: "800 AED/month",
      contract: "6 months - 4,800 AED",
      badge: "Premium"
    }
  ];

  return (
    <div className="min-h-screen bg-background animated-gradient">
      {/* Hero Section */}
      <section
        className="py-24 px-4 sm:px-6 lg:px-8 text-center relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("/assets/furniture.webp")` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-3xl mx-auto text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Furniture Storage – Safe & Hassle-Free
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Keep your furniture safe during moves, renovations, or downsizing. Our climate-controlled units and professional service ensure your items are protected.
          </p>
          <Button size="lg" className="btn-primary text-lg px-8">
            Book Storage Now
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Why Choose Our Furniture Storage</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience hassle-free furniture storage with full protection and flexible access.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <Card key={idx} className="card p-6 text-center group hover:border-glow">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green/10 flex items-center justify-center group-hover:shadow-glow transition-all">
                  <Icon className="w-8 h-8 text-[#BFF747]" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Storage Packages Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Choose Your Storage Package</h2>
            <p className="text-xl text-muted-foreground">Select a package that suits your furniture and needs.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {storagePackages.map((pkg, idx) => (
              <Card key={idx} className="card overflow-hidden group hover:border-glow">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-foreground">{pkg.title}</h3>
                    <span className="px-3 py-1 rounded-full bg-[#BFF747] text-background text-sm font-semibold">
                      {pkg.badge}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">{pkg.description}</p>
                  <ul className="mb-4 space-y-2">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-foreground">
                        <Shield className="w-5 h-5 text-[#BFF747]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-border pt-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Unit Size:</span>
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <Card className="card p-12 border-glow">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Protect Your Furniture Today</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Flexible storage options, climate-controlled units, and professional service to keep your furniture safe.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="btn-primary text-lg px-8">
              Get Started Now
            </Button>
            <Button size="lg" variant="outline" className="btn-outline text-lg px-8">
              Learn More
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default FurnitureStorage;
