"use client";

import { Target, Eye, Award, Users, Building2, TrendingUp } from "lucide-react";

export default function CompanyPage() {
  return (
    <div className="min-h-screen bg-background animated-gradient">
      <main className="container mx-auto px-4 py-24">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="text-gradient-primary">Vaulta Storage</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Leading the way in intelligent and scalable storage solutions across Dubai and the UAE
          </p>
        </section>

        {/* Our Story */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
            <div className="bg-card rounded-2xl p-8 md:p-12 border border-border">
              <p className="text-lg text-muted-foreground mb-4">
                Founded in Dubai, Vaulta Storage was born from a simple idea: storage should be smart,
                accessible, and tailored to your unique needs. Whether you're a growing business, a family
                in transition, or someone who values their possessions, we're here to provide storage
                solutions that work for you.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Over the years, we've grown from a single facility to a trusted network of state-of-the-art
                storage locations across the UAE. Our commitment to security, customer service, and innovation
                has made us the preferred choice for thousands of individuals and businesses.
              </p>
              <p className="text-lg text-muted-foreground">
                Today, we continue to evolve, offering climate-controlled units, business storage solutions,
                vehicle storage, and specialized storage for valuable items like art and collectibles.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-card rounded-2xl p-8 border border-border">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground">
                To provide intelligent, secure, and flexible storage solutions that empower our customers
                to live and work with peace of mind. We strive to deliver exceptional service while
                maintaining the highest standards of security and accessibility.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-muted-foreground">
                To be the Middle East's most trusted and innovative storage provider, setting new standards
                for quality, technology, and customer experience. We envision a future where storage is
                seamless, smart, and sustainable.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Excellence</h3>
              <p className="text-muted-foreground">
                We maintain the highest standards in security, cleanliness, and customer service
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Customer First</h3>
              <p className="text-muted-foreground">
                Your needs drive everything we do, from facility design to customer support
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-muted-foreground">
                We continuously evolve with technology to provide smarter storage solutions
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-20">
          <div className="bg-card rounded-2xl p-8 md:p-12 border border-border">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">10+</div>
                <div className="text-muted-foreground">Years of Service</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">5000+</div>
                <div className="text-muted-foreground">Happy Customers</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50,000+</div>
                <div className="text-muted-foreground">Sq Ft of Space</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">24/7</div>
                <div className="text-muted-foreground">Security & Access</div>
              </div>
            </div>
          </div>
        </section>

        {/* Location */}
        <section>
          <div className="bg-card rounded-2xl p-8 md:p-12 border border-border text-center max-w-3xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Visit Our Facility</h2>
            <p className="text-muted-foreground mb-6">
              Located in the heart of Al Quoz Industrial Area, our state-of-the-art facility is easily
              accessible and designed to meet all your storage needs.
            </p>
            <div className="text-lg mb-6">
              <p className="font-semibold mb-2">72 6B Street, Al Quoz Industrial Area 3</p>
              <p className="text-muted-foreground">Dubai, United Arab Emirates</p>
            </div>
            <a
              href="/contact"
              className="inline-block px-6 py-3  bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Contact Us
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
