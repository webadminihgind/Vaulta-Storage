"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/Accordion"; // adjust path if needed

export const FAQ = () => {
  const faqs = [
    {
      question: "What sizes of storage units do you offer?",
      answer:
        "We offer a range of sizes from 15 SQ FT to 100 SQ FT, suitable for everything from a few boxes to full apartment contents. Use our size calculator to find the perfect fit for your needs.",
    },
    {
      question: "Is my storage unit climate-controlled?",
      answer:
        "Yes, all our units are climate-controlled to protect your belongings from extreme temperatures and humidity. This is especially important for electronics, furniture, artwork, and documents.",
    },
    {
      question: "Can I access my storage unit 24/7?",
      answer:
        "Yes, we provide 24/7 access to all our storage units. Simply use your personal access code at the secure entrance to access your unit at any time.",
    },
    {
      question: "What security measures do you have in place?",
      answer:
        "Our facility features 24/7 video surveillance, individual unit alarms, secure access codes, on-site security personnel, and well-lit premises to ensure maximum security for your belongings.",
    },
    {
      question: "Do you offer packing and moving services?",
      answer:
        "Yes, we can connect you with professional packing and moving services. We also sell packing supplies including boxes, tape, bubble wrap, and furniture covers at our facility.",
    },
    {
      question: "What items are not allowed in storage?",
      answer:
        "Prohibited items include hazardous materials, flammable liquids, explosives, perishable food, live plants or animals, and illegal items. Contact us if you're unsure about a specific item.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, debit cards, and bank transfers. Payments can be made online through our secure portal or in person at our facility.",
    },
    {
      question: "Can I change my storage unit size?",
      answer:
        "Absolutely! You can upgrade or downgrade your unit size at any time based on availability. Our team will help you with the transfer process.",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about our storage solutions
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border-2 border-border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
