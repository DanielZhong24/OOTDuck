import Header from "@/landing/Header";
import Hero from "@/landing/Hero";
import Slider from "@/landing/Slider";

function Landing() {
  return (
    <>
      <Header />
      <main className="flex h-full flex-col">
        <Hero />
        <Slider />
      </main>
    </>
  );
}

export default Landing;
