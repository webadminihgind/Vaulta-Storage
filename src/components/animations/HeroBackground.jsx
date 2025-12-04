"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const HeroBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    let connections = [];

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(191, 247, 71, ${this.opacity * 0.6})`;
        ctx.fill();
      }
    }

    // Grid lines
    class GridLine {
      constructor(isVertical) {
        this.isVertical = isVertical;
        if (isVertical) {
          this.x = Math.random() * canvas.width;
          this.offset = Math.random() * 100;
        } else {
          this.y = Math.random() * canvas.height;
          this.offset = Math.random() * 100;
        }
        this.speed = Math.random() * 0.2 + 0.1;
        this.opacity = Math.random() * 0.15 + 0.05;
      }

      update() {
        this.offset += this.speed;
        if (this.offset > 100) this.offset = 0;
      }

      draw() {
        ctx.strokeStyle = `rgba(191, 247, 71, ${this.opacity})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 15]);
        ctx.lineDashOffset = -this.offset;

        ctx.beginPath();
        if (this.isVertical) {
          ctx.moveTo(this.x, 0);
          ctx.lineTo(this.x, canvas.height);
        } else {
          ctx.moveTo(0, this.y);
          ctx.lineTo(canvas.width, this.y);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    // Initialize particles
    const particleCount = 60;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Initialize grid lines
    const gridLines = [];
    for (let i = 0; i < 8; i++) {
      gridLines.push(new GridLine(true)); // vertical
      gridLines.push(new GridLine(false)); // horizontal
    }

    // Animation loop
    const animate = () => {
      // Create fade effect instead of clearing
      ctx.fillStyle = "rgba(10, 15, 28, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update grid lines
      gridLines.forEach((line) => {
        line.update();
        line.draw();
      });

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Draw connections between close particles
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const opacity = (1 - distance / 150) * 0.2;
            ctx.strokeStyle = `rgba(191, 247, 71, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Gradient overlay base */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90" />

      {/* Canvas for particle animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-40"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Radial gradient overlays for depth */}
      <motion.div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(191, 247, 71, 0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(191, 247, 71, 0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-1/4 right-1/3 w-32 h-32 border border-primary/20 rounded-lg"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/4 w-24 h-24 border border-primary/15 rounded-lg"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -8, 0],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 w-20 h-20 border border-primary/10"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 90, 0],
          opacity: [0.05, 0.2, 0.05],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-10" />
    </>
  );
};
