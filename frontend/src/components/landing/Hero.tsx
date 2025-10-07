import heroImg from "../../assets/hero.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      style={{ height: "calc(100vh - 80px)" }}
      className="flex items-center justify-center pb-6"
    >
      <div className="relative size-full px-7 text-center">
        <img className="size-full rounded-3xl object-cover" src={heroImg} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-y-8 text-white">
          <h1 className="text-4xl font-bold lg:text-5xl xl:text-6xl 2xl:text-7xl">
            Need an outfit <br /> for today?
          </h1>
          <Button className="text-md cursor-pointer bg-amber-500 px-4 py-5 hover:bg-amber-700">
            <Link to="/login">Get Started</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
