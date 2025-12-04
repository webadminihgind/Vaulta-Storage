# Animation Implementation Examples

Quick reference for applying premium scroll animations to common component patterns in your React website.

## 🎯 Common Patterns

### Pattern 1: Section with Heading + Content Grid

```jsx
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/animations";
import { fadeInUp, cardHover } from "@/lib/animations";
import { motion } from "framer-motion";

export function FeatureSection() {
  return (
    <section className="py-24">
      {/* Animated Heading */}
      <ScrollReveal animation={fadeInUp}>
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">
            Our Amazing Features
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need in one place
          </p>
        </div>
      </ScrollReveal>

      {/* Staggered Cards */}
      <StaggerGroup className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <StaggerItem key={index}>
            <motion.div whileHover={cardHover}>
              <Card className="p-6">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </Card>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
```

### Pattern 2: Hero Section with Multiple Elements

```jsx
import { ScrollReveal } from "@/components/animations";
import { motion } from "framer-motion";
import { buttonHover } from "@/lib/animations";

export function Hero() {
  return (
    <section className="py-32">
      {/* Main Heading - Animates first */}
      <ScrollReveal>
        <h1 className="text-6xl font-bold mb-6">
          Welcome to the Future
        </h1>
      </ScrollReveal>

      {/* Subheading - Delayed */}
      <ScrollReveal delay={0.2}>
        <p className="text-2xl mb-8">
          Experience premium quality
        </p>
      </ScrollReveal>

      {/* CTA Buttons - More delayed */}
      <ScrollReveal delay={0.4}>
        <div className="flex gap-4">
          <motion.button
            className="btn-primary"
            whileHover={buttonHover}
          >
            Get Started
          </motion.button>
          <motion.button
            className="btn-secondary"
            whileHover={buttonHover}
          >
            Learn More
          </motion.button>
        </div>
      </ScrollReveal>
    </section>
  );
}
```

### Pattern 3: Two-Column Layout

```jsx
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/animations";
import { fadeInLeft, fadeInRight } from "@/lib/animations";

export function TwoColumnSection() {
  return (
    <section className="py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left side - Image */}
        <ScrollReveal animation={fadeInLeft}>
          <img src="/image.jpg" alt="Feature" className="rounded-lg" />
        </ScrollReveal>

        {/* Right side - Content */}
        <ScrollReveal animation={fadeInRight}>
          <div>
            <h2 className="text-4xl font-bold mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg mb-6">
              We provide the best service in the industry
            </p>
            <ul className="space-y-3">
              <li>✓ Feature 1</li>
              <li>✓ Feature 2</li>
              <li>✓ Feature 3</li>
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

### Pattern 4: FAQ Accordion

```jsx
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/animations";

export function FAQ() {
  const faqs = [...];

  return (
    <section className="py-24">
      <ScrollReveal>
        <h2 className="text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
      </ScrollReveal>

      <StaggerGroup className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <StaggerItem key={index}>
            <Accordion>
              <AccordionItem>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
```

### Pattern 5: CTA Section

```jsx
import { ScrollReveal } from "@/components/animations";
import { motion } from "framer-motion";
import { fadeInScale, buttonHover } from "@/lib/animations";

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-r from-primary to-accent">
      <ScrollReveal animation={fadeInScale}>
        <div className="text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of satisfied customers today
          </p>
          <motion.button
            className="btn-white"
            whileHover={buttonHover}
          >
            Start Free Trial
          </motion.button>
        </div>
      </ScrollReveal>
    </section>
  );
}
```

### Pattern 6: Stats/Numbers Section

```jsx
import { StaggerGroup, StaggerItem } from "@/components/animations";
import { motion } from "framer-motion";

export function StatsSection() {
  const stats = [
    { number: "10K+", label: "Customers" },
    { number: "99%", label: "Satisfaction" },
    { number: "24/7", label: "Support" },
    { number: "5★", label: "Rating" },
  ];

  return (
    <section className="py-24 bg-secondary/20">
      <StaggerGroup className="grid md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <StaggerItem key={index}>
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
              <div className="text-5xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-lg text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
```

### Pattern 7: Image Gallery

```jsx
import { StaggerGroup, StaggerItem } from "@/components/animations";
import { motion } from "framer-motion";

export function Gallery() {
  const images = [...];

  return (
    <section className="py-24">
      <ScrollReveal>
        <h2 className="text-4xl font-bold text-center mb-12">
          Our Gallery
        </h2>
      </ScrollReveal>

      <StaggerGroup className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
        {images.map((image, index) => (
          <StaggerItem key={index}>
            <motion.div
              className="relative overflow-hidden rounded-lg"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.4 },
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
```

### Pattern 8: Timeline/Process Steps

```jsx
import { StaggerGroup, StaggerItem } from "@/components/animations";
import { ScrollReveal } from "@/components/animations";
import { fadeInUp } from "@/lib/animations";

export function ProcessTimeline() {
  const steps = [
    { number: 1, title: "Sign Up", description: "..." },
    { number: 2, title: "Configure", description: "..." },
    { number: 3, title: "Launch", description: "..." },
  ];

  return (
    <section className="py-24">
      <ScrollReveal animation={fadeInUp}>
        <h2 className="text-4xl font-bold text-center mb-16">
          How It Works
        </h2>
      </ScrollReveal>

      <StaggerGroup className="max-w-4xl mx-auto" staggerDelay={0.2}>
        {steps.map((step, index) => (
          <StaggerItem key={index}>
            <div className="flex gap-6 mb-12">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                {step.number}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
```

## 🎨 Animation Combination Tips

### 1. Section Structure
```
1. Heading           → fadeInUp, delay: 0
2. Subheading/Desc   → fadeInUp, delay: 0.2
3. Content Grid      → StaggerGroup with items
4. CTA Button        → delay: 0.4 + buttonHover
```

### 2. Card Grid
- Use `StaggerGroup` for container
- Use `StaggerItem` for each card
- Add `whileHover={cardHover}` to each card
- Stagger delay: 0.15s for 3-4 items, 0.08s for 6+ items

### 3. Hero Sections
- Main heading: no delay
- Secondary text: 0.2s delay
- Buttons/CTA: 0.4s delay
- Background/Images: fadeInScale with 0.3s delay

### 4. Alternating Content
- Left side: `fadeInLeft`
- Right side: `fadeInRight`
- Switch directions for each row for visual interest

## 🚀 Quick Copy-Paste Templates

### Heading + Description
```jsx
<ScrollReveal animation={fadeInUp}>
  <div className="text-center mb-16">
    <h2 className="text-5xl font-bold mb-4">Your Heading</h2>
    <p className="text-xl text-muted-foreground">Your description</p>
  </div>
</ScrollReveal>
```

### 3-Column Card Grid
```jsx
<StaggerGroup className="grid md:grid-cols-3 gap-8">
  {items.map((item, i) => (
    <StaggerItem key={i}>
      <motion.div whileHover={cardHover}>
        <Card>{/* Your content */}</Card>
      </motion.div>
    </StaggerItem>
  ))}
</StaggerGroup>
```

### Animated Button
```jsx
<ScrollReveal delay={0.3}>
  <motion.button whileHover={buttonHover}>
    Click Me
  </motion.button>
</ScrollReveal>
```

### Full Section Template
```jsx
<section className="py-24">
  <div className="container mx-auto px-4">
    <ScrollReveal animation={fadeInUp}>
      <h2 className="text-4xl font-bold text-center mb-12">
        Section Title
      </h2>
    </ScrollReveal>

    <StaggerGroup className="grid md:grid-cols-3 gap-8">
      {data.map((item, index) => (
        <StaggerItem key={index}>
          <motion.div whileHover={cardHover}>
            <Card>
              {/* Card content */}
            </Card>
          </motion.div>
        </StaggerItem>
      ))}
    </StaggerGroup>
  </div>
</section>
```

---

**Pro Tip**: Always test your animations on mobile devices and consider users who prefer reduced motion. The animations are set to trigger once for performance, but you can adjust this in the viewport settings.
