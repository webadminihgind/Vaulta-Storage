
"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Check, Shield, Truck, Clock, Lock, Package } from "lucide-react";

const SelfStorage = () => {
  const storagePackages = [
    {
      title: "Lite Package",
      description: "Perfect for minimal storage needs",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      features: ["Packing & Pick-up", "Secure Storage", "24/7 Access"],
      price: "550 AED/month",
      size: "25 sq. ft.",
      contract: "6 months - 3,300 AED",
      badge: "Most Popular"
    },
    {
      title: "Ultimate Package",
      description: "Premium storage with full service",
      image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
      features: ["Packing, Pick-up & Delivery", "Climate Control", "Insurance Included"],
      price: "850 AED/month",
      size: "50 sq. ft.",
      contract: "6 months - 5,100 AED",
      badge: "Premium"
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Secure & Safe",
      description: "24/7 surveillance and climate-controlled facilities"
    },
    {
      icon: Truck,
      title: "Free Pick-up",
      description: "We collect your items at no extra charge"
    },
    {
      icon: Clock,
      title: "Flexible Terms",
      description: "No long-term commitment, scale as needed"
    },
    {
      icon: Lock,
      title: "Private Access",
      description: "Your items, your space, complete privacy"
    }
  ];

  const features = [
    "Climate-controlled units",
    "24/7 security monitoring",
    "Insurance options available",
    "Easy online booking",
    "Flexible contract terms",
    "Professional packing service",
    "Free delivery on long-term contracts",
    "Month-to-month options"
  ];

  return (
    <div className="min-h-screen bg-background animated-gradient">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold px-4 py-2 rounded-full bg-green/10 text-[#BFF747] border border-green/20">
                Storage Solutions
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
              Storage Made Simple for
              <span className="block text-gradient-primary mt-2">Everyday Life</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Whether you're decluttering, moving, or just need extra room, we offer secure and 
              flexible storage solutions. No deposit required, fully transparent terms.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="btn-primary text-lg px-8">
                Book Storage Now
              </Button>
              <Button size="lg" variant="outline" className="btn-outline text-lg px-8">
                View All Options
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">About Our Service</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience storage made simple: no deposit required, fully transparent terms, 
              and the flexibility to scale as you need. Rest easy knowing your items are secure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      </section>

      {/* Storage Packages */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Comprehensive Solutions</h2>
            <p className="text-xl text-muted-foreground">Choose the package that fits your needs</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {storagePackages.map((pkg, index) => (
              <Card key={index} className="card overflow-hidden group hover:border-glow">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-[#BFF747] text-background text-sm font-semibold">
                      {pkg.badge}
                    </span>
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

                  <Button className="w-full mt-6 btn-primary">
                    Book This Package
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Why Choose Us</h2>
            <p className="text-xl text-muted-foreground">Everything you need for stress-free storage</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 p-4 rounded-lg bg-card/50 border border-border hover:border-green/50 transition-all"
              >
                <Package className="w-5 h-5 text-[#BFF747] flex-shrink-0" />
                <span className="text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="card p-12 border-glow">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Say Goodbye to Moving Stress
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              We handle everything - from packing to storage to delivery. Focus on what matters while we take care of the rest.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="btn-primary text-lg px-8">
                Get Started Today
              </Button>
              <Button size="lg" variant="outline" className="btn-outline text-lg px-8">
                Contact Us
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default SelfStorage;
