"use client";

import { Shield, Lock, Eye, FileText, Users, Mail } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background animated-gradient">
      <main className="container mx-auto px-4 py-24">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Last updated: November 15, 2024
          </p>
        </section>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl p-8 md:p-12 border border-border space-y-8">
            {/* Introduction */}
            <section>
              <p className="text-muted-foreground">
                At Vaulta Storage, we are committed to protecting your privacy and ensuring the security
                of your personal information. This Privacy Policy explains how we collect, use, disclose,
                and safeguard your information when you use our services or visit our website.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">Information We Collect</h2>
                </div>
              </div>

              <div className="ml-16 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
                  <p className="text-muted-foreground">
                    We may collect personal information that you provide to us, including but not limited to:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                    <li>Name, email address, and phone number</li>
                    <li>Billing and payment information</li>
                    <li>Physical address and contact details</li>
                    <li>Account credentials and preferences</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Usage Information</h3>
                  <p className="text-muted-foreground">
                    We automatically collect certain information about your device and how you interact
                    with our website, including IP address, browser type, pages visited, and access times.
                  </p>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">How We Use Your Information</h2>
                </div>
              </div>

              <div className="ml-16">
                <p className="text-muted-foreground mb-3">We use the information we collect to:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Provide, maintain, and improve our storage services</li>
                  <li>Process your transactions and manage your account</li>
                  <li>Send you important notifications about your storage unit</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Send marketing communications (with your consent)</li>
                  <li>Detect, prevent, and address fraud or security issues</li>
                  <li>Comply with legal obligations and enforce our terms</li>
                </ul>
              </div>
            </section>

            {/* Data Security */}
            <section>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">Data Security</h2>
                </div>
              </div>

              <div className="ml-16">
                <p className="text-muted-foreground">
                  We implement appropriate technical and organizational security measures to protect your
                  personal information against unauthorized access, alteration, disclosure, or destruction.
                  These measures include:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-3 space-y-2">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication protocols</li>
                  <li>Employee training on data protection</li>
                  <li>24/7 surveillance and monitoring systems</li>
                </ul>
              </div>
            </section>

            {/* Information Sharing */}
            <section>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">Information Sharing</h2>
                </div>
              </div>

              <div className="ml-16">
                <p className="text-muted-foreground mb-3">
                  We do not sell your personal information. We may share your information only in the
                  following circumstances:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>With service providers who assist us in operating our business</li>
                  <li>When required by law or to protect our legal rights</li>
                  <li>In connection with a business transaction (merger, sale, or acquisition)</li>
                  <li>With your explicit consent</li>
                </ul>
              </div>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <p className="text-muted-foreground mb-3">You have the right to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Access and receive a copy of your personal information</li>
                <li>Request correction of inaccurate or incomplete data</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Object to processing of your personal information</li>
                <li>Request restriction of processing</li>
              </ul>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Cookies and Tracking</h2>
              <p className="text-muted-foreground">
                We use cookies and similar tracking technologies to enhance your experience on our website.
                You can control cookie preferences through your browser settings. Please note that disabling
                cookies may affect the functionality of our website.
              </p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
              <p className="text-muted-foreground">
                Our services are not intended for individuals under the age of 18. We do not knowingly
                collect personal information from children. If you believe we have collected information
                from a child, please contact us immediately.
              </p>
            </section>

            {/* Changes to Policy */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. We will notify you of any significant
                changes by posting the new policy on this page and updating the "Last updated" date. We
                encourage you to review this policy periodically.
              </p>
            </section>

            {/* Contact */}
            <section className="bg-muted/30 rounded-xl p-6 border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">Contact Us</h2>
                  <p className="text-muted-foreground mb-4">
                    If you have any questions about this Privacy Policy or our data practices, please
                    contact us:
                  </p>
                  <div className="space-y-2 text-muted-foreground">
                    <p>
                      <span className="font-semibold">Email:</span> info@vaultastorage.com
                    </p>
                    <p>
                      <span className="font-semibold">Phone:</span> +971 4 258 5754
                    </p>
                    <p>
                      <span className="font-semibold">Address:</span> 72 6B Street, Al Quoz Industrial
                      Area 3, Dubai, UAE
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
