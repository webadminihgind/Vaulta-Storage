"use client";

import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const posRef = useRef({ x: -100, y: -100 });
  const [visible, setVisible] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setVisible(true);

      // Check if hovering over interactive element
      const target = e.target;
      const isInteractive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("[role='button']");
      
      setIsHovering(!!isInteractive);
    };

    const handleMouseLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    let animationFrame;

    const animate = () => {
      // Smooth interpolation
      posRef.current.x += (mousePos.x - posRef.current.x) * 0.15;
      posRef.current.y += (mousePos.y - posRef.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, [mousePos, isHovering]);

  return (
    <div
      ref={cursorRef}
      className={`pointer-events-none fixed z-50 w-2.5 h-2.5 rounded-full transition-all duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      } ${isHovering ? "bg-[#BFF747]/60 shadow-[0_0_10px_#BFF747]" : "bg-[#BFF747]"}`}
      style={{
        left: 0,
        top: 0,
        willChange: "transform",
      }}
    />
  );
};

export default CustomCursor;
