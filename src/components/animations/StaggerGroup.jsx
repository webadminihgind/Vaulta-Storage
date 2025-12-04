"use client";

import { motion } from "framer-motion";
import { staggerContainer, viewportOptions } from "@/lib/animations";

/**
 * StaggerGroup - Container for staggered child animations
 *
 * Usage:
 * <StaggerGroup>
 *   <StaggerItem><Card1 /></StaggerItem>
 *   <StaggerItem><Card2 /></StaggerItem>
 *   <StaggerItem><Card3 /></StaggerItem>
 * </StaggerGroup>
 */

export const StaggerGroup = ({
  children,
  staggerDelay = 0.15,
  delayChildren = 0.1,
  viewport = viewportOptions,
  className = "",
}) => {
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delayChildren,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="initial"
      whileInView="animate"
      viewport={viewport}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
};

/**
 * StaggerItem - Individual item within a StaggerGroup
 */
export const StaggerItem = ({
  children,
  animation = null,
  className = "",
}) => {
  // Default stagger item animation
  const defaultVariants = {
    initial: {
      opacity: 0,
      y: 40,
      scale: 0.97,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const variants = animation || defaultVariants;

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
};

export default StaggerGroup;
