"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Shield, Car, Bolt, Clock, Package } from "lucide-react";

const CarStorage = () => {
  const storagePackages = [
    {
      title: "Basic Car Storage",
      description: "Safe and secure storage for your vehicle",
      image: "/assets/car1.webp",
      features: ["Covered Parking", "24/7 Surveillance", "Easy Access"],
      price: "1,200 AED/month",
      size: "1 Car Space",
      contract: "6 months - 7,200 AED",
      badge: "Popular"
    },
    {
      title: "Premium Car Storage",
      description: "Full-service storage with additional protection",
      image: "/assets/car1.webp",
      features: ["Covered Parking", "Climate Control", "Battery Maintenance", "24/7 Access"],
      price: "2,000 AED/month",
      size: "1 Car Space",
      contract: "6 months - 12,000 AED",
      badge: "Premium"
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "24/7 Monitored & Secure",
      description: "Constant surveillance and restricted access ensure your vehicle is protected at all times."
    },
    {
      icon: Car,
      title: "Tailored Environment",
      description: "Specialised storage conditions crafted for luxury and high‑performance vehicles."
    },
    {
      icon: Bolt,
      title: "Charging & Maintenance",
      description: "Dedicated power supply and battery maintenance keep your car ready to drive."
    },
    {
      icon: Clock,
      title: "Easy & Immediate Access",
      description: "Retrieve your vehicle anytime — the space is always available when you are."
    }
  ];

  const features = [
    "Covered, secure parking",
    "Climate-controlled environment",
    "Insurance-friendly facility",
    "Easy online booking",
    "Flexible contract terms",
    "24/7 access",
    "Professional handling",
    "Battery maintenance"
  ];

  return (
    <div className="min-h-screen bg-background animated-gradient">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold px-4 py-2 rounded-full bg-green/10 text-[#BFF747] border border-green/20">
              Car Storage
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
            Premium Vehicle Storage
            <span className="block text-gradient-primary mt-2">Secure & Convenient</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            We provide safe, climate-controlled, and fully monitored storage solutions for your vehicles, giving you peace of mind while your car is stored with us.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="btn-primary text-lg px-8">Book Storage Now</Button>
            <Button size="lg" variant="outline" className="btn-outline text-lg px-8">View All Options</Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Why Choose Our Car Storage</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your vehicle deserves the best care. Our storage solutions combine security, convenience, and maintenance for complete peace of mind.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
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

      {/* Storage Packages */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Comprehensive Solutions</h2>
          <p className="text-xl text-muted-foreground">Choose the package that fits your vehicle storage needs</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {storagePackages.map((pkg, idx) => (
            <Card key={idx} className="card overflow-hidden group hover:border-glow">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-[#BFF747] text-background text-sm font-semibold">{pkg.badge}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-foreground">{pkg.title}</h3>
                <p className="text-muted-foreground mb-4">{pkg.description}</p>

                <div className="space-y-3 mb-6">
                  {pkg.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-[#BFF747]" />
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

                <Button className="w-full mt-6 btn-primary">
                  Book This Package
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Key Features</h2>
          <p className="text-xl text-muted-foreground">Everything you need for worry-free vehicle storage</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3 p-4 rounded-lg bg-card/50 border border-border hover:border-green/50 transition-all">
              <Package className="w-5 h-5 text-[#BFF747] flex-shrink-0" />
              <span className="text-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="card p-12 border-glow">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Stress-Free Car Storage
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Focus on what matters while we take care of your vehicle — from storage to maintenance and security.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="btn-primary text-lg px-8">
                Get Started Today
              </Button>
              <Button size="lg" variant="outline" className="btn-outline text-lg px-8">
                Learn More
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default CarStorage;
