"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export const HeroSection = () => {
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">



      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
            Commercial Warehouse{" "}
            <span className="bg-gradient-to-r from-primary via-gold-light to-primary bg-clip-text text-transparent animate-glow">
              Storage Solutions
            </span>{" "}
            for Growing Businesses
          </h1>

          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Flexible, scalable warehouse space from 500 to 5,000 sq ft. Perfect for SMEs, contractors, e-commerce, and industrial operations.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:shadow-[0_0_50px_rgba(234,179,8,0.5)] transition-all"
              onClick={() => router.push("/contact")}
            >
              Get Started Today
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-primary text-foreground hover:bg-primary/10 text-lg px-8 py-6"
              onClick={() => router.push("/storage/everyday")}
            >
              Explore Options
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-16">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">AED 9</div>
              <div className="text-sm text-muted-foreground">Per Sq Ft Base Rate</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">500-5K</div>
              <div className="text-sm text-muted-foreground">Sq Ft Units Available</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Secure Access</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">Flexible</div>
              <div className="text-sm text-muted-foreground">Lease Terms</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20" />
    </section>
  );
};
