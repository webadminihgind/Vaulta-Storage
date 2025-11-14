"use client";

import React from "react";
import { StorageCard } from "./StorageCard";

export const StorageOptions = () => {
  const storageOptions = [
    {
      size: "15 SQ FT",
      price: "AED 299/month",
      dimensions: "Approx 1.5m x 1.5m",
      features: ["Ideal for boxes and small items", "24/7 access", "Climate controlled"],
      image: "/assets/vault1.webp",
    },
    {
      size: "25 SQ FT",
      price: "AED 499/month",
      dimensions: "Approx 2m x 2m",
      features: ["Perfect for furniture storage", "Security monitored", "Easy access"],
      isPopular: true,
      image: "/assets/vault7.webp",
    },
    {
      size: "35 SQ FT",
      price: "AED 699/month",
      dimensions: "Approx 2.5m x 2.5m",
      features: ["Great for apartment contents", "Premium security", "Loading assistance"],
      image: "/assets/vault5.webp",
    },
    {
      size: "50 SQ FT",
      price: "AED 999/month",
      dimensions: "Approx 3m x 3m",
      features: ["Full apartment or small house", "Dedicated support", "Priority access"],
      image: "/assets/vault4.webp",
    },
    {
      size: "75 SQ FT",
      price: "AED 1,299/month",
      dimensions: "Approx 4m x 3m",
      features: ["Large house contents", "VIP service", "Custom solutions"],
      image: "/assets/vault8.webp",
    },
    {
      size: "100 SQ FT",
      price: "AED 1,699/month",
      dimensions: "Approx 4m x 4m",
      features: ["Commercial or large storage", "Concierge service", "Business support"],
      image: "/assets/vault8.webp",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Storage <span className="text-primary">Options</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Flexible, affordable, semi-pro options. Book instantly today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {storageOptions.map((option, index) => (
            <div
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <StorageCard {...option} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
