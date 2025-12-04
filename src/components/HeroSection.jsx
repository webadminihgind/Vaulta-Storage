"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/animations/StaggerGroup";
import { HeroBackground } from "@/components/animations/HeroBackground";
import { fadeInUp, buttonHover, viewportOptionsEarly } from "@/lib/animations";

export const HeroSection = () => {
  const router = useRouter();
  const [navigating, setNavigating] = useState(null);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden ">
      {/* Animated Background */}
      <HeroBackground />

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <ScrollReveal animation={fadeInUp} viewport={viewportOptionsEarly}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              Commercial Warehouse{" "}
              <span className="bg-gradient-to-r from-primary via-gold-light to-primary bg-clip-text text-transparent animate-glow">
                Storage Solutions
              </span>{" "}
              for Growing Businesses
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2} viewport={viewportOptionsEarly}>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Flexible, scalable warehouse space from 500 to 5,000 sq ft. Perfect for SMEs, contractors, e-commerce, and industrial operations.
            </p>
          </ScrollReveal>

          {/* Buttons */}
          <ScrollReveal delay={0.4} viewport={viewportOptionsEarly}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <motion.div whileHover={buttonHover}>
                <Button
                  size="lg"
                  className=" bg-gradient-to-r from-primary to-accent text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:shadow-[0_0_50px_rgba(234,179,8,0.5)] transition-all"
                  onClick={() => {
                    setNavigating("contact");
                    router.push("/contact");
                  }}
                  disabled={navigating === "contact"}
                >
                  {navigating === "contact" ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Get Started Today"
                  )}
                </Button>
              </motion.div>

              <motion.div whileHover={buttonHover}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-foreground hover:bg-primary/10 text-lg px-8 py-6"
                  onClick={() => {
                    setNavigating("storage");
                    router.push("/storage/everyday");
                  }}
                  disabled={navigating === "storage"}
                >
                  {navigating === "storage" ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Explore Options"
                  )}
                </Button>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal delay={0.6} viewport={viewportOptionsEarly}>
            <StaggerGroup className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-16" staggerDelay={0.1}>
              <StaggerItem>
                <motion.div
                  className="space-y-2"
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                >
                  <div className="text-4xl font-bold text-primary">AED 9</div>
                  <div className="text-sm text-muted-foreground">Per Sq Ft Base Rate</div>
                </motion.div>
              </StaggerItem>
              <StaggerItem>
                <motion.div
                  className="space-y-2"
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                >
                  <div className="text-4xl font-bold text-primary">500-5K</div>
                  <div className="text-sm text-muted-foreground">Sq Ft Units Available</div>
                </motion.div>
              </StaggerItem>
              <StaggerItem>
                <motion.div
                  className="space-y-2"
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                >
                  <div className="text-4xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Secure Access</div>
                </motion.div>
              </StaggerItem>
              <StaggerItem>
                <motion.div
                  className="space-y-2"
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                >
                  <div className="text-4xl font-bold text-primary">Flexible</div>
                  <div className="text-sm text-muted-foreground">Lease Terms</div>
                </motion.div>
              </StaggerItem>
            </StaggerGroup>
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom Gradient Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20" />
    </section>
  );
};
