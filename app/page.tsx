import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import About from "@/components/homepage/about-us";
import AssociateBanks from "@/components/homepage/associate-banks";
import Hero from "@/components/homepage/hero";
import Services from "@/components/homepage/our-product";
import Testimonials from "@/components/homepage/testimonial";
import WhyUs from "@/components/homepage/why-us";
import BlogListingPage from "./blog/page";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden min-h-screen bg-background text-foreground">
        <Hero />
        <About />
        <Services />
        <WhyUs />
        <AssociateBanks />
        <BlogListingPage />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
