import Header from "@/landing/Header";
import Hero from "@/landing/Hero";
import Slider from "@/landing/Slider";
import Features from "@/landing/Features";
import Faq from "@/landing/Faq";

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
    </>
  );
}

export default Landing;
