import Header from "@/landing/Header";
import Hero from "@/landing/Hero";
import Slider from "@/landing/Slider";
import Features from "@/landing/Features";

function Landing() {
  return (
    <>
      <Header />
      <main className="flex h-full flex-col">
        <Hero />
        <Slider />
        <Features />
      </main>
    </>
  );
}

export default Landing;
