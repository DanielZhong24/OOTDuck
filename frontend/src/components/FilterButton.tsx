import { Funnel } from "lucide-react";

interface FilterButtonProps {
  hasActive: boolean;
  activeCount: number;
  isSpinning?: boolean;
  onClick: () => void;
}

export default function FilterButton({ hasActive, activeCount, isSpinning, onClick }: FilterButtonProps) {
  return (
    <div className="fixed right-10 bottom-30 z-20">
      <button
        onClick={onClick}
        disabled={isSpinning}
        className={`flex items-center justify-center h-13 w-13 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95 ${
          hasActive ? 'bg-amber-600' : 'bg-amber-500'
        } ${isSpinning ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <Funnel color="white" />
        {hasActive && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
            {activeCount}
          </div>
        )}
      </button>
    </div>
  );
}
