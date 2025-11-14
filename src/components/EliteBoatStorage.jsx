"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Shield, Thermometer, Clock, Anchor } from "lucide-react";

const EliteBoatStorage = () => {
  const benefits = [
    {
      icon: Shield,
      title: "24/7 Monitored & Secure",
      description: "Our boat storage facility is under constant surveillance with restricted access to ensure your vessel’s safety."
    },
    {
      icon: Thermometer,
      title: "Climate‑Controlled Comfort",
      description: "Indoor yacht storage with humidity and temperature control to protect your vessel from corrosion and wear."
    },
    {
      icon: Clock,
      title: "Unrestricted Access & Launch‑Ready",
      description: "On‑demand vessel launch and retrieval, fueling and provisioning services for quick access whenever you need."
    },
    {
      icon: Anchor,
      title: "Premium Boat & Yacht Service",
      description: "From indoor storage to seasonal rotation, we support your vessel year‑round with concierge level care."
    }
  ];

  return (
    <div className="min-h-screen bg-background animated-gradient">
      {/* Hero Section */}
      <section
        className="py-24 px-4 sm:px-6 lg:px-8 text-center relative bg-cover bg-center"
        style={{
            backgroundImage: `url("/assets/boat.webp")`,
        }}

      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-3xl mx-auto text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Elite Boat & Yacht Storage – Freedom Preserved
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Our service is designed for discerning vessel owners who expect more than standard marina space.
            We offer secure indoor storage, climate‑controlled environments, and white‑glove concierge for your yacht or powerboat.
          </p>
          <Button size="lg" className="btn-primary text-lg px-8">
            Speak With a Specialist
          </Button>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Why Choose Us</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From indoor yacht storage to launch‑ready service, we provide premium level support for your vessel.
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

      {/* Service Highlights Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Comprehensive Protection & Service</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Secure, climate‑controlled indoor storage to shield your vessel from weather and UV exposure.</li>
            <li>Full concierge service including on‑demand launch, retrieval, fueling and maintenance readiness.</li>
            <li>Seasonal boat storage and rotation—safe during off‑season and ready when you need to hit the water.</li>
            <li>Professional environment suited for yacht managers, designers and high‑net‑worth owners seeking unsurpassed facility standards.</li>
          </ul>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <Card className="card p-12 border-glow">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Preserve Your Yacht with Confidence
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            From storage to access and maintenance readiness, we handle every detail so you can focus on your time on the water.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="btn-primary text-lg px-8">
              Request Storage Info
            </Button>
            <Button size="lg" variant="outline" className="btn-outline text-lg px-8">
              Explore Our Facility
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default EliteBoatStorage;
