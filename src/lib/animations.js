/**
 * Premium Scroll Animation Utilities
 * Inspired by high-end luxury themes with cinematic motion design
 */

// Smooth easing curves for premium feel (Artistics-grade quality)
export const easings = {
  easeOut: [0.16, 1, 0.3, 1], // Ultra-smooth deceleration
  easeInOut: [0.645, 0.045, 0.355, 1], // Balanced acceleration/deceleration
  spring: [0.175, 0.885, 0.32, 1.275], // Gentle spring with subtle bounce
  luxury: [0.25, 0.46, 0.45, 0.94], // Premium, elegant easing
  artistics: [0.4, 0, 0.2, 1], // Artistics-style cinematic easing
};

// Animation durations (Artistics-style timing)
export const durations = {
  fast: 0.5,
  medium: 0.7,
  slow: 0.9,
  verySlow: 1.1,
};

/**
 * Fade In with upward motion
 * Perfect for headings and hero elements
 */
export const fadeInUp = {
  initial: {
    opacity: 0,
    y: 50,
  },
  whileInView: {
    opacity: 1,
    y: 0,
  },
  transition: {
    duration: durations.slow,
    ease: easings.artistics,
  },
};

/**
 * Fade In with subtle upward motion
 * Ideal for paragraphs and subtle content
 */
export const fadeInUpSubtle = {
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  transition: {
    duration: durations.fast,
    ease: easings.easeOut,
  },
};

/**
 * Fade In with scale
 * Great for cards, images, and featured content
 */
export const fadeInScale = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: 40,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  transition: {
    duration: durations.slow,
    ease: easings.luxury,
  },
};

/**
 * Fade In with scale (subtle)
 * For smaller cards and grid items
 */
export const fadeInScaleSubtle = {
  initial: {
    opacity: 0,
    scale: 0.97,
    y: 20,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  transition: {
    duration: durations.medium,
    ease: easings.easeOut,
  },
};

/**
 * Stagger container
 * Use this for parent elements to create sequential animations
 */
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

/**
 * Stagger container (faster)
 * For grids with many items
 */
export const staggerContainerFast = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

/**
 * Stagger container (slower)
 * For hero sections and premium reveals
 */
export const staggerContainerSlow = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

/**
 * Fade in from left
 * Good for alternating layouts
 */
export const fadeInLeft = {
  initial: {
    opacity: 0,
    x: -40,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  transition: {
    duration: durations.medium,
    ease: easings.easeOut,
  },
};

/**
 * Fade in from right
 * Good for alternating layouts
 */
export const fadeInRight = {
  initial: {
    opacity: 0,
    x: 40,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  transition: {
    duration: durations.medium,
    ease: easings.easeOut,
  },
};

/**
 * Premium button hover animation (Artistics-style)
 */
export const buttonHover = {
  scale: 1.03,
  y: -3,
  transition: {
    duration: 0.25,
    ease: easings.artistics,
  },
};

/**
 * Card hover animation (Artistics-style smooth lift)
 */
export const cardHover = {
  y: -12,
  scale: 1.015,
  transition: {
    duration: 0.35,
    ease: easings.artistics,
  },
};

/**
 * Viewport options for InView trigger (Artistics-style timing)
 * Animations trigger once when element enters viewport
 */
export const viewportOptions = {
  once: true, // Trigger animation only once
  margin: "0px 0px -15% 0px", // Start slightly before element enters
  amount: 0.15, // Trigger when 15% is visible
};

/**
 * Viewport options for earlier trigger (Hero sections)
 */
export const viewportOptionsEarly = {
  once: true,
  margin: "0px 0px 0px 0px", // Immediate trigger
  amount: 0.01, // As soon as any part is visible
};

/**
 * Viewport options for delayed trigger (Lower priority content)
 */
export const viewportOptionsLate = {
  once: true,
  margin: "0px 0px -25% 0px",
  amount: 0.25,
};
