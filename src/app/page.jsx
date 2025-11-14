import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { StorageOptions } from "@/components/StorageOptions";
import { ComprehensiveSolutions } from "@/components/ComprehensiveSolutions";
import { Testimonials } from "@/components/Testimonials";
import { SizeCalculator } from "@/components/SizeCalculator";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        <HeroSection />
        <StorageOptions />
        <ComprehensiveSolutions />
        <Testimonials />
        <SizeCalculator />
        <FAQ />
      </main>

    </div>
  );
}
