# Premium Scroll Animation Components

Reusable animation components for creating cinematic, luxury-grade scroll animations.

## Components

### ScrollReveal
Animates elements when they scroll into viewport.

```jsx
import { ScrollReveal } from "@/components/animations";
import { fadeInUp } from "@/lib/animations";

<ScrollReveal animation={fadeInUp}>
  <h1>Animated Heading</h1>
</ScrollReveal>
```

**Props:**
- `animation` - Animation preset from `@/lib/animations`
- `delay` - Delay in seconds (default: 0)
- `viewport` - Viewport trigger options
- `className` - Additional CSS classes

---

### StaggerGroup & StaggerItem
Creates sequential animations for lists and grids.

```jsx
import { StaggerGroup, StaggerItem } from "@/components/animations";

<StaggerGroup className="grid md:grid-cols-3 gap-6">
  <StaggerItem><Card>1</Card></StaggerItem>
  <StaggerItem><Card>2</Card></StaggerItem>
  <StaggerItem><Card>3</Card></StaggerItem>
</StaggerGroup>
```

**StaggerGroup Props:**
- `staggerDelay` - Delay between children (default: 0.15s)
- `delayChildren` - Initial delay (default: 0.1s)
- `viewport` - Viewport trigger options
- `className` - CSS classes for container

**StaggerItem Props:**
- `animation` - Custom animation variants
- `className` - CSS classes

---

### FadeIn
Simple fade-in animation without motion.

```jsx
import { FadeIn } from "@/components/animations";

<FadeIn>
  <p>Simple fade</p>
</FadeIn>
```

**Props:**
- `delay` - Delay in seconds (default: 0)
- `duration` - Animation duration (default: 0.6s)
- `className` - CSS classes

---

## Quick Import

```jsx
// Import everything from one place
import {
  ScrollReveal,
  StaggerGroup,
  StaggerItem,
  FadeIn,
  fadeInUp,
  cardHover,
  buttonHover,
} from "@/components/animations";
```

---

## File Structure

```
src/components/animations/
├── ScrollReveal.jsx      # Scroll-triggered wrapper
├── StaggerGroup.jsx      # Staggered children
├── FadeIn.jsx           # Simple fade
├── index.js             # Centralized exports
└── README.md            # This file
```

---

## Related Files

- **Animation Presets**: `src/lib/animations.js`
- **Motion Config**: `src/lib/motion-config.js`
- **Documentation**: Root directory `.md` files

---

## Examples

See `ANIMATION_EXAMPLES.md` in the root directory for complete usage examples.

## Demo

Visit `/animation-demo` to see all animations in action.
