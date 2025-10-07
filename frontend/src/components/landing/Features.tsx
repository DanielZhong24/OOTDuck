import feature1 from "../../assets/feature1.jpg";
import feature2 from "../../assets/feature2.jpg";
import { Check } from "lucide-react";

function Features() {
  return (
    <section
      id="features"
      className="mx-auto my-12 lg:max-w-[55rem] xl:max-w-[75rem] 2xl:max-w-[90rem]"
    >
      <div className="flex items-center justify-between pb-12">
        <div className="max-w-[40%]">
          <div className="flex h-full flex-col space-y-6">
            <h3 className="text-2xl leading-14 md:text-4xl xl:text-5xl">
              A Digital Closet made for you on any of your devices
            </h3>
            <p className="text-md mb-14 lg:text-lg">
              Ever wanted easy access to your closet right in the palm of your hands?
              OOTDuck simplifies the process of choosing your outfit for the day.
            </p>
            <div>
              <ul className="space-y-6">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  Randomize clothes completely
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  Randomize clothes by filter
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  Upload any pieces of clothing you own
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="h-[85vh] object-cover xl:w-[35rem]">
          <img src={feature1} className="size-full object-cover" />
        </div>
      </div>
      <div className="flex items-center justify-between pt-12">
        <div className="h-[85vh] object-cover xl:w-[35rem]">
          <img src={feature2} className="size-full object-cover" />
        </div>
        <div className="max-w-[40%]">
          <div className="flex h-full flex-col space-y-6">
            <h3 className="text-2xl leading-14 md:text-4xl xl:text-5xl">
              Have complete control to your closet
            </h3>
            <p className="text-md mb-14 lg:text-lg">
              OOTDuck gives you complete control over your digital closet and all the
              clothing that you have uploaded, with the ability to filter, edit, and
              delete them.
            </p>
            <div className="">
              <ul className="space-y-6">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  Photos page to see all the clothing you've uploaded
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  Filter through clothing by type, colour, and season
                </li>
                <li className="flex items-center gap-2">
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
