"use client";

import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const LocationMap = () => {
  return (
    <section className="py-16 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Visit Our <span className="text-primary">Location</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find us easily and visit our state-of-the-art storage facility
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Map Container */}
          <div className="rounded-xl overflow-hidden border-2 border-border shadow-lg h-[400px] lg:h-[500px]">
            {/* <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.4977050004985!2d55.27493731501204!3d25.276987183863587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s&maptype=roadmap"
              width="100%"
              height="100%"
              style={{ 
                border: 0,
                filter: "invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)"
              }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="dark:invert dark:hue-rotate-180 dark:brightness-95 dark:contrast-90"
            /> */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.281558389189!2d55.21688877537955!3d25.12617017775671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5c118d1148a7%3A0x43a6911c0ddcc3d7!2sMetroplus%20Advertising%20LLC!5e0!3m2!1sen!2sae!4v1763214656773!5m2!1sen!2sae"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Address</h3>
                  <p className="text-muted-foreground">
                    7 Al Sagi Street - Al Quoz<br />
                    Al Quoz Industrial Area 3<br />
                    Dubai, United Arab Emirates
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Phone</h3>
                  <p className="text-muted-foreground">
                    <a href="tel:+97142585754" className="hover:text-primary transition-colors">
                      +971 4 258 5754
                    </a>
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Available 24/7 for emergencies
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Email</h3>
                  <p className="text-muted-foreground">
                    <a href="mailto:info@vaultastorage.com" className="hover:text-primary transition-colors">
                      info@vaultastorage.com
                    </a>
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    We'll respond within 24 hours
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Business Hours</h3>
                  <div className="space-y-1 text-muted-foreground">
                    <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                    <p>Saturday: 9:00 AM - 6:00 PM</p>
                    <p>Sunday: 10:00 AM - 4:00 PM</p>
                    <p className="text-primary text-sm font-semibold mt-2">
                      24/7 Access for Members
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-accent/5 p-6 rounded-xl border border-primary/30">
              <h3 className="text-lg font-semibold mb-2">Getting Here</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Easily accessible from major highways with ample parking space for trucks and vans.
              </p>
              <a
                href="https://www.google.com/maps/dir//Dubai+United+Arab+Emirates"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-semibold"
              >
                <MapPin className="w-4 h-4" />
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
