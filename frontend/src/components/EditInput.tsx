import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

function EditInput({
  onClose,
  onClick,
}: {
  onClose: () => void;
  onClick?: (name: string) => void;
}) {
  const [name, setName] = useState<string>("");
  return (
    <>
      <form
        method="PUT"
        onSubmit={(e) => {
          e.preventDefault();
          onClick?.(name);
        }}
        className="flex flex-col space-y-3 rounded-md border-1 bg-gray-100 p-5 sm:w-[45%] md:p-6 lg:w-[30%] lg:p-8"
      >
        <label className="sm:text-md text-sm md:text-base" htmlFor="edit">
          Edit Name
        </label>
        <Input
          onChange={(e) => setName(e.currentTarget.value)}
          id="edit"
          name="edit"
          className="text-xs sm:text-sm md:text-base"
          placeholder="Edit clothing name"
        />
        <div className="mt-4 flex justify-end gap-3 md:gap-4">
          <Button
            className="cursor-pointer text-xs sm:text-sm"
            onClick={onClose}
            variant="outline"
          >
            Cancel
          </Button>
          <Button className="cursor-pointer text-xs sm:text-sm" type="submit">
            Save
          </Button>
        </div>
      </form>
    </>
  );
}

export default EditInput;
