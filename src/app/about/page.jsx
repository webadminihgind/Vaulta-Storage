
import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              About <span className="text-primary">VaultaStorage</span>
            </h1>
            
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                VaultaStorage is Dubai's premier storage solution provider, offering
                secure, climate-controlled storage facilities for both personal and
                business needs.
              </p>
              
              <p>
                Founded with a mission to simplify storage, we've helped hundreds of
                clients safely store their valuables, from everyday household items to
                precious art collections and business inventory.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                Why Choose Us?
              </h2>

              <ul className="space-y-3 list-disc list-inside">
                <li>24/7 security monitoring and access</li>
                <li>Climate-controlled facilities</li>
                <li>Flexible storage options from 15 to 100+ sq ft</li>
                <li>Free packing, pick-up, and delivery services</li>
                <li>Professional staff and concierge services</li>
                <li>Competitive pricing with transparent contracts</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                Our Location
              </h2>

              <address className="not-italic">
                72 6B, Street<br />
                Al Quoz<br />
                Al Quoz Industrial Area 3<br />
                Dubai, UAE
              </address>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
