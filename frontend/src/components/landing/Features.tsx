import feature1 from "../../assets/feature1.jpg";
import feature2 from "../../assets/feature2.jpg";
import { Check } from "lucide-react";

function Features() {
  return (
    <section
      id="features"
      className="mx-auto my-12 md:max-w-[60rem] lg:max-w-[75rem] 2xl:max-w-[90rem]"
    >
      <div className="flex flex-col space-y-18 px-4 pb-12 md:flex-row md:items-center md:justify-evenly md:space-y-0 lg:justify-between">
        <div className="sm:max-w-[70%] md:max-w-[40%] lg:max-w-[45%] xl:max-w-[40%]">
          <div className="flex h-full flex-col space-y-6">
            <h3 className="text-2xl sm:text-3xl lg:leading-12 xl:text-5xl xl:leading-14">
              A Digital Closet made for you on any of your devices
            </h3>
            <p className="text-md mb-14 lg:text-base xl:text-lg">
              Ever wanted easy access to your closet right in the palm of your hands?
              OOTDuck simplifies the process of choosing your outfit for the day.
            </p>
            <div>
              <ul className="space-y-6">
                <li className="flex items-center gap-2 text-sm xl:text-base">
                  <Check className="h-5 w-5" />
                  Randomize clothes completely
                </li>
                <li className="flex items-center gap-2 text-sm xl:text-base">
                  <Check className="h-5 w-5" />
                  Randomize clothes by filter
                </li>
                <li className="flex items-center gap-2 text-sm xl:text-base">
                  <Check className="h-5 w-5" />
                  Upload any pieces of clothing you own
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="h-[75vh] object-cover lg:w-[25rem] xl:h-[85vh] xl:w-[35rem] 2xl:h-[85vh] 2xl:w-[45rem]">
          <img src={feature1} className="size-full object-cover" />
        </div>
      </div>
      <div className="flex flex-col space-y-18 px-4 pb-12 md:flex-row md:items-center md:justify-evenly md:space-y-0 lg:justify-between">
        <div className="h-[75vh] object-cover lg:w-[25rem] xl:h-[85vh] xl:w-[35rem] 2xl:h-[85vh] 2xl:w-[45rem]">
          <img src={feature2} className="size-full object-cover" />
        </div>
        <div className="sm:max-w-[70%] md:max-w-[40%] lg:max-w-[45%] xl:max-w-[40%]">
          <div className="flex h-full flex-col space-y-6">
            <h3 className="text-2xl sm:text-3xl lg:leading-12 xl:text-5xl xl:leading-14">
              Have complete control to your closet
            </h3>
            <p className="text-md mb-14 lg:text-base xl:text-lg">
              OOTDuck gives you complete control over your digital closet and all the
              clothing that you have uploaded, with the ability to filter, edit, and
              delete them.
            </p>
            <div>
              <ul className="space-y-6">
                <li className="flex items-center gap-2 text-sm xl:text-base">
                  <Check className="h-5 w-5" />
                  See all the clothing you've uploaded
                </li>
                <li className="flex items-center gap-2 text-sm xl:text-base">
                  <Check className="h-5 w-5" />
                  Filter through clothing by type, colour, and season
                </li>
                <li className="flex items-center gap-2 text-sm xl:text-base">
                  <Check className="h-5 w-5" />
                  Edit clothing name and delete them
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
