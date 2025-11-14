import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { StorageOptions } from "@/components/StorageOptions";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { LocationMap } from "@/components/LocationMap";
import { Footer } from "@/components/Footer";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";

export default function Page() {
  return (
    <>
      <Header />
      <SmoothScrollWrapper>
        <main className="pt-16">
          <HeroSection />
          <StorageOptions />
          <Testimonials />
          <FAQ />
        </main>
        <LocationMap />
        <Footer />
      </SmoothScrollWrapper>
    </>
  );
}
