"use client";

import { useParams } from "next/navigation";
import { StorageOptions } from "@/components/StorageOptions";
import { Package, Briefcase, Palette, Car, Ship, Sofa, Luggage } from "lucide-react";
import SelfStorage from "@/components/SelfStorage";
import BusinessStorage from "@/components/BusinessStorage";
import ArtStorage from "@/components/ArtStorage";
import CarStorage from "@/components/CarStorage";
import EliteBoatStorage from "@/components/EliteBoatStorage";
import FurnitureStorage from "@/components/FurnitureStorage";
import SuitcaseStorage from "@/components/SuitcaseStorage";

export default function StorageTypePage() {
  const params = useParams();           // dynamic route param
  const type = (params.type || "everyday").toLowerCase();

  const storageTypes = {
    everyday: { title: "For Everyday Life", description: "Perfect storage solutions for your daily needs and household items", icon: Package, features: ["Seasonal clothing and sports equipment","Holiday decorations and gifts","Books, documents, and memorabilia","Small appliances and electronics"], component: SelfStorage },
    business: { title: "For Business", description: "Professional storage solutions for your business needs", icon: Briefcase, features: ["Office furniture and equipment","Inventory and stock management","Archive and document storage","Business supplies and materials"], component: BusinessStorage },
    art: { title: "Art Storage", description: "Climate-controlled storage for valuable artwork and collections", icon: Palette, features: ["Temperature and humidity controlled","UV-protected environment","Custom shelving and hanging systems","Insurance-friendly facility"], component: ArtStorage },
    car: { title: "Car Storage", description: "Secure parking and storage for your vehicles", icon: Car, features: ["Covered and secure parking","24/7 video surveillance","Easy drive-in access","Battery maintenance available"], component: CarStorage },
    boat: { title: "Boat Storage", description: "Protected storage for boats and watercraft", icon: Ship, features: ["Indoor and outdoor options","Trailer storage included","Wash and maintenance areas","Marina access nearby"], component: EliteBoatStorage },
    furniture: { title: "Furniture Storage", description: "Safe storage for your furniture during moves or renovations", icon: Sofa, features: ["Protective wrapping service","Climate-controlled units","Easy access for staging","Short and long-term options"], component: FurnitureStorage },
    suitcases: { title: "Suitcase Storage", description: "Convenient storage for luggage and travel gear", icon: Luggage, features: ["Short-term storage available","Secure locker systems","Airport proximity","Flexible access hours"], component: SuitcaseStorage },
  };

  const currentType = storageTypes[type] || storageTypes["everyday"];
  const Icon = currentType.icon;
  const StorageComponent = currentType.component;

  return (
    <div className="min-h-screen bg-background animated-gradient">
      <main>
        {/* Hero Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent mb-6">
                <Icon className="w-10 h-10 text-primary-foreground" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">{currentType.title}</h1>
              <p className="text-xl text-muted-foreground mb-8">{currentType.description}</p>
              <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {currentType.features.map((feature, index) => (
                  <div key={index} className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Type-specific component */}
        {StorageComponent && <StorageComponent />}

        {/* Storage Options */}
        <StorageOptions />
      </main>
    </div>
  );
}
