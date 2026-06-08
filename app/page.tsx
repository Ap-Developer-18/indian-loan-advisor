import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import About from "@/components/homepage/about-us";
import AssociateBanks from "@/components/homepage/associate-banks";
import Hero from "@/components/homepage/hero";
import Services from "@/components/homepage/our-services";
import Testimonials from "@/components/homepage/testimonial";
import WhyUs from "@/components/homepage/why-us";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-background text-foreground">
        <Hero />
        <About />
        <Services />
        <WhyUs />
        <AssociateBanks />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
