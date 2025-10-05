import Header from "@/landing/Header";
import Hero from "@/landing/Hero";

function Landing() {
  return (
    <>
      <Header />
      <main className="flex h-full flex-col">
        <Hero />
      </main>
    </>
  );
}

export default Landing;
