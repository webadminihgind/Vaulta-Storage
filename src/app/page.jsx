import { HeroSection } from "@/components/HeroSection";
import { StorageOptions } from "@/components/StorageOptions";
import { BookingSteps } from "@/components/BookingSteps";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { LocationMap } from "@/components/LocationMap";

export default function Page() {
  return (
    <div className="min-h-screen  text-foreground mt-10">
      <HeroSection />
      <StorageOptions />
      <BookingSteps />
      <Testimonials />
      <FAQ />
      <LocationMap />
    </div>
  );
}
