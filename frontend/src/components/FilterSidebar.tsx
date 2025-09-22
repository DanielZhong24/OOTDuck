/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, type ChangeEvent } from "react";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Input } from "./ui/input";
import { X } from "lucide-react";

type FilterSidebarProps = {
  onClick?: () => void;
  isOpen?: boolean;
  clothes?: any;
  toggleOpen: () => void;
};

type CheckboxProps = {
  value: string;
  type: string;
  handleCheckboxChange: (
    e: ChangeEvent<HTMLInputElement>,
    category: string,
    value: string,
  ) => void;
  checked: boolean;
};

type SidebarItemProps = {
  arr: string[];
  value: string;
  type: string;
  handleCheckboxChange: (
    e: ChangeEvent<HTMLInputElement>,
    category: string,
    value: string,
  ) => void;
  selectedFilters: { [category: string]: string[] };
};

function FilterSidebar({ onClick, isOpen, clothes, toggleOpen }: FilterSidebarProps) {
  const [selectedFilters, setSelectedFilters] = useState<{
    [category: string]: string[];
  }>({
    Type: [],
    Colour: [],
    Season: [],
  });

  const handleCheckboxChange = (
    e: ChangeEvent<HTMLInputElement>,
    category: string,
    value: string,
  ): void => {
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        [category]: [...prevFilters[category].concat(value.toLowerCase())],
      }));
    } else {
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        [category]: prevFilters[category].filter((item) => item !== value.toLowerCase()),
      }));
    }
  };

  const submitFilters = () => {
    const clothingType = [...selectedFilters.Type];
    const colour = [...selectedFilters.Colour];
    const season = [...selectedFilters.Season];

    const filteredClothes = clothes.filter((item: any) => {
      const typeMatch = clothingType.length ? clothingType.includes(item.type) : item;
      const colourMatch = colour.length ? colour.includes(item.colour) : item;
      const seasonMatch = season.length ? season.includes(item.season) : item;

      return typeMatch && colourMatch && seasonMatch;
    });

    console.log(filteredClothes);
    toggleOpen();
  };

  const clothingTypes: string[] = [
    "T-SHIRT",
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

  const seasons: string[] = ["SPRING/SUMMER", "FALL/WINTER", "ALL SEASONS"];

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
          <SidebarItem
            selectedFilters={selectedFilters}
            handleCheckboxChange={handleCheckboxChange}
            arr={clothingTypes}
            value="Type"
            type="Type"
          />
          <SidebarItem
            selectedFilters={selectedFilters}
            handleCheckboxChange={handleCheckboxChange}
            arr={colours}
            value="Colour"
            type="Colour"
          />
          <SidebarItem
            selectedFilters={selectedFilters}
            handleCheckboxChange={handleCheckboxChange}
            arr={seasons}
            value="Season"
            type="Season"
          />
        </Accordion>
      </div>
      <div className="mb-4 w-full">
        <Button onClick={submitFilters} className="w-full rounded-lg p-6 text-lg">
          Confirm
        </Button>
      </div>
    </aside>
  );
}

function SidebarItem({
  arr,
  value,
  type,
  handleCheckboxChange,
  selectedFilters,
}: SidebarItemProps) {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger>{value}</AccordionTrigger>
      <AccordionContent className="grid max-h-60 grid-cols-2 gap-2 overflow-y-scroll">
        {arr.map((item: any, index: number) => (
          <div
            key={index}
            className="md:text-md ml-2 inline-flex items-center space-x-4 text-sm"
          >
            <CheckBox
              handleCheckboxChange={handleCheckboxChange}
              checked={selectedFilters[type]?.includes(item.toLowerCase())}
              value={item}
              type={type}
            />
          </div>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}

function CheckBox({ value, type, handleCheckboxChange, checked }: CheckboxProps) {
  return (
    <>
      <Input
        className="size-auto accent-black"
        type="checkbox"
        value={value}
        checked={checked}
        onChange={(e) => handleCheckboxChange(e, type, value)}
        id={`${type}-${value}`}
        name={`${type}-${value}`}
      />
      <label htmlFor={`${type}-${value}`}>{value}</label>
    </>
  );
}

export default FilterSidebar;
