"use client";

import { Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "5 Tips for Organizing Your Storage Unit",
    excerpt: "Maximize your storage space with these expert organization tips that will save you time and money.",
    author: "Sarah Johnson",
    date: "November 10, 2024",
    category: "Tips & Guides",
    image: "/assets/vaultalogo.webp",
  },
  {
    id: 2,
    title: "Climate-Controlled Storage: Is It Worth It?",
    excerpt: "Learn when climate-controlled storage is essential for protecting your valuable items from damage.",
    author: "Michael Chen",
    date: "November 5, 2024",
    category: "Storage Solutions",
    image: "/assets/vaultalogo.webp",
  },
  {
    id: 3,
    title: "Business Storage Solutions for Growing Companies",
    excerpt: "Discover how professional storage can help your business scale efficiently while reducing overhead costs.",
    author: "Emma Davis",
    date: "October 28, 2024",
    category: "Business",
    image: "/assets/vaultalogo.webp",
  },
  {
    id: 4,
    title: "Moving House? Your Complete Storage Checklist",
    excerpt: "A comprehensive guide to using storage during your move to make the transition smoother.",
    author: "David Miller",
    date: "October 20, 2024",
    category: "Moving",
    image: "/assets/vaultalogo.webp",
  },
  {
    id: 5,
    title: "How to Store Seasonal Items Properly",
    excerpt: "Protect your seasonal decorations, clothing, and equipment with these professional storage tips.",
    author: "Sarah Johnson",
    date: "October 15, 2024",
    category: "Tips & Guides",
    image: "/assets/vaultalogo.webp",
  },
  {
    id: 6,
    title: "The Ultimate Guide to Car Storage in Dubai",
    excerpt: "Everything you need to know about storing your vehicle safely in Dubai's climate.",
    author: "Michael Chen",
    date: "October 8, 2024",
    category: "Vehicle Storage",
    image: "/assets/vaultalogo.webp",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background animated-gradient">
      <main className="container mx-auto px-4 py-24">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Storage <span className="text-gradient-primary">Insights</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expert tips, guides, and insights to help you make the most of your storage solutions
          </p>
        </section>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(191,247,71,0.2)]"
            >
              <div className="aspect-video bg-muted relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                </div>

                <h2 className="text-xl font-bold mb-3 line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Section */}
        <section className="mt-20 bg-card rounded-2xl border border-border p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest storage tips, guides, and exclusive offers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:border-primary"
            />
            <button className="px-6 py-3  bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
              Subscribe
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
