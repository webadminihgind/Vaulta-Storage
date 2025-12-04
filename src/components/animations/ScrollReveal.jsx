"use client";

import { motion } from "framer-motion";
import { viewportOptions } from "@/lib/animations";

/**
 * ScrollReveal - Premium scroll-triggered animation wrapper
 *
 * Usage:
 * <ScrollReveal>
 *   <YourComponent />
 * </ScrollReveal>
 *
 * Or with custom animation:
 * <ScrollReveal animation={customAnimation}>
 *   <YourComponent />
 * </ScrollReveal>
 */

export const ScrollReveal = ({
  children,
  animation = null,
  viewport = viewportOptions,
  delay = 0,
  className = "",
}) => {
  // Default animation if none provided
  const defaultAnimation = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      delay: delay,
    },
    viewport: viewport,
  };

  // Use custom animation or default
  const animationProps = animation
    ? {
        ...animation,
        viewport: viewport,
        transition: { ...animation.transition, delay: delay },
      }
    : defaultAnimation;

  return (
    <motion.div className={className} {...animationProps}>
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
