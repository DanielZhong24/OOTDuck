import { useState } from "react";
import MoreIcon from "~icons/mdi-light/dots-horizontal";
import EditInput from "./EditInput";

type ClothingCardProps = {
  id: number;
  type: string;
  color: string;
  season: string;
  imageUrl: string;
  name?: string;
  onDelete?: (id: number) => void;
  onEdit?: (id: number, name: string) => void;
};

function ClothingCard({
  id,
  type,
  color,
  season,
  imageUrl,
  name,
  onDelete,
  onEdit,
}: ClothingCardProps) {
  const [showBottomSheet, setShowBottomSheet] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const capitalizeLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
  type = capitalizeLetter(type);
  color = capitalizeLetter(color);
  season = capitalizeLetter(season);

  return (
    <div className="relative flex h-full flex-col">
      <div
        className="absolute top-2 right-2 cursor-pointer"
        onClick={() => setShowBottomSheet(true)}
      >
        <MoreIcon className="text-black sm:text-2xl md:text-xl lg:text-3xl" />
      </div>
      <div className="flex-1 bg-gray-200 p-4">
        <img
          className="size-full object-contain"
          alt={`${color} ${type}`}
          src={imageUrl}
        ></img>
      </div>
      <div className="mt-2">
        <h2 className="text-xs text-nowrap md:text-sm lg:text-base">
          {name === null
            ? `${color.toUpperCase()} ${type.toUpperCase()}`
            : name?.toUpperCase()}
        </h2>
        <p className="text-xs md:text-sm lg:text-base">{season.toUpperCase()}</p>
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
