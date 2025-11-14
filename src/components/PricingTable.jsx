"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

export const PricingTable = () => {
  const router = useRouter();

  const pricingData = [
    {
      size: "500 sq ft",
      useCase: "SME storage / light ops",
      base: "4,500",
      premium: "6,000",
    },
    {
      size: "1,000 sq ft",
      useCase: "Contractors / e-comm",
      base: "9,000",
      premium: "12,000",
      popular: true,
    },
    {
      size: "2,000 sq ft",
      useCase: "Distribution / staging",
      base: "18,000",
      premium: "24,000",
    },
    {
      size: "3,000 sq ft",
      useCase: "Industrial storage",
      base: "27,000",
      premium: "36,000",
    },
    {
      size: "5,000 sq ft",
      useCase: "Corporate multi-tenant",
      base: "45,000",
      premium: "60,000",
    },
  ];

  const baseFeatures = [
    "24/7 secure access",
    "Loading dock access",
    "Flexible lease terms",
    "Standard security system",
  ];

  const premiumFeatures = [
    "All Base features",
    "Climate controlled environment",
    "Temperature monitoring",
    "Humidity control",
    "Ideal for sensitive goods",
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Transparent <span className="text-primary">Pricing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple, straightforward pricing. Choose base storage or upgrade to premium climate control.
          </p>
        </div>

        {/* Feature Comparison */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
          <Card className="p-8 border-2 border-border">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Base Storage</h3>
              <div className="text-4xl font-bold text-primary mb-2">AED 9</div>
              <div className="text-muted-foreground">per sq ft / month</div>
            </div>
            <ul className="space-y-3">
              {baseFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-8 border-2 border-primary bg-gradient-to-br from-primary/5 to-transparent">
            <div className="mb-6">
              <div className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold mb-3">
                PREMIUM
              </div>
              <h3 className="text-2xl font-bold mb-2">Climate Controlled</h3>
              <div className="text-4xl font-bold text-primary mb-2">AED 12</div>
              <div className="text-muted-foreground">per sq ft / month</div>
            </div>
            <ul className="space-y-3">
              {premiumFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className={idx === 0 ? "font-semibold" : ""}>{feature}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Pricing Table */}
        <div className="overflow-x-auto">
          <table className="w-full max-w-6xl mx-auto">
            <thead>
              <tr className="border-b-2 border-primary">
                <th className="text-left py-4 px-4 font-bold">Unit Size</th>
                <th className="text-left py-4 px-4 font-bold">Use Case</th>
                <th className="text-right py-4 px-4 font-bold">
                  Base Storage
                  <div className="text-xs font-normal text-muted-foreground">AED/month</div>
                </th>
                <th className="text-right py-4 px-4 font-bold">
                  Premium Climate
                  <div className="text-xs font-normal text-muted-foreground">AED/month</div>
                </th>
                <th className="py-4 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {pricingData.map((row, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-border hover:bg-muted/50 transition-colors ${
                    row.popular ? "bg-primary/5" : ""
                  }`}
                >
                  <td className="py-4 px-4 font-semibold">
                    {row.size}
                    {row.popular && (
                      <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                        POPULAR
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-muted-foreground text-sm">{row.useCase}</td>
                  <td className="py-4 px-4 text-right font-bold text-lg">
                    {row.base.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-right font-bold text-lg text-primary">
                    {row.premium.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      onClick={() =>
                        router.push(
                          `/booking?size=${row.size}&price=AED ${row.base}/month&dimensions=${row.useCase}`
                        )
                      }
                    >
                      Book Now
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground mb-6">
            * All prices in AED. Minimum lease term applies. Contact us for custom requirements.
          </p>
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => router.push("/contact")}
          >
            Request Custom Quote
          </Button>
        </div>
      </div>
    </section>
  );
};
