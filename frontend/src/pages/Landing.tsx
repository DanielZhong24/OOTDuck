import Header from "@/landing/Header";
import Hero from "@/landing/Hero";
import Slider from "@/landing/Slider";
import Features from "@/landing/Features";
import Faq from "@/landing/Faq";
import Footer from "@/landing/Footer";

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
