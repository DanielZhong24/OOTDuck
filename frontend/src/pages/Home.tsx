/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import RefreshIcon from "~icons/mdi-light/refresh";
import FilterComponent from "@/components/FilterComponent";
import type { FilterState } from "@/components/FilterComponent";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import type { User } from "@supabase/supabase-js";
import failImg from "../assets/fail1.png";

interface ClothingItem {
  id: string;
  color: string;
  type: string;
  img_path: string;
}

interface OutfitData {
  tops: ClothingItem[];
  bottoms: ClothingItem[];
  onepieces: ClothingItem[];
  randomTop: ClothingItem | null;
  randomBottom: ClothingItem | null;
}

const itemHeight = 350;
const bottomItemHeight = 400;

export default function Home() {
  const [outfitData, setOutfitData] = useState<OutfitData | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    colors: [],
    seasons: [],
    colorMode: null,
    colorHarmony: null,
  });
  const { session } = useAuth();
  const user: User | undefined = session?.user;

  const touchStartRef = useRef(0);
  const port = import.meta.env.VITE_BACKEND_ROUTE;

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    fetchData(newFilters, false);
  };

  async function fetchData(
    appliedFilters: FilterState = filters,
    animate: boolean = true,
  ) {
    if (isSpinning) return;

    setIsSpinning(true);
    setShouldAnimate(animate ? false : shouldAnimate);
    setError(null);

    try {
      const params: any = {};

      if (appliedFilters.colors.length > 0) {
        params.colors = appliedFilters.colors.join(",");
      }

      if (appliedFilters.seasons.length > 0) {
        params.seasons = appliedFilters.seasons.join(",");
      }

      if (appliedFilters.colorMode === "specific" && appliedFilters.colors.length > 0) {
        params.colorMode = "specific";
      } else if (appliedFilters.colorMode === "harmony" && appliedFilters.colorHarmony) {
        params.colorMode = "harmony";
        params.colorHarmony = appliedFilters.colorHarmony;
      }

      const response = await axios.get<OutfitData>(
        `${port}api/clothes/random/${user?.id}`,
        { params },
      );

      const { randomTop, randomBottom } = response.data;
      setOutfitData({
        ...response.data,
        randomTop: randomTop || null,
        randomBottom: randomBottom || null,
      });

      if (animate) {
        requestAnimationFrame(() => setShouldAnimate(true));
      }
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status >= 500) {
          setError("Server error. Please try again later.");
        }
        setOutfitData({
          tops: [],
          bottoms: [],
          onepieces: [],
          randomTop: null,
          randomBottom: null,
        });
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      setIsSpinning(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current > 0) {
      const deltaY = touchStartRef.current - e.changedTouches[0].clientY;
      if (deltaY > 10) fetchData();
      touchStartRef.current = 0;
    }
  };

  const getBottomMargin = () => {
    const type = outfitData?.randomBottom?.type;
    return ["shorts", "skirt"].includes(type || "")
      ? "-mt-24 md:-mt-28"
      : "-mt-16 md:-mt-20";
  };

  const getTopReel = () => {
    if (!outfitData || !outfitData.randomTop) return [];
    const cycles = [];
    for (let i = 0; i < 20; i++) cycles.push(...outfitData.tops);
    return [...cycles, outfitData.randomTop];
  };

  const getBottomReel = () => {
    if (!outfitData || !outfitData.randomBottom) return [];
    const cycles = [];
    for (let i = 0; i < 20; i++) cycles.push(...outfitData.bottoms);
    return [...cycles, outfitData.randomBottom];
  };

  if (error)
    return (
      <div className="flex h-screen flex-col items-center justify-center p-4 text-center text-lg text-red-500">
        {error}
        <button
          onClick={() => fetchData()}
          className="mt-4 rounded-md bg-amber-500 px-4 py-2 text-white"
        >
          Try Again
        </button>
      </div>
    );

  if (!outfitData)
    return (
      <div className="flex h-screen items-center justify-center text-lg text-gray-700">
        Loading your outfit...
      </div>
    );

  const topReel = getTopReel();
  const bottomReel = getBottomReel();
  const finalTopIndex = topReel.length - 1;
  const finalBottomIndex = bottomReel.length - 1;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4">
      <FilterComponent onFiltersChange={handleFiltersChange} isSpinning={isSpinning} />

      <div className="fixed right-10 hidden sm:flex" style={{ bottom: 180 }}>
        <div
          className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-amber-500 shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95 md:h-13 md:w-13"
          onClick={() => fetchData(filters)}
        >
          <RefreshIcon
            className={`text-4xl text-white md:text-3xl ${isSpinning ? "animate-spin" : ""}`}
          />
        </div>
      </div>

      <div className="mb-2 block text-center text-sm text-gray-600 md:hidden">
        Swipe up on the clothes to get a new outfit!
      </div>

      {!outfitData?.randomTop || !outfitData?.randomBottom ? (
        <div className="flex h-screen flex-col items-center justify-center gap-6 p-4 text-center text-lg text-gray-700">
          <h1>No outfit combo found. Try again or change the filter! </h1>

          <motion.div
            animate={{
              rotate: [-3, 3, -3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.img src={failImg} className="w-32" alt="Mascot" />
          </motion.div>
          <h1>or add more clothes 😒 </h1>
        </div>
      ) : (
        <>
          {/* Top Reel */}
          <div
            className="flex w-full max-w-sm flex-col items-center overflow-hidden p-2 md:max-w-md lg:max-w-lg"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="slot-container relative w-full overflow-hidden"
              style={{ height: itemHeight }}
            >
              <div
                className="slot-reel absolute top-0 left-0 w-full"
                style={{
                  transform: shouldAnimate
                    ? `translateY(-${finalTopIndex * itemHeight}px) translateZ(0)`
                    : "translateY(0px) translateZ(0)",
                }}
              >
                {topReel.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    style={{ height: itemHeight }}
                    className="w-full flex-shrink-0"
                  >
                    <img
                      src={`${item.img_path}`}
                      alt="Top"
                      className="slot-image h-full w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Reel */}
          <div
            className={`flex w-full max-w-sm flex-col items-center overflow-hidden p-2 md:max-w-md lg:max-w-lg ${getBottomMargin()}`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="slot-container relative w-full overflow-hidden"
              style={{ height: bottomItemHeight }}
            >
              <div
                className="slot-reel absolute top-0 left-0 w-full"
                style={{
                  transform: shouldAnimate
                    ? `translateY(-${finalBottomIndex * bottomItemHeight}px) translateZ(0)`
                    : "translateY(0px) translateZ(0)",
                }}
              >
                {bottomReel.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    style={{ height: bottomItemHeight }}
                    className="w-full flex-shrink-0"
                  >
                    <img
                      src={`${item.img_path}`}
                      alt="Bottom"
                      className="slot-image h-full w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
