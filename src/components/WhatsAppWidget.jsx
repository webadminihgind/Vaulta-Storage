"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { X, Send } from "lucide-react";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  // WhatsApp Business Configuration from environment variables
  const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "97142585754";
  const BUSINESS_NAME = process.env.NEXT_PUBLIC_BUSINESS_NAME || "Vaulta Storage";

  // Pre-defined quick messages
  const quickMessages = [
    "Hi! I'd like to inquire about storage options.",
    "What are your pricing plans?",
    "Do you offer climate-controlled storage?",
    "I need storage for my business. Can you help?",
  ];

  const sendWhatsAppMessage = (text) => {
    const encodedMessage = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
    setIsOpen(false);
    setMessage("");
  };

  const handleSendCustomMessage = () => {
    if (message.trim()) {
      sendWhatsAppMessage(message);
    }
  };

  return (
    <>
      {/* Chat Widget */}
      {isOpen && (
        <div className="whatsapp-widget-popup fixed bottom-24 right-8 w-80 sm:w-96 bg-card border-2 border-primary/30 rounded-2xl shadow-[0_0_40px_rgba(191,247,71,0.3)] animate-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#25D366] to-[#128C7E] p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <FaWhatsapp className="w-8 h-8 text-[#25D366]" />
              </div>
              <div>
                <h3 className="font-bold text-white">{BUSINESS_NAME}</h3>
                <p className="text-xs text-white/80">Typically replies instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-card max-h-96 overflow-y-auto">
            {/* Welcome Message */}
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 mb-4">
              <p className="text-sm text-foreground">
                👋 Hi there! How can we help you today?
              </p>
            </div>

            {/* Quick Message Buttons */}
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground mb-2">Quick messages:</p>
              {quickMessages.map((msg, index) => (
                <button
                  key={index}
                  onClick={() => sendWhatsAppMessage(msg)}
                  className="w-full text-left bg-background hover:bg-primary/10 border border-border hover:border-primary/50 rounded-lg p-3 text-sm transition-all duration-300 hover:scale-[1.02]"
                >
                  {msg}
                </button>
              ))}
            </div>

            {/* Custom Message Input */}
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">Or type your message:</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendCustomMessage()}
                  placeholder="Type a message..."
                  className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                />
                <button
                  onClick={handleSendCustomMessage}
                  disabled={!message.trim()}
                  className="bg-[#25D366] hover:bg-[#128C7E] disabled:bg-muted disabled:cursor-not-allowed text-white rounded-lg p-2 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-background/50 p-3 rounded-b-2xl border-t border-border">
            <p className="text-xs text-center text-muted-foreground">
              Powered by WhatsApp Business
            </p>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`whatsapp-widget-button fixed bottom-8 right-8 w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-lg hover:shadow-[0_0_40px_rgba(37,211,102,0.6)] transition-all duration-300 flex items-center justify-center group ${
          isOpen ? "scale-0" : "scale-100"
        }`}
        aria-label="Open WhatsApp Chat"
      >
        <FaWhatsapp className="w-7 h-7 group-hover:scale-110 transition-transform" />

        {/* Notification Badge (Optional - can show unread count) */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-xs font-bold">1</span>
        </div>

        {/* Ripple Effect */}
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></div>
      </button>

      {/* Tooltip on hover (desktop only) */}
      {!isOpen && (
        <div className="fixed bottom-8 right-28 z-[9998] hidden lg:group-hover:block">
          <div className="bg-card border border-primary/30 rounded-lg px-4 py-2 shadow-lg animate-in">
            <p className="text-sm font-medium text-foreground whitespace-nowrap">
              Chat with us on WhatsApp!
            </p>
          </div>
        </div>
      )}
    </>
  );
}
