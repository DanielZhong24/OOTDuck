import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Slider from "@/components/landing/Slider";
import Features from "@/components/landing/Features";
import Faq from "@/components/landing/Faq";
import Footer from "@/components/landing/Footer";

function Landing() {
  return (
    <>
      <Header />
      <main className="flex h-full flex-col">
        <Hero />
        <Slider />
        <Features />
        <Faq />
      </main>
      <footer className="bg-amber-500">
        <Footer />
      </footer>
    </>
  );
}

export default Landing;
