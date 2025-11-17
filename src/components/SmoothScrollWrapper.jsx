"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import "locomotive-scroll/dist/locomotive-scroll.css";

const SmoothScrollWrapper = ({ children }) => {
  const scrollRef = useRef(null);
  const scrollInstance = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    // Small delay to allow page transition to complete
    const initTimeout = setTimeout(async () => {
      // Destroy previous instance if exists
      if (scrollInstance.current) {
        scrollInstance.current.destroy();
      }

      // Dynamically import Locomotive Scroll only on client
      if (scrollRef.current && typeof window !== 'undefined') {
        const LocomotiveScroll = (await import("locomotive-scroll")).default;

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

        // Expose instance globally for manual updates
        window.locomotive = scrollInstance.current;

        // Scroll to top on route change
        scrollInstance.current.scrollTo(0, {
          duration: 0,
          disableLerp: true,
        });

        // Update scroll after content loads
        setTimeout(() => {
          scrollInstance.current.update();
        }, 500);
      }
    }, 100);

    // Update scroll on window resize
    const handleResize = () => {
      if (scrollInstance.current) {
        scrollInstance.current.update();
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      clearTimeout(initTimeout);
      if (scrollInstance.current) {
        scrollInstance.current.destroy();
      }
      if (typeof window !== 'undefined') {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, [pathname]);

  return (
    <div data-scroll-container ref={scrollRef} className="will-change-scroll">
      {children}
    </div>
  );
};

export default SmoothScrollWrapper;
