"use client";

import { Card } from "@/components/ui/Card";
import { Package, Building2 } from "lucide-react";

export const ComprehensiveSolutions = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Say goodbye to moving stress.
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-primary">
            We Handle Everything
          </h3>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* For Everyday Life */}
          <Card className="bg-card border-2 border-border hover:border-primary/50 transition-all duration-300 p-8 space-y-6 group hover:shadow-[0_0_40px_rgba(234,179,8,0.2)]">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-foreground">For everyday life</h3>
              <Package className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" />
            </div>

            <div className="space-y-4">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center border-2 border-primary/30">
                <Package className="w-32 h-32 text-primary" strokeWidth={1} />
              </div>

              <div className="space-y-3">
                <div className="border-t border-border pt-3">
                  <p className="text-foreground">Ideal for most self-storing</p>
                </div>
                <div className="border-t border-border pt-3">
                  <p className="font-semibold text-foreground">PACKING, PICK UP AND DELIVERY</p>
                  <p className="text-sm text-muted-foreground">FREE</p>
                </div>
                <div className="border-t border-border pt-3">
                  <p className="text-sm text-muted-foreground">20 kg to 800 AED per month</p>
                </div>
                <div className="border-t border-border pt-3 text-2xl font-bold text-primary">TOTAL</div>
                <p className="text-sm text-muted-foreground">Simple contract 330D-AED</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-semibold">
                BOOK
              </button>
              <button className="flex-1 px-6 py-3 border-2 border-primary text-foreground rounded-md hover:bg-primary/10 transition-colors font-semibold">
                EXPLORE ALL OFFERS
              </button>
            </div>
          </Card>

          {/* For Business */}
          <Card className="bg-card border-2 border-border hover:border-primary/50 transition-all duration-300 p-8 space-y-6 group hover:shadow-[0_0_40px_rgba(234,179,8,0.2)]">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-foreground">For business</h3>
              <Building2 className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" />
            </div>

            <div className="space-y-4">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center border-2 border-primary/30">
                <Building2 className="w-32 h-32 text-primary" strokeWidth={1} />
              </div>

              <div className="space-y-3">
                <div className="border-t border-border pt-3">
                  <p className="text-foreground">Flexible option for the company's benefits</p>
                </div>
                <div className="border-t border-border pt-3">
                  <p className="font-semibold text-foreground">PACKING, PICK UP AND DELIVERY</p>
                  <p className="text-sm text-muted-foreground">FREE</p>
                </div>
                <div className="border-t border-border pt-3">
                  <p className="text-sm text-muted-foreground">100 kg to 2000 AED per month</p>
                </div>
                <div className="border-t border-border pt-3 text-2xl font-bold text-primary">TOTAL</div>
                <p className="text-sm text-muted-foreground">Simple contract 25 400-AED</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-semibold">
                BOOK
              </button>
              <button className="flex-1 px-6 py-3 border-2 border-primary text-foreground rounded-md hover:bg-primary/10 transition-colors font-semibold">
                EXPLORE ALL OFFERS
              </button>
            </div>
          </Card>
        </div>

        {/* Art Storage Button */}
        <div className="mt-8 max-w-5xl mx-auto">
          <button className="w-full px-8 py-4 border-2 border-primary text-foreground rounded-md hover:bg-primary/10 transition-colors font-semibold text-lg">
            Art storage <span className="text-primary">soon</span>
          </button>
        </div>
      </div>
    </section>
  );
};
