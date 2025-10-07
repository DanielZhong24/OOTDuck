import yorku from "../../assets/slider-imgs/Logo_York_University.svg.png";
import queens from "../../assets/slider-imgs/QueensU_Crest.svg.png";
import tmu from "../../assets/slider-imgs/TMU_logo.svg.png";
import waterloo from "../../assets/slider-imgs/University_of_Waterloo_seal.svg.png";
import uoft from "../../assets/slider-imgs/University_of_Toronto-Logo.png";
import mac from "../../assets/slider-imgs/McMaster_University_logo.svg.png";
import laurier from "../../assets/slider-imgs/laurier.png";
import western from "../../assets/slider-imgs/Western_ontario_univ_textlogo.svg.png";

function Slider() {
  const images = [
    { img: yorku, alt: "York university Logo" },
    { img: queens, alt: "Queens university Logo" },
    { img: tmu, alt: "TMU Logo" },
    { img: waterloo, alt: "Waterloo university Logo" },
    { img: uoft, alt: "UofT Logo" },
    { img: mac, alt: "McMaster univeristy logo" },
    { img: laurier, alt: "Wilfrid Laurier University Logo" },
    { img: western, alt: "Western University Logo" },
  ];
  return (
    <>
      <div className="mt-8 mb-5 flex w-full justify-center xl:mt-15">
        <h2 className="text-base text-gray-600">
          Used by students across several different universities in Canada
        </h2>
      </div>
      <div className="mt-10 mb-15 inline-flex w-full flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
        <ul className="animate animate-infinite-scroll flex items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:mx-12">
          <SlideImg images={images} />
        </ul>
        <ul
          aria-hidden="true"
          className="animate animate-infinite-scroll flex items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:mx-12"
        >
          <SlideImg images={images} />
        </ul>
      </div>
    </>
  );
}

function SlideImg({ images }: { images: { img: string; alt: string }[] }) {
  return (
    <>
      {images.map((image, index) => (
        <li key={index}>
          <img className="h-[70px]" src={image.img} alt={image.alt}></img>
        </li>
      ))}
    </>
  );
}

export default Slider;
