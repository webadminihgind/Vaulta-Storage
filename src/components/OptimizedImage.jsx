"use client";

import { useState } from "react";
import Image from "next/image";

export default function OptimizedImage({ src, alt, className = "", ...props }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative overflow-hidden">
      <Image
        src={src}
        alt={alt}
        className={`transition-all duration-500 ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        } ${className}`}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5 animate-pulse" />
      )}
    </div>
  );
}
