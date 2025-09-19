type ClothingCardProps = {
  type: string;
  color: string;
  season: string;
  imageUrl: string;
};

function ClothingCard({ type, color, season, imageUrl }: ClothingCardProps) {
  const capitalizeLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  type = capitalizeLetter(type);
  color = capitalizeLetter(color);
  season = capitalizeLetter(season);

  return (
    <div className="rounded border px-6 py-4 shadow">
      <div className="h-64 w-full rounded overflow-hidden">
        <img className="w-full h-full object-contain"  src={imageUrl} alt={`${color} ${type}`} />
      </div>
      <div className="mt-4 space-y-1">
        <h2 className="text-xl font-semibold">{`${color} ${type}`}</h2>
        <p>Season: {season}</p>
      </div>
    </div>
  );
}

export default ClothingCard;
