import { Trash } from "lucide-react";
import {Button} from "../ui/button";

const FormActionButtons = ({
  isEditMode,
  hasChanges,
  onSave,
  onCancel,
  onDelete,
}) => {
  return (
    <div className="flex gap-3 mt-4">
      <Button
        className="bg-black text-white"
        type="submit"
        onClick={onSave}
        disabled={isEditMode && !hasChanges} 
      >
        {isEditMode ? "Save Changes" : "Create"}
      </Button>

      <Button className=" bg-gray-500 text-white " onClick={onCancel}>
        Cancel
      </Button>
      <Button
        type="button"
        onClick={onDelete}
        variant="destructive"
        size="icon"
      >
        <Trash size={16} />
      </Button>
    </div>
  );
};

export default FormActionButtons;
