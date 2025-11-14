"use client";
import React from "react";
import { Shield, Thermometer, Clock, Sofa } from "lucide-react";

const SuitcaseStorage = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Secure & Monitored",
      description: "Your suitcases are protected with 24/7 CCTV monitoring and strict access control.",
    },
    {
      icon: Thermometer,
      title: "Climate-Controlled",
      description: "Temperature and humidity are optimized to preserve your belongings.",
    },
    {
      icon: Clock,
      title: "Flexible Access",
      description: "Access your stored items anytime with flexible schedules.",
    },
    {
      icon: Sofa,
      title: "Convenient & Comfortable",
      description: "Easy drop-off and pick-up with professional handling.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        className="py-24 px-6 md:px-20 text-center relative rounded-xl overflow-hidden"
        style={{
          backgroundImage: `url("/assets/suitcase.webp")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-3xl mx-auto text-foreground">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Suitcase Storage
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Safe, secure, and climate-controlled storage solutions for your
            suitcases. Perfect for short-term or long-term storage in Dubai.
          </p>
          <button className="btn-primary px-8 py-3 text-lg rounded-lg">
            Book Now
          </button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 md:px-20">
        <h2 className="text-4xl font-bold mb-12 text-center text-foreground">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={idx}
                className="card flex flex-col items-center text-center p-6 hover:border-glow transition-all"
              >
                <div className="w-16 h-16 mb-4 rounded-full bg-green/10 flex items-center justify-center group-hover:shadow-glow transition-all">
                  <Icon className="w-8 h-8 text-green" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6 md:px-20">
        <h2 className="text-3xl font-semibold mb-6 text-foreground">
          How It Works
        </h2>
        <p className="text-foreground mb-4">
          1. Choose your storage size and duration. <br />
          2. Drop off your suitcase at our facility or schedule a pickup. <br />
          3. Enjoy peace of mind knowing your belongings are safe and climate-controlled. <br />
          4. Retrieve your items anytime according to your schedule.
        </p>
        <p className="text-foreground">
          We provide hassle-free suitcase storage with transparent pricing and professional service. Ideal for travelers, residents, and businesses in Dubai.
        </p>
      </section>
    </div>
  );
};

export default SuitcaseStorage;
