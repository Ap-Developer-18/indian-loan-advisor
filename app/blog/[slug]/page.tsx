import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, User, Tag, BookOpen } from "lucide-react";
import { BLOG_POSTS } from "@/utils/blogs";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";

function ScrollToTop() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `window.scrollTo({ top: 0, behavior: 'instant' });`,
      }}
    />
  );
}

interface Props {
  params: Promise<{ slug: string }>;
}

function renderContent(content: string) {
  const blocks = content
    .split("\n\n")
    .map((b) => b.trim())
    .filter(Boolean);

  return blocks.map((block, i) => {
    const isHeading = block.length < 60 && !block.endsWith(".");
    if (isHeading) {
      return (
        <h3
          key={i}
          className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mt-8 mb-2"
        >
          {block}
        </h3>
      );
    }
    return (
      <p
        key={i}
        className="sm:text-base text-sm text-foreground/70 leading-relaxed mb-4"
      >
        {block}
      </p>
    );
  });
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const currentPost = BLOG_POSTS.find((p) => p.slug === slug);

  if (!currentPost) {
    notFound();
  }

  const recommendedPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(
    0,
    3,
  );

  return (
    <section id="blog-details">
      <ScrollToTop />
      <Navbar />
      <div className="container py-16 sm:py-24 relative min-h-screen">
        <div className="absolute inset-0 bg-radial-glow pointer-events-none z-0" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="w-full h-64 md:h-100 rounded-xl overflow-hidden border border-gray-2 shadow-2xl">
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
              <h1 className="text-xl md:text-3xl lg:text-5xl font-extrabold text-foreground leading-tight">
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

            <div>{renderContent(currentPost.content)}</div>

            <div className="flex items-center justify-between p-4 bg-gray-1/40 border border-gray-2 rounded-2xl mt-12">
              <span className="text-xs text-muted flex items-center gap-2">
                <Tag className="size-3.5 text-brand" /> Tags: Loans, Advisory,
                Finance
              </span>
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-4 lg:sticky lg:top-20">
            <h4 className="text-base font-bold text-muted flex items-center gap-2">
              <BookOpen className="size-3.5 text-brand" /> Recommended Reads
            </h4>

            {recommendedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex gap-4 items-start p-4 rounded-2xl border border-gray-2 bg-background/50 hover:border-brand/30 hover:bg-brand-muted/10 transition-all duration-200 group"
              >
                <div className="shrink-0 w-20 h-20 rounded-xl overflow-hidden border border-gray-2">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col gap-1.5 min-w-0">
                  <span className="text-xs font-semibold text-brand">
                    {post.category}
                  </span>
                  <h5 className="text-sm font-bold text-foreground leading-snug line-clamp-2 group-hover:text-brand transition-colors">
                    {post.title}
                  </h5>
                  <div className="flex items-center gap-3 text-xs text-muted mt-auto">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" /> {post.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </aside>
        </div>
      </div>
      <Footer />
    </section>
  );
}
