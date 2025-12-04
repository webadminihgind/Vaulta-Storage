"use client";

import React from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/animations/StaggerGroup";
import { fadeInUp } from "@/lib/animations";
import { Button } from "@/components/ui/Button";

export const BookingSteps = () => {
  const steps = [
    {
      number: "1",
      title: "Select the unit size that fits your needs",
    },
    {
      number: "2",
      title: "Choose The Box facility and unit that works for you",
    },
    {
      number: "3",
      title: "Secure your booking and pay online in a few easy steps",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation={fadeInUp}>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Booking your space is as <span className="text-primary">easy as</span>
            </h2>
          </div>
        </ScrollReveal>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12" staggerDelay={0.15}>
          {steps.map((step, index) => (
            <StaggerItem key={index}>
              <div className="relative bg-card border-2 border-border hover:border-primary/50 rounded-2xl p-8 min-h-[180px] transition-all duration-300 hover:shadow-[var(--shadow-green)] hover:scale-105">
                {/* Number Badge */}
                <div className="absolute -top-4 -left-4 w-14 h-14 bg-gradient-to-r from-primary to-accent flex items-center justify-center rounded-xl shadow-lg">
                  <span className="text-3xl text-primary-foreground">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="pt-6">
                  <h3 className="text-xl  leading-tight">
                    {step.title}
                  </h3>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* CTA Button */}
        <ScrollReveal delay={0.5}>
          <div className="text-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:bg-primary/90 text-lg px-10 py-6 shadow-[0_0_30px_rgba(191,247,71,0.3)] hover:shadow-[0_0_50px_rgba(191,247,71,0.5)] transition-all"
              onClick={() => (window.location.href = "/storage/everyday")}
            >
              Let&apos;s get started
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};