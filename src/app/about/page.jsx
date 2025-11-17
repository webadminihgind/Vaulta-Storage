"use client";

import React from "react";
import { Shield, Clock, Award, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background animated-gradient">
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="text-gradient-primary">Vaulta Storage</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Dubai's premier storage solution provider for all your needs
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-card rounded-2xl p-8 md:p-12 border border-border mb-12">
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                Vaulta Storage is Dubai's premier storage solution provider, offering
                secure, climate-controlled storage facilities for both personal and
                business needs.
              </p>

              <p>
                Founded with a mission to simplify storage, we've helped hundreds of
                clients safely store their valuables, from everyday household items to
                precious art collections and business inventory.
              </p>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Why Choose Us?
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">24/7 Security</h3>
                <p className="text-muted-foreground">
                  Round-the-clock security monitoring and controlled access to ensure your items are safe
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Climate Controlled</h3>
                <p className="text-muted-foreground">
                  Temperature and humidity controlled facilities to protect your valuable items
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Flexible Options</h3>
                <p className="text-muted-foreground">
                  Storage options from 15 to 100+ sq ft with flexible rental terms
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Professional Service</h3>
                <p className="text-muted-foreground">
                  Expert staff and concierge services to assist with all your storage needs
                </p>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="bg-card rounded-2xl p-8 md:p-12 border border-border mb-12">
            <h2 className="text-2xl font-bold mb-6">What We Offer</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>Free packing, pick-up, and delivery services</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>Competitive pricing with transparent contracts</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>Business storage solutions with inventory management</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>Specialized storage for art, vehicles, and valuable items</span>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div className="bg-card rounded-2xl p-8 md:p-12 border border-border text-center">
            <h2 className="text-2xl font-bold mb-6">Visit Our Facility</h2>
            <address className="not-italic text-muted-foreground mb-6">
              72 6B Street, Al Quoz Industrial Area 3<br />
              Dubai, United Arab Emirates
            </address>
            <a
              href="/contact"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Contact Us
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
