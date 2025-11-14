"use client";

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

const queryClient = new QueryClient();

export default function RootClient({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
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
          <PageTransition>
            {children}
          </PageTransition>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
