"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Shield, Thermometer, Eye, User, MapPin } from "lucide-react";

const ArtStorage = () => {
  const features = [
    {
      icon: Shield,
      title: "Uncompromising Security",
      description:
        "Round-the-clock surveillance and highly-trained onsite security specialists, AI-enabled CCTV.",
    },
    {
      icon: Thermometer,
      title: "Climate Control",
      description:
        "Optimal conditions maintained with precision temperature and humidity control, designed specifically for fine art preservation.",
    },
    {
      icon: Eye,
      title: "Complete Confidentiality",
      description:
        "Unmarked, discreet facility ensuring your collection and identity remain strictly private.",
    },
    {
      icon: User,
      title: "Private Viewing Suites",
      description:
        "Elegant, secure viewing rooms available exclusively to you for private inspections or viewings.",
    },
    {
      icon: User,
      title: "Personalized Concierge Service",
      description:
        "Dedicated relationship manager offering bespoke logistics, white-glove handling, and tailored client support.",
    },
    {
      icon: MapPin,
      title: "Strategic Dubai Location",
      description:
        "Positioned at the crossroads between Europe, Asia, and the Middle East.",
    },
  ];

  return (
    <div className="min-h-screen bg-background animated-gradient">
      {/* Hero Section */}
      <section className="py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
          Dubai’s Premier Private Art Vault
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gradient-primary mb-6">
          Secure. Discreet. Bespoke.
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          At Vachi, we cater exclusively to a select circle of private art collectors. Combining world-class security, museum-grade preservation, and discreet, personalized concierge services, we ensure your valuable collections are safeguarded with meticulous care, confidentiality, and convenience.
        </p>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Why Choose Vachi</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our premium services ensure your artwork is protected, private, and expertly managed.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="card p-6 text-center group hover:border-glow">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green/10 flex items-center justify-center group-hover:shadow-glow transition-all">
                  <Icon className="w-8 h-8 text-[#BFF747]" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Art Guardians Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Meet Your Art Guardians</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Our leadership team includes industry experts who have cared for multimillion-dollar collections for high-net-worth individuals and families. Trust that your valuable pieces are in expert, discreet hands. Begin your private consultation with our dedicated concierge team.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="btn-primary text-lg px-8">
              Contact Concierge
            </Button>
            <Button size="lg" variant="outline" className="btn-outline text-lg px-8">
              Request Consultation
            </Button>
          </div>
        </div>
      </section>


    </div>
  );
};

export default ArtStorage;
