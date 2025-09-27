import { useState } from "react";
import FilterButton from "./FilterButton";
import FilterPanel from "./FilterPanel";

export interface FilterState {
  colors: string[];
  seasons: string[];
  colorMode: "specific" | "harmony" | null;
  colorHarmony: "matching" | "complementary" | "neutral" | null;
}

const colors = [
  { name: "Red", value: "red", bg: "bg-red-500" },
  { name: "Blue", value: "blue", bg: "bg-blue-500" },
  { name: "Green", value: "green", bg: "bg-green-500" },
  { name: "Yellow", value: "yellow", bg: "bg-yellow-400" },
  { name: "Purple", value: "purple", bg: "bg-purple-500" },
  { name: "Pink", value: "pink", bg: "bg-pink-500" },
  { name: "Orange", value: "orange", bg: "bg-orange-500" },
  { name: "Black", value: "black", bg: "bg-gray-900" },
  { name: "White", value: "white", bg: "bg-gray-100 border border-gray-300" },
  { name: "Brown", value: "brown", bg: "bg-amber-800" },
  { name: "Gray", value: "gray", bg: "bg-gray-500" },
  { name: "Beige", value: "beige", bg: "bg-amber-100 border border-amber-200" },
  { name: "Navy", value: "navy", bg: "bg-blue-900" },
];

const seasons = [
  { name: "Spring/Summer", value: "spring/summer" },
  { name: "Fall/Winter", value: "fall/winter" },
  { name: "All Seasons", value: "all seasons" },
];

export default function FilterComponent({
  onFiltersChange,
  isSpinning,
}: {
  onFiltersChange: (filters: FilterState) => void;
  isSpinning?: boolean;
}) {
  const [filters, setFilters] = useState<FilterState>({
    colors: [],
    seasons: [],
    colorMode: "harmony",
    colorHarmony: null,
  });
  const [isOpen, setIsOpen] = useState(false);

  const hasActive =
    filters.colors.length > 0 ||
    filters.seasons.length > 0 ||
    (filters.colorMode === "harmony" && filters.colorHarmony !== null);

  const activeCount =
    filters.colors.length +
    filters.seasons.length +
    (filters.colorMode === "harmony" && filters.colorHarmony !== null ? 1 : 0);

  const handleFiltersChange = (newFilters: FilterState) => {
    const cleanedFilters = {
      ...newFilters,
      colorMode:
        newFilters.colorMode === "harmony" && newFilters.colorHarmony === null
          ? null
          : newFilters.colorMode,
    };

    setFilters(newFilters);
    onFiltersChange(cleanedFilters);
  };

  return (
    <>
      <FilterButton
        hasActive={hasActive}
        activeCount={activeCount}
        isSpinning={isSpinning}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <FilterPanel
          filters={filters}
          setFilters={handleFiltersChange}
          colors={colors}
          seasons={seasons}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
