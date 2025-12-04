"use client";

import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/Toaster";
import { Toaster as Sonner } from "@/components/ui/Sonner";
import { TooltipProvider } from "@/components/ui/Tooltip";

import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";
import NavigationProgress from "@/components/NavigationProgress";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppWidget from "@/components/WhatsAppWidget";

const queryClient = new QueryClient();

export default function RootClient({ children }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange={false}
      >
        <TooltipProvider>
          {/* Notifications */}
          <Toaster />
          <Sonner />

          {/* Navigation progress bar */}
          <NavigationProgress />

          {/* Background Animation */}
          <BackgroundAnimation />

          {/* UI enhancements */}
          <CustomCursor />

          {/* Fixed Elements (Outside scroll wrapper) */}
          <Header />
          <ScrollToTop />
          <WhatsAppWidget />

          <div
            className="transition-opacity duration-700 ease-out"
            style={{
              opacity: isLoaded ? 1 : 0,
            }}
          >
            <SmoothScrollWrapper>
              {/* Page Content with Transition */}
              <main className="pt-16" data-scroll-section>
                <PageTransition>
                  {children}
                </PageTransition>
              </main>

              {/* Global Footer */}
              <div data-scroll-section>
                <Footer />
              </div>
            </SmoothScrollWrapper>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
