# Premium Scroll Animation System

A comprehensive, luxury-grade animation system for your React website built with Framer Motion. Inspired by high-end premium themes with cinematic motion design.

## 🎬 Features

- **Smooth scroll-triggered animations** - Elements animate as they enter the viewport
- **Elegant easing curves** - Premium luxury easing for sophisticated motion
- **Staggered animations** - Sequential reveals for child elements
- **Hover interactions** - Subtle micro-interactions for cards and buttons
- **Performance optimized** - Animations trigger once, reducing overhead
- **Reusable components** - Easy-to-use wrapper components

## 📁 File Structure

```
src/
├── lib/
│   └── animations.js          # Animation presets and configurations
└── components/
    └── animations/
        ├── ScrollReveal.jsx   # Scroll-triggered animation wrapper
        └── StaggerGroup.jsx   # Staggered children animations
```

## 🚀 Quick Start

### 1. Basic Scroll Animation

Wrap any element to animate it on scroll:

```jsx
import { ScrollReveal } from "@/components/animations/ScrollReveal";

<ScrollReveal>
  <h1>This heading will fade in and slide up</h1>
</ScrollReveal>
```

### 2. Custom Animation

Use predefined animation styles:

```jsx
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { fadeInUp } from "@/lib/animations";

<ScrollReveal animation={fadeInUp}>
  <h2>Custom animated heading</h2>
</ScrollReveal>
```

### 3. Staggered Grid/List Items

Create sequential animations for multiple items:

```jsx
import { StaggerGroup, StaggerItem } from "@/components/animations/StaggerGroup";

<StaggerGroup className="grid md:grid-cols-3 gap-6">
  <StaggerItem>
    <Card>Item 1</Card>
  </StaggerItem>
  <StaggerItem>
    <Card>Item 2</Card>
  </StaggerItem>
  <StaggerItem>
    <Card>Item 3</Card>
  </StaggerItem>
</StaggerGroup>
```

### 4. Hover Animations

Add smooth hover effects:

```jsx
import { motion } from "framer-motion";
import { cardHover, buttonHover } from "@/lib/animations";

// Card hover
<motion.div whileHover={cardHover}>
  <Card>Hover me!</Card>
</motion.div>

// Button hover
<motion.button whileHover={buttonHover}>
  Click me
</motion.button>
```

## 🎨 Available Animation Presets

### Fade Animations

- **`fadeInUp`** - Fade in with 60px upward motion
- **`fadeInUpSubtle`** - Fade in with 30px upward motion (lighter)
- **`fadeInScale`** - Fade in with scale (0.95 → 1) and upward motion
- **`fadeInScaleSubtle`** - Fade in with subtle scale (0.97 → 1)
- **`fadeInLeft`** - Fade in from left (-40px)
- **`fadeInRight`** - Fade in from right (+40px)

### Stagger Containers

- **`staggerContainer`** - Default: 0.15s delay between children
- **`staggerContainerFast`** - 0.08s delay (for grids with many items)
- **`staggerContainerSlow`** - 0.2s delay (for hero sections)

### Hover Effects

- **`buttonHover`** - Scale up + lift (1.05 scale, -2px y)
- **`cardHover`** - Lift + subtle scale (1.02 scale, -8px y)

### Easing Curves

- **`easings.easeOut`** - `[0.22, 1, 0.36, 1]` - Smooth deceleration
- **`easings.luxury`** - `[0.33, 0.01, 0, 1]` - Premium, elegant easing
- **`easings.spring`** - `[0.25, 0.46, 0.45, 0.94]` - Gentle spring

## 📖 Component API

### ScrollReveal

Animates elements when they scroll into view.

```jsx
<ScrollReveal
  animation={fadeInUp}      // Optional: Custom animation preset
  viewport={viewportOptions} // Optional: Custom viewport settings
  delay={0.2}               // Optional: Delay in seconds
  className="custom-class"   // Optional: Additional CSS classes
>
  {children}
</ScrollReveal>
```

**Props:**
- `animation` - Animation preset from `@/lib/animations`
- `viewport` - Viewport trigger settings (default: triggers at 20% visibility)
- `delay` - Delay before animation starts (in seconds)
- `className` - Additional CSS classes

### StaggerGroup

Container for staggered child animations.

```jsx
<StaggerGroup
  staggerDelay={0.15}        // Delay between each child (seconds)
  delayChildren={0.1}        // Delay before first child animates
  viewport={viewportOptions} // Viewport trigger settings
  className="grid gap-4"     // CSS classes
>
  {children}
</StaggerGroup>
```

**Props:**
- `staggerDelay` - Time between each child animation (default: 0.15s)
- `delayChildren` - Delay before first child (default: 0.1s)
- `viewport` - Viewport trigger settings
- `className` - CSS classes for the container

### StaggerItem

Individual animated item within a StaggerGroup.

```jsx
<StaggerItem
  animation={customVariants}  // Optional: Custom animation variants
  className="custom-class"    // Optional: CSS classes
>
  {children}
</StaggerItem>
```

## 🎯 Usage Examples

### Example 1: Hero Section

```jsx
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { fadeInUp } from "@/lib/animations";

export function Hero() {
  return (
    <section>
      <ScrollReveal animation={fadeInUp}>
        <h1>Welcome to Our Website</h1>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <p>Beautiful, premium animations</p>
      </ScrollReveal>

      <ScrollReveal delay={0.4}>
        <button>Get Started</button>
      </ScrollReveal>
    </section>
  );
}
```

### Example 2: Feature Cards

```jsx
import { StaggerGroup, StaggerItem } from "@/components/animations/StaggerGroup";
import { motion } from "framer-motion";
import { cardHover } from "@/lib/animations";

export function Features() {
  const features = [...];

  return (
    <StaggerGroup className="grid md:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <StaggerItem key={index}>
          <motion.div whileHover={cardHover}>
            <Card>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </Card>
          </motion.div>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
```

### Example 3: Testimonials

```jsx
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/animations/StaggerGroup";
import { fadeInUp } from "@/lib/animations";

export function Testimonials() {
  return (
    <section>
      <ScrollReveal animation={fadeInUp}>
        <h2>What Our Customers Say</h2>
      </ScrollReveal>

      <StaggerGroup className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <StaggerItem key={testimonial.id}>
            <TestimonialCard {...testimonial} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
```

### Example 4: Call-to-Action Button

```jsx
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { buttonHover } from "@/lib/animations";

export function CTA() {
  return (
    <ScrollReveal delay={0.3}>
      <motion.button
        className="btn-primary"
        whileHover={buttonHover}
      >
        Get Started Today
      </motion.button>
    </ScrollReveal>
  );
}
```

## ⚙️ Customization

### Creating Custom Animations

You can create your own animation presets:

```jsx
// In your component or animations.js
const customFadeIn = {
  initial: { opacity: 0, y: 100, scale: 0.9 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  transition: {
    duration: 1.2,
    ease: [0.33, 0.01, 0, 1],
  },
};

<ScrollReveal animation={customFadeIn}>
  <YourComponent />
</ScrollReveal>
```

### Adjusting Viewport Triggers

Control when animations trigger:

```jsx
import { viewportOptionsEarly } from "@/lib/animations";

// Trigger earlier (when 10% visible)
<ScrollReveal viewport={viewportOptionsEarly}>
  <Component />
</ScrollReveal>

// Custom viewport
const customViewport = {
  once: true,
  margin: "0px",
  amount: 0.5, // Trigger at 50% visibility
};

<ScrollReveal viewport={customViewport}>
  <Component />
</ScrollReveal>
```

## 🎪 Animation Timing Guide

For a luxury, cinematic feel:

- **Headings**: 0.8s - 1.2s duration
- **Paragraphs**: 0.6s - 0.8s duration
- **Cards**: 0.8s - 1.0s duration
- **Buttons**: 0.6s duration
- **Stagger delay**: 0.15s - 0.2s
- **Hover effects**: 0.3s - 0.4s

## 💡 Best Practices

1. **Use animations sparingly** - Not everything needs to animate
2. **Consistent timing** - Keep durations similar across sections
3. **Respect motion preferences** - Consider users who prefer reduced motion
4. **Test on mobile** - Ensure animations work smoothly on all devices
5. **Performance** - Animations trigger once by default to reduce overhead
6. **Group related items** - Use StaggerGroup for related content

## 🔧 Troubleshooting

### Animation not triggering

- Check that the element is in viewport
- Verify `viewport` settings (try `amount: 0.1` for earlier trigger)
- Ensure Framer Motion is installed: `npm install framer-motion`

### Animation feels too slow

- Reduce `duration` in animation preset
- Use `fadeInUpSubtle` instead of `fadeInUp`
- Adjust `staggerDelay` to a smaller value

### Too much delay between items

- Reduce `staggerDelay` prop (try 0.08 or 0.1)
- Use `staggerContainerFast` instead of `staggerContainer`

## 🌟 Components Updated

The following components have premium animations applied:

- ✅ **BookingSteps.jsx** - Heading, staggered cards, CTA button
- ✅ **Testimonials.jsx** - Heading, staggered testimonial cards
- ✅ **ComprehensiveSolutions.jsx** - Heading, staggered solution cards
- ✅ **PricingTable.jsx** - Heading, pricing cards, table, CTA

## 📚 Additional Resources

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Cubic Bezier Easing Tool](https://cubic-bezier.com/)
- [Motion Design Principles](https://material.io/design/motion)

---

**Built with Framer Motion** - The production-ready motion library for React
