"use client";

import React from "react";
import { StorageCard } from "./StorageCard";

export const StorageOptions = () => {
  const storageOptions = [
    {
      size: "500 SQ FT",
      price: "AED 4,500/month",
      pricePerSqFt: "AED 9/sq ft/mo",
      premiumPrice: "AED 6,000/month",
      dimensions: "SME storage / light operations",
      features: ["24/7 secure access", "Flexible lease terms", "Loading dock access", "Base rate: AED 9/sq ft"],
      image: "/assets/vault1.webp",
      useCase: "Small to medium enterprises",
    },
    {
      size: "1,000 SQ FT",
      price: "AED 9,000/month",
      pricePerSqFt: "AED 9/sq ft/mo",
      premiumPrice: "AED 12,000/month",
      dimensions: "Contractors / e-commerce",
      features: ["Perfect for contractors & online businesses", "Premium climate available (+AED 3/sq ft)", "Inventory management space", "Easy truck access"],
      isPopular: true,
      image: "/assets/vault7.webp",
      useCase: "Contractors & E-commerce",
    },
    {
      size: "2,000 SQ FT",
      price: "AED 18,000/month",
      pricePerSqFt: "AED 9/sq ft/mo",
      premiumPrice: "AED 24,000/month",
      dimensions: "Distribution / staging",
      features: ["Distribution center operations", "Product staging & fulfillment", "Racking systems available", "Forklift accessible"],
      image: "/assets/vault5.webp",
      useCase: "Distribution & Staging",
    },
    {
      size: "3,000 SQ FT",
      price: "AED 27,000/month",
      pricePerSqFt: "AED 9/sq ft/mo",
      premiumPrice: "AED 36,000/month",
      dimensions: "Industrial storage",
      features: ["Heavy-duty industrial use", "High ceiling clearance", "Multiple loading bays", "Equipment storage ready"],
      image: "/assets/vault4.webp",
      useCase: "Industrial Operations",
    },
    {
      size: "5,000 SQ FT",
      price: "AED 45,000/month",
      pricePerSqFt: "AED 9/sq ft/mo",
      premiumPrice: "AED 60,000/month",
      dimensions: "Corporate multi-tenant",
      features: ["Large corporate operations", "Multi-tenant configurations", "Dedicated account manager", "Custom build-out options"],
      image: "/assets/vault8.webp",
      useCase: "Corporate & Enterprise",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Commercial Storage <span className="text-primary">Solutions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Flexible warehouse space for businesses of all sizes. From SMEs to large corporations.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-card px-4 py-2 rounded-lg border border-border">
              <span className="text-primary font-bold">Base:</span> AED 9/sq ft/mo
            </div>
            <div className="bg-card px-4 py-2 rounded-lg border border-border">
              <span className="text-primary font-bold">Premium Climate:</span> AED 12/sq ft/mo
            </div>
          </div>
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
