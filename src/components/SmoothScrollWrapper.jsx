"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

const SmoothScrollWrapper = ({ children }) => {
  const scrollRef = useRef(null);
  const scrollInstance = useRef(null);
  const pathname = usePathname(); // replaces useLocation

  useEffect(() => {
    // Destroy previous instance if exists
    if (scrollInstance.current) {
      scrollInstance.current.destroy();
    }

    // Initialize Locomotive Scroll
    scrollInstance.current = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1,
      inertia: 0.8,
    });

    // Update scroll on window resize
    const handleResize = () => scrollInstance.current.update();
    window.addEventListener("resize", handleResize);

    return () => {
      if (scrollInstance.current) scrollInstance.current.destroy();
      window.removeEventListener("resize", handleResize);
    };
  }, [pathname]); // re-run when route changes

  return (
    <div data-scroll-container ref={scrollRef}>
      {children}
    </div>
  );
};

export default SmoothScrollWrapper;
