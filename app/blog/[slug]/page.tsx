import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  ArrowLeft,
  User,
  Tag,
  MapPin,
  PhoneCall,
  Building,
} from "lucide-react";
import { BLOG_POSTS } from "@/utils/blogs";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const currentPost = BLOG_POSTS.find((p) => p.slug === slug);

  if (!currentPost) {
    notFound();
  }

  return (
    <section className="container py-20 relative min-h-screen">
      <div className="absolute inset-0 bg-radial-glow pointer-events-none z-0" />
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="w-full h-64 md:h-100 rounded-3xl overflow-hidden border border-gray-2 shadow-2xl">
            <img
              src={currentPost.image}
              alt={currentPost.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4 border-b border-gray-2 pb-6">
            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-xs font-bold px-3 py-1 rounded-lg bg-brand-muted border border-brand/20 text-brand">
                {currentPost.category}
              </span>
              <div className="flex items-center gap-4 text-xs text-muted">
                <span className="flex items-center gap-1">
                  <Calendar className="size-3.5" /> {currentPost.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5" /> {currentPost.readTime}
                </span>
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-foreground leading-tight">
              {currentPost.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted">
              <div className="size-7 rounded-full bg-gray-2 flex items-center justify-center text-brand">
                <User className="size-3.5" />
              </div>
              <span>
                Written by{" "}
                <strong className="text-foreground">
                  {currentPost.author}
                </strong>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-1/40 border border-gray-2 rounded-2xl mt-12">
            <span className="text-xs text-muted flex items-center gap-2">
              <Tag className="size-3.5 text-brand" /> Tags: Loans, Advisory,
              Finance
            </span>
          </div>
        </div>

        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
          <div className="rounded-3xl border border-brand/20 bg-linear-to-br from-background to-brand-muted/20 p-6 shadow-xl relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 size-32 bg-brand/5 rounded-full blur-2xl" />

            <h3 className="text-xl font-bold mb-2 text-foreground">
              Need Expert Advice?
            </h3>
            <p className="text-muted text-xs md:text-sm leading-relaxed mb-6">
              Connect directly with our senior advisors in Faridabad for
              stress-free asset profiling.
            </p>
            <div className="space-y-4 text-sm mb-6">
              <div className="flex gap-3 items-start">
                <div className="p-2 bg-brand/10 border border-brand/20 rounded-xl text-brand shrink-0">
                  <MapPin className="size-4" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Our Office</p>
                  <p className="text-xs text-muted">
                    Ganga place, Ajronda Chowk, Sector 20B, Faridabad, Haryana
                    121001
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="p-2 bg-brand/10 border border-brand/20 rounded-xl text-brand shrink-0">
                  <PhoneCall className="size-4" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Call Experts</p>
                  <p className="text-xs text-brand font-bold">
                    +91 8595 332 014
                  </p>
                </div>
              </div>
            </div>

            <a
              href="mailto:info@indianloanadvisor.com"
              className="block text-center w-full bg-brand text-primary-dark font-bold py-3 px-4 rounded-xl text-sm hover:opacity-90 transition-opacity"
            >
              Email Consultation
            </a>
          </div>

          <div className="rounded-3xl border border-gray-2 bg-background/50 p-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted flex items-center gap-2">
              <Building className="size-3.5 text-brand" /> Associated Ecosystem
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              We map transparent lending systems safely over partner commercial
              structures across premium state networks.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
