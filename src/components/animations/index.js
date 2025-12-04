/**
 * Animation Components - Export Hub
 * Import all animation components from a single location
 *
 * Usage:
 * import { ScrollReveal, StaggerGroup, StaggerItem, FadeIn } from "@/components/animations";
 */

export { ScrollReveal } from "./ScrollReveal";
export { StaggerGroup, StaggerItem } from "./StaggerGroup";
export { FadeIn } from "./FadeIn";

// Re-export commonly used animation presets
export {
  fadeInUp,
  fadeInUpSubtle,
  fadeInScale,
  fadeInScaleSubtle,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  staggerContainerFast,
  staggerContainerSlow,
  buttonHover,
  cardHover,
  viewportOptions,
  viewportOptionsEarly,
  viewportOptionsLate,
  easings,
  durations,
} from "@/lib/animations";
