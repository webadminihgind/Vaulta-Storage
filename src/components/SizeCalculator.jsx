"use client";


import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";

export const SizeCalculator = () => {
  const [rooms, setRooms] = useState({ bedroom: 0, living: 0, kitchen: 0 });
  const [recommendedSize, setRecommendedSize] = useState("");

  const calculateSize = () => {
    const total = rooms.bedroom * 25 + rooms.living * 35 + rooms.kitchen * 15;
    if (total <= 15) setRecommendedSize("15 SQ FT");
    else if (total <= 25) setRecommendedSize("25 SQ FT");
    else if (total <= 35) setRecommendedSize("35 SQ FT");
    else if (total <= 50) setRecommendedSize("50 SQ FT");
    else if (total <= 75) setRecommendedSize("75 SQ FT");
    else setRecommendedSize("100 SQ FT");
  };

  return (
    <section className="py-24 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Storage Size{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Calculator
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Not sure what size you need? Let us help you calculate
            </p>
          </div>

          <Card className="p-8 bg-card border-2 border-border">
            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="bedroom">Bedrooms</Label>
                  <Input
                    id="bedroom"
                    type="number"
                    min="0"
                    value={rooms.bedroom}
                    onChange={(e) =>
                      setRooms({ ...rooms, bedroom: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="living">Living Rooms</Label>
                  <Input
                    id="living"
                    type="number"
                    min="0"
                    value={rooms.living}
                    onChange={(e) =>
                      setRooms({ ...rooms, living: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="kitchen">Kitchen Items</Label>
                  <Input
                    id="kitchen"
                    type="number"
                    min="0"
                    value={rooms.kitchen}
                    onChange={(e) =>
                      setRooms({ ...rooms, kitchen: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
              </div>

              <Button
                onClick={calculateSize}
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                size="lg"
              >
                <Calculator className="w-4 h-4 mr-2" />
                Calculate Recommended Size
              </Button>

              {recommendedSize && (
                <div className="mt-6 p-6 bg-gradient-to-br from-primary/20 to-accent/10 rounded-lg border border-primary/30 text-center">
                  <div className="text-sm text-muted-foreground mb-2">
                    Recommended Size
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {recommendedSize}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
