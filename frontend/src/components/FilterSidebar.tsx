import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Input } from "./ui/input";
import { X } from "lucide-react";

function FilterSidebar({ onClick, isOpen }: { onClick?: () => void; isOpen?: boolean }) {
  const clothingTypes: string[] = [
    "T-SHIRT",
    "SHIRT",
    "CROP TOP",
    "HOODIE",
    "SWEATER",
    "CARDIGAN",
    "TANK TOP",
    "JACKET",
    "JEANS",
    "TROUSERS",
    "SKIRT",
    "SHORTS",
    "LEGGINGS",
    "DRESS",
    "COAT",
    "LEATHER JACKET",
    "DENIM JACKET",
    "PUFFER JACKET",
    "BOMBER JACKET",
    "JUMPSUIT",
    "ROMPER",
    "SUIT",
    "ACTIVEWEAR",
  ];

  const colours: string[] = [
    "BLACK",
    "WHITE",
    "RED",
    "BLUE",
    "GREEN",
    "YELLOW",
    "PINK",
    "PURPLE",
    "ORANGE",
    "BROWN",
    "GRAY",
    "BEIGE",
  ];

  const seasons: string[] = ["SPRING/SUMMER", "FALL/WINTER"];

  return (
    <aside
      className={`fixed top-0 right-0 z-50 flex h-screen w-full flex-col justify-between bg-white p-4 transition-transform duration-300 sm:w-[45%] lg:w-[30%] ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div>
        <div className="flex items-center justify-between border-b-1 pb-4">
          <h1 className="text-xl md:text-2xl xl:text-3xl">Filter</h1>
          <X onClick={onClick} className="size-7 cursor-pointer" />
        </div>
        <Accordion type="single" collapsible>
          <SidebarItem array={clothingTypes} value="Type" />
          <SidebarItem array={colours} value="Colour" />
          <SidebarItem array={seasons} value="Season" />
        </Accordion>
      </div>
      <div className="mb-10 w-full">
        <Button className="w-full rounded-full p-5 bg-amber-500 hover:bg-amber-700">Confirm</Button>
      </div>
    </aside>
  );
}

function SidebarItem({ array, value }: { array: string[]; value: string }) {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger>{value}</AccordionTrigger>
      <AccordionContent className="grid max-h-60 grid-cols-2 gap-2 overflow-y-scroll">
        {array.map((item: string) => (
          <div
            key={item}
            className="md:text-md ml-2 inline-flex items-center space-x-4 text-sm"
          >
            <CheckBox value={item} />
          </div>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}

function CheckBox({ value }: { value: string }) {
  return (
    <>
      <Input
        className="size-auto accent-black"
        type="checkbox"
        value={value}
        id={value}
        name={value}
      />
      <label htmlFor={value}>{value}</label>
    </>
  );
}

export default FilterSidebar;
