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
        className="flex w-[30%] flex-col space-y-3 rounded-md border-1 bg-gray-100 p-8"
      >
        <label htmlFor="edit">Edit Name</label>
        <Input
          onChange={(e) => setName(e.currentTarget.value)}
          id="edit"
          name="edit"
          placeholder="Edit clothing name"
        />
        <div className="mt-4 flex justify-end gap-4">
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </>
  );
}

export default EditInput;
