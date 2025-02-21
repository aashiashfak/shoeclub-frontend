import {Trash} from "lucide-react";
import {Button} from "../ui/button";

const FormActionButtons = ({isEditMode, hasChanges, onCancel, isLoading}) => {
  return (
    <div className="flex gap-3 mt-4">
      <Button
        className={`bg-black text-white`}
        type="submit"
        disabled={(isEditMode && !hasChanges) || isLoading}
      >
        {isLoading ? "Submitting..." : isEditMode ? "Save Changes" : "Create"}
      </Button>

      <Button
        type="button"
        className="bg-gray-500 text-white"
        onClick={onCancel}
      >
        Cancel
      </Button>
    </div>
  );
};

export default FormActionButtons;
