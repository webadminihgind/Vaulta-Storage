/**
 * Motion Configuration & Accessibility
 *
 * Provides utilities for respecting user motion preferences
 * and creating accessible animations
 */

/**
 * Check if user prefers reduced motion
 * @returns {boolean}
 */
export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Get animation config based on user preferences
 * Returns simplified animations if user prefers reduced motion
 *
 * @param {object} animation - Full animation object
 * @returns {object} - Animation config respecting user preferences
 */
export const getMotionConfig = (animation) => {
  if (prefersReducedMotion()) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.2 },
    };
  }
  return animation;
};

/**
 * Conditional motion props
 * Use this when you want to completely disable motion for users who prefer reduced motion
 *
 * Usage:
 * <motion.div {...conditionalMotion(motionProps)}>
 *   Content
 * </motion.div>
 */
export const conditionalMotion = (motionProps) => {
  if (prefersReducedMotion()) {
    return {}; // Return empty object, no animation
  }
  return motionProps;
};

/**
 * Reduced motion animation variants
 * Simplified versions of animations that only use opacity
 */
export const reducedMotionVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.2 },
  },
};

/**
 * Global Framer Motion configuration
 * Can be used to set global motion preferences
 */
export const motionGlobalConfig = {
  // Respect user's reduced motion preferences
  reducedMotion: "user", // Options: "always", "never", "user"
};
