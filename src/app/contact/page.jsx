"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/animations/StaggerGroup";
import { fadeInUp, buttonHover } from "@/lib/animations";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const formData = Object.fromEntries(data.entries());

    // Example: show a toast
    toast({
      title: "Message Sent",
      description: `Thanks ${formData.name}, we'll get back to you soon!`,
    });

    // Reset form
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-background animated-gradient">
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <ScrollReveal animation={fadeInUp}>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-center">
                Contact <span className="text-primary">Us</span>
              </h1>
              <p className="text-xl text-muted-foreground text-center mb-12">
                Get in touch with our team. We're here to help.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <form onSubmit={handleSubmit}>
                <StaggerGroup className="space-y-6" staggerDelay={0.1}>
                  <StaggerItem>
                    <div>
                      <Input
                        name="name"
                        placeholder="Your Name"
                        className="bg-card border-border"
                        required
                      />
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        className="bg-card border-border"
                        required
                      />
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div>
                      <Input
                        name="phone"
                        type="tel"
                        placeholder="Phone Number"
                        className="bg-card border-border"
                      />
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div>
                      <Textarea
                        name="message"
                        placeholder="Your Message"
                        rows={6}
                        className="bg-card border-border"
                        required
                      />
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <motion.div whileHover={buttonHover}>
                      <Button
                        type="submit"
                        className="w-full  bg-gradient-to-r from-primary to-accent text-primary-foreground hover:bg-primary/90"
                        size="lg"
                      >
                        Send Message
                      </Button>
                    </motion.div>
                  </StaggerItem>
                </StaggerGroup>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
