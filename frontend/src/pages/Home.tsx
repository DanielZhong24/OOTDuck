import { useState, useEffect, useRef } from "react";
import axios from "axios";
import RefreshIcon from "~icons/mdi-light/refresh";

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
  randomTop: ClothingItem;
  randomBottom: ClothingItem;
}

const itemHeight = 350;

function Home() {
  const [outfitData, setOutfitData] = useState<OutfitData | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  
  const touchStartRef = useRef(0);
  const port = import.meta.env.VITE_BACKEND_ROUTE;

  async function fetchData() {
    if (isSpinning) return; 
    
    setIsSpinning(true);
    setShouldAnimate(false);
    setError(null);
    
    try {
      const response = await axios.get<OutfitData>(`${port}api/clothes/random/5`);
      setOutfitData(response.data);
      
      requestAnimationFrame(() => {
        setShouldAnimate(true);
      });
      
      setTimeout(() => setIsSpinning(false), 800);
      
    } catch (err) {
      console.error("Failed to fetch outfit data:", err);
      setError("Failed to load outfit. Please check your network connection and try again.");
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
      if (deltaY > 10) {
        fetchData();
      }
      touchStartRef.current = 0;
    }
  };

  const getBottomMargin = () => {
    const type = outfitData?.randomBottom?.type;
    return ["shorts", "skirt"].includes(type || '') ? "-mt-24 md:-mt-28" : "-mt-16 md:-mt-20";
  };

  const getTopReel = () => {
    if (!outfitData) return [];
    const cycles = [];
    for (let i = 0; i < 8; i++) {
      cycles.push(...outfitData.tops);
    }
    return [...cycles, outfitData.randomTop];
  };

  const getBottomReel = () => {
    if (!outfitData) return [];
    const cycles = [];
    for (let i = 0; i < 8; i++) {
      cycles.push(...outfitData.bottoms);
    }
    return [...cycles, outfitData.randomBottom];
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-lg text-red-500 p-4 text-center">
        {error}
        <button onClick={fetchData} className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-md">
          Try Again
        </button>
      </div>
    );
  }

  if (!outfitData) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-700">
        Loading your outfit...
      </div>
    );
  }

  const topReel = getTopReel();
  const bottomReel = getBottomReel();
  const finalTopIndex = topReel.length - 1;
  const finalBottomIndex = bottomReel.length - 1;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative">

      <div className="hidden sm:flex sm:h-0 fixed top-4 right-4 z-10 md:absolute md:top-8 md:right-8">
        <div className="flex h-14 w-14 md:h-12 md:w-12 items-center justify-center rounded-full bg-amber-500 shadow-lg cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95">
          <RefreshIcon
            onClick={fetchData}
            className={`text-4xl md:text-3xl text-white ${isSpinning ? "animate-spin" : ""}`}
          />
        </div>
      </div>

      <div className="block md:hidden text-center text-gray-600 text-sm">
        Swipe up on the clothes to get a new outfit!
      </div>
      
      <div 
        className=" w-full max-w-sm md:max-w-md lg:max-w-lg flex flex-col items-center overflow-hidden p-2"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full overflow-hidden slot-container" style={{ height: itemHeight }}>
          <div
            className="absolute top-0 left-0 w-full slot-reel"
            style={{
              transform: shouldAnimate 
                ? `translateY(-${finalTopIndex * itemHeight}px) translateZ(0)`
                : 'translateY(0px) translateZ(0)'
            }}
          >
            {topReel.map((item, index) => (
              <img
                key={`${item.id}-${index}`}
                src={`${port}${item.img_path}`}
                alt="Top"
                className="w-full object-contain slot-image"
                style={{ height: itemHeight }}
    
              />
            ))}
          </div>
        </div>
      </div>

      <div 
        className={`w-full max-w-sm md:max-w-md lg:max-w-lg flex flex-col items-center overflow-hidden p-2 ${getBottomMargin()}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full overflow-hidden slot-container" style={{ height: itemHeight }}>
          <div
            className="absolute top-0 left-0 w-full slot-reel"
            style={{
              transform: shouldAnimate 
                ? `translateY(-${finalBottomIndex * itemHeight}px) translateZ(0)`
                : 'translateY(0px) translateZ(0)'
            }}
          >
            {bottomReel.map((item, index) => (
              <img
                key={`${item.id}-${index}`}
                src={`${port}${item.img_path}`}
                alt="Bottom"
                className="w-full object-contain slot-image"
                style={{ height: itemHeight }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;