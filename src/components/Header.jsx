"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X, Instagram, Phone, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

const storageOptions = [
  {
    label: "For everyday life",
    href: "/storage/everyday",
    image: "/assets/hero-storage.jpg",
    description: "Simple storage for daily items.",
  },
  {
    label: "For business",
    href: "/storage/business",
    image: "/assets/car1.webp",
    description: "Secure space for business inventory.",
  },
  {
    label: "Art storage",
    href: "/storage/art",
    image: "/assets/car2.webp",
    description: "Climate-controlled art protection.",
  },
  {
    label: "Car storage",
    href: "/storage/car",
    image: "/assets/car1.webp",
    description: "Indoor & outdoor car storage.",
  },
  {
    label: "Boat storage",
    href: "/storage/boat",
    image: "/assets/boat.webp",
    description: "Safe storage for boats & marine.",
  },
  {
    label: "Furniture storage",
    href: "/storage/furniture",
    image: "/assets/furniture.webp",
    description: "Large space for furniture.",
  },
  {
    label: "Suitcases storage",
    href: "/storage/suitcases",
    image: "/assets/suitcase.webp",
    description: "Store travel bags securely.",
  },
];

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-background/90 backdrop-blur-lg border-b border-border shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

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

            {/* NEW IMAGE DROPDOWN MENU */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors cursor-pointer">
                <span>Storage Options</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="z-[2000] w-[280px] rounded-lg border bg-popover p-2 shadow-lg"
              >
                {storageOptions.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link
                      href={item.href}
                      className="flex gap-3 p-2 rounded-md hover:bg-muted transition"
                    >
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.label}
                          fill
                          loading="eager" // <-- forces immediate load
                          sizes="(max-width: 640px) 100vw, 48px"
                          className="object-cover rounded-md"
                        />

                      </div>

                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/contact"
              className="text-foreground hover:text-primary transition-colors"
            >
              Contact Us
            </Link>

            <Link
              href="/about"
              className="text-foreground hover:text-primary transition-colors"
            >
              About Us
            </Link>
          </nav>

          {/* Desktop Social Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://instagram.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>

            <a href="tel:+123456789" className="text-foreground hover:text-primary transition-colors">
              <Phone className="w-5 h-5" />
            </a>

            <a href="mailto:info@example.com" className="text-foreground hover:text-primary transition-colors">
              <Mail className="w-5 h-5" />
            </a>

            <a
              href="https://wa.me/123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors"
            >
              <FaWhatsapp className="w-5 h-5" />
            </a>
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
              <div className="flex flex-col space-y-2">
                <div className="text-sm font-semibold text-muted-foreground px-3">
                  Storage Options
                </div>

                {storageOptions.map((option) => (
                  <Link
                    key={option.href}
                    href={option.href}
                    className="px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {option.label}
                  </Link>
                ))}
              </div>

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

              <div className="flex items-center space-x-4 px-3 pt-2">
                <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-5 h-5 text-foreground hover:text-primary" />
                </a>

                <a href="tel:+123456789">
                  <Phone className="w-5 h-5 text-foreground hover:text-primary" />
                </a>

                <a href="mailto:info@example.com">
                  <Mail className="w-5 h-5 text-foreground hover:text-primary" />
                </a>

                <a href="https://wa.me/123456789" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp className="w-5 h-5 text-foreground hover:text-primary" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
