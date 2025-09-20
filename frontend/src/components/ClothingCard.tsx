import { useState } from "react";
import MoreIcon from "~icons/mdi-light/dots-horizontal";
import EditInput from "./EditInput";

type ClothingCardProps = {
  id: number;
  type: string;
  color: string;
  season: string;
  imageUrl: string;
  onDelete?: (id: number) => void;
  onEdit?: (id: number, name: string) => void;
};

function ClothingCard({
  id,
  type,
  color,
  season,
  imageUrl,
  onDelete,
  onEdit,
}: ClothingCardProps) {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const capitalizeLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
  type = capitalizeLetter(type);
  color = capitalizeLetter(color);
  season = capitalizeLetter(season);

  return (
    <div className="relative rounded-4xl border border-none bg-white px-6 py-4 shadow-2xl/30">
      <div
        className="absolute top-2 right-2 cursor-pointer"
        onClick={() => setShowBottomSheet(true)}
      >
        <MoreIcon className="text-3xl text-black" />
      </div>

      <div className="mt-5 h-64 w-full rounded-2xl bg-gray-100">
        <img
          className="h-full w-full object-contain"
          src={imageUrl}
          alt={`${color} ${type}`}
        />
      </div>

      <div className="mt-4 space-y-1">
        <h2 className="text-xl font-semibold">{`${color} ${type}`}</h2>
        <p>Season: {season}</p>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <EditInput
            onClick={(name: string) => {
              onEdit?.(id, name);
              setIsEditing(false);
            }}
            onClose={() => setIsEditing(false)}
          />
        </div>
      )}

      {showBottomSheet && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-65"
          onClick={() => setShowBottomSheet(false)}
        ></div>
      )}
      <div
        className={`fixed right-0 bottom-0 left-0 z-50 rounded-t-lg bg-white p-4 shadow-lg transition-transform duration-300 ${
          showBottomSheet ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex flex-col gap-3">
          {onEdit && (
            <button
              onClick={() => {
                setIsEditing(true);
                setShowBottomSheet(false);
              }}
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
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
              className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Delete
            </button>
          )}
          <button
            onClick={() => setShowBottomSheet(false)}
            className="rounded bg-gray-300 px-4 py-2 text-black hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClothingCard;
