"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Star } from "lucide-react";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Business Owner",
      rating: 5,
      text: "VaultaStorage has been a game-changer for our business. The facility is clean, secure, and the staff is incredibly helpful.",
      image: "SJ",
    },
    {
      name: "Mohammed Al-Rashid",
      role: "Art Collector",
      rating: 5,
      text: "Perfect climate-controlled environment for my art collection. I can access my pieces anytime with complete peace of mind.",
      image: "MA",
    },
    {
      name: "Emily Chen",
      role: "Expat Professional",
      rating: 5,
      text: "Moving abroad was stressful, but VaultaStorage made storing my belongings so easy. Highly recommend their services!",
      image: "EC",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            What Our{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Customers Say
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us with their storage needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-6 bg-card border-2 border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                  {testimonial.image}
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-muted-foreground">{testimonial.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
