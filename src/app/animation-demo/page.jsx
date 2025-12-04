"use client";

/**
 * Animation Demo Page
 *
 * A visual showcase of all available scroll animations
 * Visit /animation-demo to see all animations in action
 */

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/animations/StaggerGroup";
import { FadeIn } from "@/components/animations/FadeIn";
import {
  fadeInUp,
  fadeInUpSubtle,
  fadeInScale,
  fadeInScaleSubtle,
  fadeInLeft,
  fadeInRight,
  cardHover,
  buttonHover,
} from "@/lib/animations";
import { Card } from "@/components/ui/Card";

export default function AnimationDemoPage() {
  const demoCards = [
    { title: "Card 1", description: "Staggered animation" },
    { title: "Card 2", description: "0.15s delay" },
    { title: "Card 3", description: "With hover effect" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-32 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <ScrollReveal animation={fadeInUp}>
            <h1 className="text-6xl font-bold text-center mb-6">
              Premium Scroll Animations
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-2xl text-center text-muted-foreground mb-8">
              Luxury motion design for your React website
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="flex justify-center gap-4">
              <motion.button
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold"
                whileHover={buttonHover}
              >
                Primary Button
              </motion.button>
              <motion.button
                className="px-8 py-3 border-2 border-primary text-foreground rounded-lg font-semibold"
                whileHover={buttonHover}
              >
                Secondary Button
              </motion.button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Fade In Up Demo */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal animation={fadeInUp}>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4">Fade In Up</h2>
              <p className="text-xl text-muted-foreground">
                Standard upward fade with 60px motion
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal animation={fadeInUp}>
            <Card className="p-8 max-w-2xl mx-auto">
              <p className="text-lg">
                This card uses the <code>fadeInUp</code> animation preset.
                It fades in while moving 60px upward with premium easing.
              </p>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* Staggered Cards Demo */}
      <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <ScrollReveal animation={fadeInUp}>
            <h2 className="text-5xl font-bold text-center mb-16">
              Staggered Grid
            </h2>
          </ScrollReveal>

          <StaggerGroup className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {demoCards.map((card, index) => (
              <StaggerItem key={index}>
                <motion.div whileHover={cardHover}>
                  <Card className="p-8 border-2 border-border hover:border-primary/50 transition-colors">
                    <div className="text-4xl font-bold text-primary mb-4">
                      {index + 1}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
                    <p className="text-muted-foreground">{card.description}</p>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Scale Animations Demo */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal animation={fadeInUp}>
            <h2 className="text-5xl font-bold text-center mb-16">
              Fade In with Scale
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <ScrollReveal animation={fadeInScale}>
              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-4">fadeInScale</h3>
                <p className="text-muted-foreground">
                  Scales from 0.95 to 1.0 while fading in. Perfect for featured
                  content and hero cards.
                </p>
              </Card>
            </ScrollReveal>

            <ScrollReveal animation={fadeInScaleSubtle}>
              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-4">fadeInScaleSubtle</h3>
                <p className="text-muted-foreground">
                  Scales from 0.97 to 1.0 for a more subtle effect. Great for
                  regular cards and list items.
                </p>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Directional Animations */}
      <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <ScrollReveal animation={fadeInUp}>
            <h2 className="text-5xl font-bold text-center mb-16">
              Directional Fades
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto mb-12">
            <ScrollReveal animation={fadeInLeft}>
              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-4">Fade In Left</h3>
                <p className="text-muted-foreground">
                  Slides in from the left (-40px). Perfect for alternating
                  content layouts.
                </p>
              </Card>
            </ScrollReveal>

            <ScrollReveal animation={fadeInRight}>
              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-4">Fade In Right</h3>
                <p className="text-muted-foreground">
                  Slides in from the right (+40px). Creates visual interest in
                  two-column layouts.
                </p>
              </Card>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <ScrollReveal animation={fadeInRight}>
              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-4">Reversed Direction</h3>
                <p className="text-muted-foreground">
                  You can alternate directions for each row to create a
                  zig-zag pattern.
                </p>
              </Card>
            </ScrollReveal>

            <ScrollReveal animation={fadeInLeft}>
              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-4">Keeps User Engaged</h3>
                <p className="text-muted-foreground">
                  Alternating animations prevent monotony and guide the eye
                  down the page.
                </p>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Hover Effects Demo */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal animation={fadeInUp}>
            <h2 className="text-5xl font-bold text-center mb-4">
              Hover Interactions
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-16">
              Try hovering over these elements
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ScrollReveal>
              <motion.div whileHover={cardHover}>
                <Card className="p-8 border-2 border-border cursor-pointer">
                  <h3 className="text-2xl font-bold mb-4">Card Hover</h3>
                  <p className="text-muted-foreground">
                    Lifts up 8px and scales to 1.02. Subtle but noticeable.
                  </p>
                </Card>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="flex flex-col gap-4 items-start">
                <motion.button
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold"
                  whileHover={buttonHover}
                >
                  Button Hover
                </motion.button>
                <p className="text-muted-foreground">
                  Scales to 1.05 and lifts 2px. Perfect for CTAs and
                  interactive elements.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stagger Speed Comparison */}
      <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <ScrollReveal animation={fadeInUp}>
            <h2 className="text-5xl font-bold text-center mb-4">
              Stagger Speed Options
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-16">
              Different delays for different use cases
            </p>
          </ScrollReveal>

          <div className="space-y-16 max-w-6xl mx-auto">
            {/* Fast */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-center">
                Fast Stagger (0.08s) - For Many Items
              </h3>
              <StaggerGroup className="grid grid-cols-6 gap-4" staggerDelay={0.08}>
                {[...Array(6)].map((_, i) => (
                  <StaggerItem key={i}>
                    <Card className="p-4 text-center">
                      <div className="text-xl font-bold">{i + 1}</div>
                    </Card>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>

            {/* Medium */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-center">
                Medium Stagger (0.15s) - Default
              </h3>
              <StaggerGroup className="grid grid-cols-4 gap-6" staggerDelay={0.15}>
                {[...Array(4)].map((_, i) => (
                  <StaggerItem key={i}>
                    <Card className="p-6 text-center">
                      <div className="text-2xl font-bold">{i + 1}</div>
                    </Card>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>

            {/* Slow */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-center">
                Slow Stagger (0.25s) - Premium Sections
              </h3>
              <StaggerGroup className="grid grid-cols-3 gap-8" staggerDelay={0.25}>
                {[...Array(3)].map((_, i) => (
                  <StaggerItem key={i}>
                    <Card className="p-8 text-center">
                      <div className="text-3xl font-bold">{i + 1}</div>
                    </Card>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal animation={fadeInScale}>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-5xl font-bold mb-6">
                Ready to Implement?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Check out the documentation files for complete guides and
                examples
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold"
                  whileHover={buttonHover}
                >
                  View Documentation
                </motion.button>
                <motion.button
                  className="px-8 py-3 border-2 border-primary text-foreground rounded-lg font-semibold"
                  whileHover={buttonHover}
                >
                  See Examples
                </motion.button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
