import type { FilterState } from "./FilterComponent";
import { useState } from "react";
import { X } from "lucide-react";
import { harmonyData } from "./harmonyData";

interface FilterPanelProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  colors: { name: string; value: string; bg: string }[];
  seasons: { name: string; value: string }[];
  onClose: () => void;
}

export default function FilterPanel({
  filters,
  setFilters,
  colors,
  seasons,
  onClose,
}: FilterPanelProps) {
  const [activeTab, setActiveTab] = useState<"colors" | "seasons">("colors");

  const toggleColor = (value: string) => {
    const newColors = filters.colors.includes(value)
      ? filters.colors.filter((c) => c !== value)
      : [...filters.colors, value].slice(0, 2);
    setFilters({ ...filters, colors: newColors });
  };

  const toggleSeason = (value: string) => {
    setFilters({
      ...filters,
      seasons: filters.seasons.includes(value) ? [] : [value],
      colorHarmony: null,
      colorMode: "specific",
    });
  };

  const setColorMode = (mode: "specific" | "harmony") => {
    setFilters({
      ...filters,
      colorMode: mode,
      colors: mode === "harmony" ? [] : filters.colors,
      seasons: mode === "harmony" ? [] : filters.seasons,
      colorHarmony: mode === "harmony" ? filters.colorHarmony : null,
    });
  };

  const setColorHarmony = (harmony: FilterState["colorHarmony"]) => {
    setFilters({ ...filters, colorHarmony: harmony, colors: [], seasons: [] });
  };

  const clearAll = () => {
    setFilters({ colors: [], seasons: [], colorMode: "harmony", colorHarmony: null });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="flex w-11/12 max-w-sm flex-col space-y-6 rounded-2xl bg-white p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-800">Filter</h3>
          <X
            onClick={onClose}
            className="cursor-pointer text-gray-400 transition-colors hover:text-gray-600"
          />
        </div>

        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("colors")}
            className={`relative flex-1 py-2 text-sm font-medium transition-all ${activeTab === "colors" ? "text-gray-900" : "text-gray-500"}`}
          >
            Colors
            {activeTab === "colors" && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-amber-500"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("seasons")}
            className={`relative flex-1 py-2 text-sm font-medium transition-all ${activeTab === "seasons" ? "text-gray-900" : "text-gray-500"}`}
          >
            Seasons
            {activeTab === "seasons" && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-amber-500"></span>
            )}
          </button>
        </div>

        {activeTab === "colors" && (
          <div className="flex flex-col space-y-4">
            <div className="flex space-x-1 rounded-full p-1 bg-gray-100">
              <button
                onClick={() => setColorMode("harmony")}
                className={`flex-1 rounded-full py-1 text-xs font-medium transition-all ${filters.colorMode === "harmony" ? "bg-gray-200 text-gray-800" : "text-gray-500 hover:bg-gray-100"}`}
              >
                AI Suggestion
              </button>
              <button
                onClick={() => setColorMode("specific")}
                className={`flex-1 rounded-full py-1 text-xs font-medium transition-all ${filters.colorMode === "specific" ? "bg-gray-200 text-gray-800" : "text-gray-500 hover:bg-gray-100"}`}
              >
                Custom
              </button>
            </div>

            {filters.colorMode === "harmony" && (
              <div className="flex flex-col space-y-2">
                {Object.keys(harmonyData).map((key) => {
                  const { label, description } = harmonyData[key];
                  return (
                    <button
                      key={key}
                      onClick={() => setColorHarmony(key as any)}
                      className={`flex flex-col items-start rounded-md p-3 transition-all ${filters.colorHarmony === key ? "bg-amber-100" : "bg-gray-50 hover:bg-gray-100"}`}
                    >
                      <span
                        className={`text-sm font-medium ${filters.colorHarmony === key ? "text-amber-800" : "text-gray-700"}`}
                      >
                        {label}
                      </span>
                      <span className="text-xs text-gray-500">{description}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {filters.colorMode === "specific" && (
              <div className="flex justify-center">
                <div className="grid grid-cols-4 gap-3">
                  {colors.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => toggleColor(c.value)}
                      className={`h-12 w-12 rounded-full transition-all duration-200 ${c.bg} ${filters.colors.includes(c.value) ? "ring-2 ring-amber-500 ring-offset-2" : "hover:scale-105"}`}
                      aria-label={c.name}
                    >
                      <span className="sr-only">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "seasons" && (
          <div className="grid grid-cols-2 gap-2">
            {seasons.map((s) => (
              <button
                key={s.value}
                onClick={() => toggleSeason(s.value)}
                className={`flex items-center justify-center rounded-md px-4 py-2 transition-all ${filters.seasons.includes(s.value) ? "bg-amber-100 text-amber-800" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}`}
              >
                <span className="text-sm font-medium">{s.name}</span>
              </button>
            ))}
          </div>
        )}

        <div className="flex space-x-3 border-t border-gray-200 pt-4">
          <button
            onClick={clearAll}
            className="flex-1 rounded-md py-2 font-medium text-gray-500 transition-colors hover:text-gray-700"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="flex-1 rounded-md bg-amber-500 py-2 font-medium text-white transition-all hover:bg-amber-600"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
