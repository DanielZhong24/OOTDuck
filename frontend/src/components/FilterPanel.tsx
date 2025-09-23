import type { FilterState } from "./FilterComponent";
import { useState } from "react";
import { X } from "lucide-react";
import { harmonyData } from './harmonyData';

interface FilterPanelProps {
    filters: FilterState;
    setFilters: (filters: FilterState) => void;
    colors: { name: string; value: string; bg: string }[];
    seasons: { name: string; value: string }[];
    onClose: () => void;
}

export default function FilterPanel({ filters, setFilters, colors, seasons, onClose }: FilterPanelProps) {
    const [activeTab, setActiveTab] = useState<'colors' | 'seasons'>('colors');

    const toggleColor = (value: string) => {
        const newColors = filters.colors.includes(value)
            ? filters.colors.filter(c => c !== value)
            : [...filters.colors, value].slice(0, 2);
        setFilters({ ...filters, colors: newColors });
    };

    const toggleSeason = (value: string) => {
        setFilters({ ...filters, seasons: filters.seasons.includes(value) ? [] : [value] });
    };

    const setColorMode = (mode: 'specific' | 'harmony') => {
        setFilters({
            ...filters,
            colorMode: mode,
            colors: mode === 'harmony' ? [] : filters.colors,
            colorHarmony: mode === 'harmony' ? null : filters.colorHarmony,
        });
    };

    const setColorHarmony = (harmony: FilterState['colorHarmony']) => {
        setFilters({ ...filters, colorHarmony: harmony });
    };

    const clearAll = () => {
        setFilters({ colors: [], seasons: [], colorMode: 'harmony', colorHarmony: null });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="w-11/12 max-w-sm bg-white rounded-2xl p-6 flex flex-col space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-800">Filter</h3>
                    <X onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer" />
                </div>

                <div className="flex border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('colors')}
                        className={`flex-1 py-2 font-medium transition-all text-sm relative ${activeTab === 'colors' ? 'text-gray-900' : 'text-gray-500'}`}
                    >
                        Colors
                        {activeTab === 'colors' && (
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500"></span>
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('seasons')}
                        className={`flex-1 py-2 font-medium transition-all text-sm relative ${activeTab === 'seasons' ? 'text-gray-900' : 'text-gray-500'}`}
                    >
                        Seasons
                        {activeTab === 'seasons' && (
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500"></span>
                        )}
                    </button>
                </div>

                {activeTab === 'colors' && (
                    <div className="flex flex-col space-y-4">
                        <div className="flex space-x-1 p-1 rounded-full">
                            <button
                                onClick={() => setColorMode('harmony')}
                                className={`flex-1 py-1 rounded-full text-xs font-medium transition-all ${filters.colorMode === 'harmony' ? 'bg-gray-200 text-gray-800' : 'text-gray-500 hover:bg-gray-100'}`}
                            >
                                AI Suggestion
                            </button>
                            <button
                                onClick={() => setColorMode('specific')}
                                className={`flex-1 py-1 rounded-full text-xs font-medium transition-all ${filters.colorMode === 'specific' ? 'bg-gray-200 text-gray-800' : 'text-gray-500 hover:bg-gray-100'}`}
                            >
                                Custom
                            </button>
                        </div>

                        {filters.colorMode === 'harmony' && (
                            <div className="flex flex-col space-y-2">
                                {Object.keys(harmonyData).map(key => {
                                    const { label, description } = harmonyData[key];
                                    return (
                                        <button
                                            key={key}
                                            onClick={() => setColorHarmony(key as any)}
                                            className={`flex flex-col items-start p-3 rounded-md transition-all ${filters.colorHarmony === key ? 'bg-amber-100' : 'bg-gray-50 hover:bg-gray-100'}`}
                                        >
                                            <span className={`text-sm font-medium ${filters.colorHarmony === key ? 'text-amber-800' : 'text-gray-700'}`}>
                                                {label}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {description}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {filters.colorMode === 'specific' && (
                            <div className="flex justify-center">
                                <div className="grid grid-cols-4 gap-3">
                                    {colors.map(c => (
                                        <button
                                            key={c.value}
                                            onClick={() => toggleColor(c.value)}
                                            className={`h-12 w-12 rounded-full transition-all duration-200 ${c.bg} ${filters.colors.includes(c.value) ? 'ring-2 ring-offset-2 ring-amber-500' : 'hover:scale-105'}`}
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

                {activeTab === 'seasons' && (
                    <div className="grid grid-cols-2 gap-2">
                        {seasons.map(s => (
                            <button
                                key={s.value}
                                onClick={() => toggleSeason(s.value)}
                                className={`flex items-center justify-center py-2 px-4 rounded-md transition-all ${filters.seasons.includes(s.value) ? 'bg-amber-100 text-amber-800' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
                            >
                                <span className="text-sm font-medium">{s.name}</span>
                            </button>
                        ))}
                    </div>
                )}

                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                    <button
                        onClick={clearAll}
                        className="flex-1 py-2 text-gray-500 font-medium rounded-md hover:text-gray-700 transition-colors"
                    >
                        Clear All
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 py-2 bg-amber-500 text-white font-medium rounded-md hover:bg-amber-600 transition-all"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
}