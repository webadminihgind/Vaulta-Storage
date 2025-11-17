"use client";

import React from "react";
import Link from "next/link";
import { Instagram, Phone, Mail, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-card/30 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Column 1 - Brand & Description */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <img
                src="/assets/vaultalogo.webp"
                alt="Vaulta Storage Logo"
                className="h-16 w-auto mb-4"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Intelligent and scalable storage solutions for your business and personal needs.
              Secure, accessible, and designed with you in mind.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com/vaultastorage"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/97142585754"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-foreground mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/company" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Our Story
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Company */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-foreground mb-4 text-lg">Company</h3>
            <ul className="space-y-3">
              
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/authors" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Authors
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div className="lg:col-span-4">
            <h3 className="font-bold text-foreground mb-4 text-lg">Get In Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <address className="text-muted-foreground text-sm not-italic leading-relaxed">
                  7 Al Sagi Street - Al Quoz
                  Al Quoz Industrial Area 3<br />
                  Dubai, United Arab Emirates
                </address>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="tel:+97142585754"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  +971 4 258 5754
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:info@vaultastorage.com"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  info@vaultastorage.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Vaulta Storage. All rights reserved.
          </p>
          
        </div>
      </div>
    </footer>
  );
};
