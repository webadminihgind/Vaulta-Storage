"use client";

import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const posRef = useRef({ x: -100, y: -100 }); // For smooth animation
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setVisible(true);
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
      // Interpolate cursor position for smooth movement
      posRef.current.x += (mousePos.x - posRef.current.x) * 0.08;
      posRef.current.y += (mousePos.y - posRef.current.y) * 0.08;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${posRef.current.x}px`;
        cursorRef.current.style.top = `${posRef.current.y}px`;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, [mousePos]);

  return (
    <div
      ref={cursorRef}
      className={`pointer-events-none fixed z-50 w-2.5 h-2.5 rounded-full bg-[#BFF747] transition-opacity duration-300
        ${visible ? "opacity-100" : "opacity-0"}`}
      style={{
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default CustomCursor;
