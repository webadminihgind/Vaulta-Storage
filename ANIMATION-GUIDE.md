# Quick Start: New Animations & Transitions

## 🎬 What's New

### 1. Smooth Page Transitions
Pages now fade in/out with subtle slide and scale effects when navigating.

**Where:** Between all routes (home → storage → booking, etc.)

### 2. Loading Progress Bar
Green animated bar at the top shows loading progress during navigation.

**Color:** Matches brand (#BFF747)

### 3. Enhanced Animations

#### Mobile Menu
- Items animate in with stagger effect (50ms delay between each)
- Smooth open/close transitions

#### Dropdown Menu
- Storage options dropdown fades in with zoom effect
- 200ms duration for smooth appearance

#### Buttons
- Scale up on hover (1.05x)
- Scale down on click (0.98x)
- Smooth transitions with cubic-bezier easing

#### Storage Cards
- Card scales slightly on hover (1.05x)
- Button slides up from bottom when hovering card
- Enhanced shadow effects

#### Custom Cursor
- Follows mouse with smooth interpolation
- Grows and glows when hovering interactive elements
- Hardware accelerated for 60fps

---

## 🎨 Using New Animation Classes

### Fade In
```jsx
<div className="animate-fade-in">Content</div>
```
Fades in with slight upward movement (0.6s duration)

### Slide Up
```jsx
<div className="animate-slide-up">Content</div>
```
Slides up from 20px below (0.5s duration)

### Slide Down
```jsx
<div className="animate-slide-down">Content</div>
```
Slides down from 10px above (0.3s duration)

### Hardware Acceleration
```jsx
<div className="gpu-accelerated">High-performance element</div>
```
Enables GPU acceleration for smooth animations

### Will Change
```jsx
<div className="will-change-transform">Element that will animate</div>
```
Optimizes elements that will be transformed

---

## 🔧 Customization

### Adjust Page Transition Speed
**File:** `src/components/PageTransition.jsx`
```jsx
transition: {
  duration: 0.4, // Change this value (seconds)
  ease: [0.25, 0.1, 0.25, 1],
}
```

### Change Loading Bar Color
**File:** `src/app/globals.css`
```css
#nprogress .bar {
  background: linear-gradient(90deg, #YOUR_COLOR, #YOUR_COLOR);
}
```

### Disable Smooth Scroll on Mobile
**File:** `src/components/SmoothScrollWrapper.jsx`
Already configured - mobile uses native scroll for better performance

### Adjust Custom Cursor Smoothness
**File:** `src/components/CustomCursor.jsx`
```jsx
posRef.current.x += (mousePos.x - posRef.current.x) * 0.15; // Change 0.15
// Lower = smoother but slower
// Higher = faster but less smooth
```

---

## 📱 Mobile Optimizations

### What's Different on Mobile?
1. **No smooth scroll** - Native scroll for better performance
2. **Simplified animations** - Reduced motion for battery life
3. **Touch-optimized** - Larger tap targets, no hover effects

### Testing Mobile
```bash
# Use browser DevTools
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select mobile device
4. Test navigation and animations
```

---

## ⚡ Performance Tips

### Best Practices Implemented
- ✅ Hardware acceleration on animated elements
- ✅ `will-change` properties for smoother animations
- ✅ Debounced resize handlers
- ✅ requestAnimationFrame for smooth cursor
- ✅ CSS transforms instead of position changes
- ✅ Lazy loading preparations

### Monitor Performance
```javascript
// Add to RootClient.jsx for development
useEffect(() => {
  if (process.env.NODE_ENV === 'development') {
    const logFPS = () => {
      let lastTime = performance.now();
      const measureFPS = () => {
        const now = performance.now();
        const fps = Math.round(1000 / (now - lastTime));
        lastTime = now;
        console.log('FPS:', fps);
        requestAnimationFrame(measureFPS);
      };
      measureFPS();
    };
    // logFPS(); // Uncomment to monitor
  }
}, []);
```

---

## 🐛 Troubleshooting

### Animations Not Working?
1. Clear browser cache (Ctrl+Shift+Del)
2. Check console for errors (F12)
3. Verify Framer Motion installed: `npm list framer-motion`

### Loading Bar Not Showing?
- Check if NProgress CSS is imported
- Verify navigation uses Next.js Link component
- Check browser console for NProgress errors

### Smooth Scroll Jerky?
- Reduce `multiplier` in SmoothScrollWrapper config
- Increase `inertia` value for more damping
- Consider disabling on low-end devices

### Custom Cursor Laggy?
- Reduce interpolation value (currently 0.15)
- Check if too many elements have animations
- Verify GPU acceleration is working

---

## 🎯 Next Steps

1. **Test thoroughly** on different devices
2. **Monitor performance** using DevTools
3. **Gather user feedback** on animation speed
4. **Consider A/B testing** different transition speeds
5. **Implement accessibility** features (prefers-reduced-motion)

---

## 📚 Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [NProgress GitHub](https://github.com/rstacruz/nprogress)
- [Locomotive Scroll](https://locomotivemtl.github.io/locomotive-scroll/)
- [Web Animations Performance](https://web.dev/animations/)
