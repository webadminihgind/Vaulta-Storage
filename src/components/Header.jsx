"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Instagram, Phone, Mail, Sun, Moon } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useTheme } from "next-themes";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-background/95 backdrop-blur-lg border-b border-border shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo & Navigation - Left Side */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <img
                src="/assets/vaultalogo.webp"
                alt="Vaulta Storage Logo"
                sizes="(max-width: 640px) 100vw, 48px"
                className="h-16 w-auto"

              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              
              <Link
                href="/about"
                className="text-foreground hover:text-primary transition-colors"
              >
                About Us
              </Link>
              
              <Link
                href="/contact"
                className="text-foreground hover:text-primary transition-colors"
              >
                Contact Us
              </Link>

            </nav>
          </div>

          {/* Desktop Social Icons & Theme Toggle - Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://instagram.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>

            <a href="tel:+97142585754" className="text-foreground hover:text-primary transition-colors">
              <Phone className="w-5 h-5" />
            </a>

            <a href="mailto:info@vaultastorage.com" className="text-foreground hover:text-primary transition-colors">
              <Mail className="w-5 h-5" />
            </a>

            <a
              href="https://wa.me/97142585754"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors"
            >
              <FaWhatsapp className="w-5 h-5" />
            </a>

            {/* Theme Toggle Button */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors border border-primary/30"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-primary" />
                ) : (
                  <Moon className="w-5 h-5 text-primary" />
                )}
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link
                href="/contact"
                className="px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>

              <Link
                href="/about"
                className="px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>

              <div className="flex items-center justify-between px-3 pt-2 border-t border-border mt-2">
                <div className="flex items-center space-x-4">
                  <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-5 h-5 text-foreground hover:text-primary" />
                  </a>

                  <a href="tel:+97142585754">
                    <Phone className="w-5 h-5 text-foreground hover:text-primary" />
                  </a>

                  <a href="mailto:info@vaultastorage.com">
                    <Mail className="w-5 h-5 text-foreground hover:text-primary" />
                  </a>

                  <a href="https://wa.me/97142585754" target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp className="w-5 h-5 text-foreground hover:text-primary" />
                  </a>
                </div>

                {/* Mobile Theme Toggle */}
                {mounted && (
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors border border-primary/30"
                    aria-label="Toggle theme"
                  >
                    {theme === "dark" ? (
                      <Sun className="w-5 h-5 text-primary" />
                    ) : (
                      <Moon className="w-5 h-5 text-primary" />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
