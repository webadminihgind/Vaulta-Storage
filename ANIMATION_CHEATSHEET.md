# 🎬 Animation Cheat Sheet

Quick copy-paste reference for implementing premium scroll animations.

## 📦 Import Statement

```jsx
// Option 1: Import from central location
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/animations";
import { fadeInUp, cardHover, buttonHover } from "@/lib/animations";
import { motion } from "framer-motion";

// Option 2: Import individually
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/animations/StaggerGroup";
```

---

## 🎯 Common Use Cases

### 1. Heading
```jsx
<ScrollReveal animation={fadeInUp}>
  <h2>Your Heading</h2>
</ScrollReveal>
```

### 2. Heading + Paragraph
```jsx
<ScrollReveal animation={fadeInUp}>
  <div className="text-center mb-12">
    <h2 className="text-4xl font-bold mb-4">Heading</h2>
    <p className="text-xl text-muted-foreground">Description text</p>
  </div>
</ScrollReveal>
```

### 3. Three-Column Card Grid
```jsx
<StaggerGroup className="grid md:grid-cols-3 gap-8">
  {items.map((item, index) => (
    <StaggerItem key={index}>
      <motion.div whileHover={cardHover}>
        <Card className="p-6">
          {/* Card content */}
        </Card>
      </motion.div>
    </StaggerItem>
  ))}
</StaggerGroup>
```

### 4. Two-Column Layout
```jsx
<div className="grid md:grid-cols-2 gap-12">
  <ScrollReveal animation={fadeInLeft}>
    <img src="..." alt="..." />
  </ScrollReveal>

  <ScrollReveal animation={fadeInRight}>
    <div>
      <h2>Content</h2>
      <p>Description</p>
    </div>
  </ScrollReveal>
</div>
```

### 5. Button with Hover
```jsx
<ScrollReveal delay={0.3}>
  <motion.button
    className="btn-primary"
    whileHover={buttonHover}
  >
    Click Me
  </motion.button>
</ScrollReveal>
```

### 6. FAQ / Accordion List
```jsx
<StaggerGroup staggerDelay={0.1}>
  {faqs.map((faq, index) => (
    <StaggerItem key={index}>
      <AccordionItem>
        {/* Accordion content */}
      </AccordionItem>
    </StaggerItem>
  ))}
</StaggerGroup>
```

---

## 🎨 Animation Presets Quick Reference

| Animation | Use Case | Motion |
|-----------|----------|--------|
| `fadeInUp` | Headings, sections | 60px up + fade |
| `fadeInUpSubtle` | Paragraphs, small text | 30px up + fade |
| `fadeInScale` | Hero cards, featured | Scale 0.95→1 + fade |
| `fadeInScaleSubtle` | Regular cards | Scale 0.97→1 + fade |
| `fadeInLeft` | Left column content | 40px from left + fade |
| `fadeInRight` | Right column content | 40px from right + fade |

---

## ⚡ Props Quick Reference

### ScrollReveal Props
```jsx
<ScrollReveal
  animation={fadeInUp}      // Animation preset
  delay={0.2}              // Delay in seconds
  className="..."          // CSS classes
>
```

### StaggerGroup Props
```jsx
<StaggerGroup
  className="grid..."      // CSS classes
  staggerDelay={0.15}     // Delay between items (seconds)
  delayChildren={0.1}     // Initial delay (seconds)
>
```

### StaggerItem Props
```jsx
<StaggerItem
  className="..."         // CSS classes
  animation={custom}      // Optional custom animation
>
```

---

## 🎪 Recommended Timing

```jsx
// Section structure
<ScrollReveal>                          // Heading - no delay
  <h2>Title</h2>
</ScrollReveal>

<ScrollReveal delay={0.2}>             // Description - 0.2s delay
  <p>Description</p>
</ScrollReveal>

<StaggerGroup>                          // Content - automatic stagger
  {items}
</StaggerGroup>

<ScrollReveal delay={0.4}>             // CTA - 0.4s delay
  <button>Action</button>
</ScrollReveal>
```

---

## 🎯 Complete Section Template

```jsx
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/animations";
import { fadeInUp, cardHover, buttonHover } from "@/lib/animations";
import { motion } from "framer-motion";

export function YourSection() {
  const items = [...]; // Your data

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <ScrollReveal animation={fadeInUp}>
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              Your Section Title
            </h2>
            <p className="text-xl text-muted-foreground">
              Your description text
            </p>
          </div>
        </ScrollReveal>

        {/* Content Grid */}
        <StaggerGroup className="grid md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <StaggerItem key={index}>
              <motion.div whileHover={cardHover}>
                <Card className="p-6 border-2 border-border">
                  <h3 className="text-2xl font-bold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* CTA Button */}
        <ScrollReveal delay={0.4}>
          <div className="text-center mt-12">
            <motion.button
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold"
              whileHover={buttonHover}
            >
              Learn More
            </motion.button>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
```

---

## 🎨 Stagger Delay Guide

```jsx
// Fast - 6+ items in a grid
<StaggerGroup staggerDelay={0.08}>

// Normal - 3-5 items
<StaggerGroup staggerDelay={0.15}>

// Slow - Premium sections, 2-3 large cards
<StaggerGroup staggerDelay={0.2}>
```

---

## 💡 Pro Tips

### ✅ Good Patterns
```jsx
// Sequential delays for hero
<ScrollReveal>                    {/* Heading */}
<ScrollReveal delay={0.2}>        {/* Subtext */}
<ScrollReveal delay={0.4}>        {/* Button */}

// Staggered grid items
<StaggerGroup>
  <StaggerItem>  {/* Auto stagger */}

// Two-column alternating
<ScrollReveal animation={fadeInLeft}>   {/* Left */}
<ScrollReveal animation={fadeInRight}>  {/* Right */}
```

### ❌ Avoid
```jsx
// DON'T: Too much delay
<ScrollReveal delay={1.5}>  ❌

// DON'T: Nested StaggerGroups
<StaggerGroup>
  <StaggerGroup>  ❌

// DON'T: Delay on every item in StaggerGroup
<StaggerItem>
  <ScrollReveal delay={0.5}>  ❌
```

---

## 🔧 Customization Examples

### Custom Animation
```jsx
const customAnimation = {
  initial: { opacity: 0, y: 100 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 1.2, ease: [0.33, 0.01, 0, 1] },
};

<ScrollReveal animation={customAnimation}>
  <YourComponent />
</ScrollReveal>
```

### Custom Hover
```jsx
const customHover = {
  scale: 1.1,
  rotate: 5,
  transition: { duration: 0.3 },
};

<motion.div whileHover={customHover}>
  <Card />
</motion.div>
```

### Early Trigger
```jsx
import { viewportOptionsEarly } from "@/lib/animations";

<ScrollReveal viewport={viewportOptionsEarly}>
  <Component />  {/* Triggers earlier */}
</ScrollReveal>
```

---

## 📱 Responsive Considerations

```jsx
// Grid that changes columns
<StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Auto-adjusts on mobile */}
</StaggerGroup>

// Adjust stagger for mobile
<StaggerGroup
  staggerDelay={0.1}  // Faster on mobile = better UX
  className="grid..."
>
```

---

## 🚀 Files Reference

- **Animation Library**: `src/lib/animations.js`
- **Components**: `src/components/animations/`
- **Full Guide**: `ANIMATION_GUIDE.md`
- **Examples**: `ANIMATION_EXAMPLES.md`
- **Demo Page**: `/animation-demo`

---

**Quick Start**: Copy a template above → Replace content → Adjust timing → Done! 🎉
