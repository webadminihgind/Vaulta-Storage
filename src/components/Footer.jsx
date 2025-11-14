"use client";

import React from "react";
import Link from "next/link";
import { Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1 */}
          <div className="space-y-4">
            <Link href="/blog" className="block text-foreground hover:text-primary transition-colors">
              Blog
              
            </Link>
            <Link href="/authors" className="block text-foreground hover:text-primary transition-colors">
              Authors
            </Link>
            <Link href="/company" className="block text-foreground hover:text-primary transition-colors">
              Company
            </Link>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground mb-4">Contacts</h3>
            <a href="mailto:info@vaultastorage.com" className="block text-muted-foreground hover:text-primary transition-colors">
              info@vaultastorage.com
            </a>
            <a href="tel:+971521179039" className="block text-muted-foreground hover:text-primary transition-colors">
              +971 52 117 9039
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span>Instagram</span>
            </a>
          </div>

          {/* Column 3 */}
          <div className="space-y-2">
            <p className="text-foreground font-semibold">Address</p>
            <address className="text-muted-foreground not-italic">
              72 6B, Street<br />
              Al Quoz<br />
              Al Quoz Industrial Area 3<br />
              Dubai
            </address>
          </div>

          {/* Column 4 - Logo */}
          <div className="flex items-start">
            <Link href="/" className="flex items-center">
              <img src="/assets/vaultalogo.webp" alt="Vaulta Storage Logo" className="h-16 w-auto" />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <p className="text-muted-foreground text-center">©2025 VaultaStorage</p>
        </div>
      </div>
    </footer>
  );
};
