"use client";

import { motion } from "framer-motion";
import { viewportOptions } from "@/lib/animations";

/**
 * FadeIn - Simple fade-in animation for inline elements
 *
 * Perfect for text, small elements, or when you need a simple fade
 * without complex motion
 *
 * Usage:
 * <FadeIn>
 *   <p>This text will fade in</p>
 * </FadeIn>
 */

export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.6,
  className = "",
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={viewportOptions}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
