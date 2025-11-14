"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

const SmoothScrollWrapper = ({ children }) => {
  const scrollRef = useRef(null);
  const scrollInstance = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    // Small delay to allow page transition to complete
    const initTimeout = setTimeout(() => {
      // Destroy previous instance if exists
      if (scrollInstance.current) {
        scrollInstance.current.destroy();
      }

      // Initialize Locomotive Scroll
      if (scrollRef.current) {
        scrollInstance.current = new LocomotiveScroll({
          el: scrollRef.current,
          smooth: true,
          multiplier: 1,
          inertia: 0.8,
          smoothMobile: false, // Disable on mobile for better performance
          resetNativeScroll: true,
          tablet: {
            smooth: false,
          },
          smartphone: {
            smooth: false,
          },
        });

        // Scroll to top on route change
        scrollInstance.current.scrollTo(0, {
          duration: 0,
          disableLerp: true,
        });
      }
    }, 100);

    // Update scroll on window resize
    const handleResize = () => {
      if (scrollInstance.current) {
        scrollInstance.current.update();
      }
    };
    
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(initTimeout);
      if (scrollInstance.current) {
        scrollInstance.current.destroy();
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [pathname]);

  return (
    <div data-scroll-container ref={scrollRef} className="will-change-scroll">
      {children}
    </div>
  );
};

export default SmoothScrollWrapper;
