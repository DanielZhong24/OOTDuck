import { useState } from "react";
import MoreIcon from "~icons/mdi-light/dots-horizontal";
type ClothingCardProps = {
  id:number;
  type: string;
  color: string;
  season: string;
  imageUrl: string;
  onDelete?: (id:number) => void;
  onEdit?: () => void;
};

function ClothingCard({id, type, color, season, imageUrl, onDelete, onEdit }: ClothingCardProps) {
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const capitalizeLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
  type = capitalizeLetter(type);
  color = capitalizeLetter(color);
  season = capitalizeLetter(season);

  return (


    <div className="rounded-4xl border px-6 py-4 bg-white shadow-2xl/30 relative border-none">

      <div className="absolute top-2 right-2 cursor-pointer" onClick={() => setShowBottomSheet(true)}>
        <MoreIcon className="text-black text-3xl" />
      </div>

      <div className="h-64 w-full rounded-2xl mt-5  bg-gray-100">
        <img className="w-full h-full object-contain " src={imageUrl} alt={`${color} ${type}`} />
      </div>

      <div className="mt-4 space-y-1">
        <h2 className="text-xl font-semibold">{`${color} ${type}`}</h2>
        <p>Season: {season}</p>
      </div>

      {showBottomSheet && (
        <div
          className="fixed inset-0 bg-black opacity-65 z-40"
          onClick={() => setShowBottomSheet(false)}
        ></div>
      )}
      <div
        className={`fixed left-0 right-0 bottom-0 bg-white shadow-lg rounded-t-lg p-4 transition-transform duration-300 z-50 ${
          showBottomSheet ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex flex-col gap-3">
          {onEdit && (
            <button
              onClick={() => {
                onEdit();
                setShowBottomSheet(false);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => {
                onDelete(id);
                setShowBottomSheet(false);
              }}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          )}
          <button
            onClick={() => setShowBottomSheet(false)}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClothingCard;
