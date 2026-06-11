"use client";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, TrendingUp } from "lucide-react";
import { BLOG_POSTS } from "@/utils/blogs";
import SectionHeader from "@/components/common/section-header";

export default function BlogListingPage() {
  return (
    <section id="blog-section" className="container py-24 relative">
      <div className="absolute size-200 -left-100 inset-0 bg-radial-glow pointer-events-none z-0" />
      <div className="relative z-10 space-y-6 lg:space-y-12">
        <SectionHeader
          alignment="left"
          badgeText="Insights & Knowledge"
          badgeIcon={TrendingUp}
          title="Financial Advisory Corner"
          subtitle="Read financial insights, tips, and loan strategies compiled by senior advisors at Indian Loan Advisor, Faridabad."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col h-full rounded-xl border border-gray-2 bg-background/60 backdrop-blur-sm overflow-hidden hover:border-brand/40 transition-all duration-300 shadow-xl hover:shadow-brand/5"
            >
              <div className="relative h-48 w-full overflow-hidden bg-gray-1">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-background border border-gray-2 text-brand flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-brand" />
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col grow justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-xs text-muted">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3.5" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3.5" /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold line-clamp-2 text-foreground group-hover:text-brand transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand group-hover:text-foreground transition-colors pt-2 self-start cursor-pointer"
                >
                  Read Full Article{" "}
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
