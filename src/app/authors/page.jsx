"use client";

import { Mail, Linkedin, Twitter } from "lucide-react";

const authors = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Storage Solutions Expert",
    bio: "With over 10 years of experience in storage management, Sarah specializes in helping individuals and businesses optimize their storage solutions.",
    avatar: "/assets/vaultalogo.webp",
    posts: 15,
    email: "sarah@vaultastorage.com",
    linkedin: "#",
    twitter: "#",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Business Storage Consultant",
    bio: "Michael has helped hundreds of businesses streamline their operations through efficient storage and inventory management strategies.",
    avatar: "/assets/vaultalogo.webp",
    posts: 12,
    email: "michael@vaultastorage.com",
    linkedin: "#",
    twitter: "#",
  },
  {
    id: 3,
    name: "Emma Davis",
    role: "Climate Control Specialist",
    bio: "Emma is an expert in climate-controlled storage solutions, specializing in protecting valuable and sensitive items.",
    avatar: "/assets/vaultalogo.webp",
    posts: 10,
    email: "emma@vaultastorage.com",
    linkedin: "#",
    twitter: "#",
  },
  {
    id: 4,
    name: "David Miller",
    role: "Moving & Relocation Expert",
    bio: "David has coordinated thousands of successful moves and relocations, making him our go-to expert for transitional storage solutions.",
    avatar: "/assets/vaultalogo.webp",
    posts: 8,
    email: "david@vaultastorage.com",
    linkedin: "#",
    twitter: "#",
  },
];

export default function AuthorsPage() {
  return (
    <div className="min-h-screen bg-background animated-gradient">
      <main className="container mx-auto px-4 py-24">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Meet Our <span className="text-gradient-primary">Experts</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our team of storage professionals brings decades of combined experience to help you find the perfect storage solution
          </p>
        </section>

        {/* Authors Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {authors.map((author) => (
            <div
              key={author.id}
              className="bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(191,247,71,0.2)]"
            >
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 rounded-full bg-muted flex-shrink-0 overflow-hidden">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-1">{author.name}</h2>
                  <p className="text-primary font-semibold mb-3">{author.role}</p>
                  <p className="text-muted-foreground mb-4">{author.bio}</p>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <span className="px-3 py-1 bg-primary/10 rounded-full">
                      {author.posts} Articles
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={`mailto:${author.email}`}
                      className="p-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                      aria-label="Email"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                    <a
                      href={author.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={author.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <section className="mt-20 bg-card rounded-2xl border border-border p-8 md:p-12 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Want to Contribute?</h2>
          <p className="text-muted-foreground mb-6">
            We're always looking for storage experts to share their knowledge and insights with our community
          </p>
          <a
            href="mailto:info@vaultastorage.com"
            className="inline-block px-6 py-3  bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Get in Touch
          </a>
        </section>
      </main>
    </div>
  );
}
