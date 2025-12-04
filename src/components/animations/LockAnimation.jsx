"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const LockAnimation = () => {
  const { scrollY } = useScroll();
  const [isClient, setIsClient] = useState(false);

  // Set to true once mounted on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Transform scroll position to lock rotation (0 at top, -30 degrees when scrolled)
  const lockRotation = useTransform(scrollY, [0, 300], [0, -30]);

  // Shackle opens at top, closes as you scroll
  const shackleOpen = useTransform(scrollY, [0, 300], [20, 0]);

  // Opacity fades out as you scroll
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  // Scale down slightly as you scroll
  const scale = useTransform(scrollY, [0, 300], [1, 0.85]);

  // Text opacity based on scroll
  const textOpacity = useTransform(scrollY, [0, 150], [1, 0]);

  if (!isClient) {
    return null; // Prevent SSR issues
  }

  return (
    <motion.div
      className="fixed top-1/4 right-8 sm:right-16 lg:right-24 z-50 pointer-events-none"
      style={{ opacity, scale }}
    >
      <motion.svg
        width="120"
        height="140"
        viewBox="0 0 120 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ rotate: lockRotation }}
      >
        {/* Lock Body */}
        <motion.rect
          x="30"
          y="60"
          width="60"
          height="70"
          rx="8"
          fill="url(#lockGradient)"
          stroke="#BFF747"
          strokeWidth="3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* Keyhole */}
        <motion.circle
          cx="60"
          cy="85"
          r="8"
          fill="#0A0F1C"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
        <motion.rect
          x="56"
          y="85"
          width="8"
          height="20"
          rx="2"
          fill="#0A0F1C"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        />

        {/* Shackle - Opens and Closes with Scroll */}
        <motion.path
          d={`M 40 60
              L 40 35
              Q 40 15, 60 15
              Q 80 15, 80 35
              L 80 60`}
          stroke="#BFF747"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          style={{ translateY: shackleOpen }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        {/* Glow Effect */}
        <motion.circle
          cx="60"
          cy="95"
          r="50"
          fill="url(#glowGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="lockGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a1f2e" />
            <stop offset="100%" stopColor="#0f1419" />
          </linearGradient>
          <radialGradient id="glowGradient">
            <stop offset="0%" stopColor="#BFF747" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#BFF747" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#BFF747" stopOpacity="0" />
          </radialGradient>
        </defs>
      </motion.svg>

      {/* Lock Status Text */}
      <motion.div
        className="text-center mt-4 text-sm font-bold"
        style={{ opacity: textOpacity }}
      >
        <motion.span
          className="text-primary"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          SECURE
        </motion.span>
      </motion.div>
    </motion.div>
  );
};