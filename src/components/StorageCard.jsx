"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useRouter } from "next/navigation"; // Next.js router

export const StorageCard = ({ size, price, dimensions, features, isPopular = false, image, pricePerSqFt, premiumPrice, useCase }) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  return (
    <Card
      className={`relative bg-card border-2 transition-all duration-300 overflow-hidden ${
        isPopular
          ? "border-primary shadow-[0_0_30px_rgba(191,247,71,0.4)]"
          : "border-border hover:border-primary/50"
      } ${isHovered ? "shadow-[0_10px_40px_rgba(0,0,0,0.5)] scale-105" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isPopular && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-1 text-sm font-semibold z-10">
          MOST POPULAR
        </div>
      )}

      <div className="p-6 space-y-6">
        {/* Image */}
        <div className="w-full aspect-square bg-gradient-to-br from-primary/20 via-accent/10 to-background rounded-lg flex items-center justify-center border border-primary/30 relative overflow-hidden">
          <img
            src={image}
            alt={size}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Size & Use Case */}
        <div className="space-y-1">
          <div className="text-2xl font-bold text-foreground">{size}</div>
          {useCase && (
            <div className="text-xs font-semibold text-primary uppercase tracking-wide">
              {useCase}
            </div>
          )}
          <div className="text-sm text-muted-foreground">{dimensions}</div>
        </div>

        {/* Pricing */}
        <div className="space-y-2 border-y border-border py-3">
          <div>
            <div className="text-xs text-muted-foreground">Base Rate</div>
            <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {price}
            </div>
            {pricePerSqFt && (
              <div className="text-xs text-muted-foreground mt-1">{pricePerSqFt}</div>
            )}
          </div>
          {premiumPrice && (
            <div className="text-xs text-muted-foreground">
              Premium Climate: <span className="text-foreground font-semibold">{premiumPrice}</span>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="text-sm text-foreground">
              {feature}
            </div>
          ))}
        </div>

        {/* Hover Button */}
        <div
          className={`transition-all duration-300 ease-out ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <Button
            className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200"
            size="lg"
            onClick={() =>
              router.push(`/booking?size=${encodeURIComponent(size)}&price=${encodeURIComponent(price)}&dimensions=${encodeURIComponent(dimensions)}`)
            }
          >
            BOOK NOW
          </Button>
        </div>
      </div>
    </Card>
  );
};
