"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import CustomCursor from "@/components/CustomCursor";

const queryClient = new QueryClient();

export default function RootClient({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Notifications */}
        <Toaster />
        <Sonner />

        {/* UI enhancements */}
        <CustomCursor />
        <SmoothScrollWrapper>{children}</SmoothScrollWrapper>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
