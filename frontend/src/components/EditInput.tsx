import { Button } from "./ui/button";
import { Input } from "./ui/input";

function EditInput({ onClose, onClick }: { onClose: () => void; onClick?: () => void }) {
  return (
    <>
      <form className="flex w-[30%] flex-col space-y-3 rounded-md border-1 bg-gray-100 p-8">
        <label>Edit Name</label>
        <Input id="edit" name="edit" placeholder="Edit clothing name" />
        <div className="mt-4 flex justify-end gap-4">
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={onClick} type="submit">
            Save
          </Button>
        </div>
      </form>
    </>
  );
}

export default EditInput;
