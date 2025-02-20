import {Edit, Check, X} from "lucide-react";
import {CustomTable} from "./CutomTable";
import {useLocation, useNavigate} from "react-router-dom";
import {Button} from "../ui/button";

export function ImageTable({images}) {
  const navigate = useNavigate();
  const columns = [
    {
      header: "Image",
      accessorKey: (row) => (
        <div className="w-16 h-16 relative">
          <img
            src={
              row.image 
            }
            alt={row.name}
            className="w-full h-full object-cover rounded-md cursor-pointer"
          />
        </div>
      ),
    },
    {
      header: "Main",
      accessorKey: (row) => (
        <Button variant="ghost" size="sm">
          {row.is_main ? (
            <Check className="text-green-500" />
          ) : (
            <X className="text-red-500" />
          )}
        </Button>
      ),
    },
    {
      header: "Edit",
      accessorKey: (row) => (
        <button
          className="text-white font-bold py-1 px-2 rounded"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/admin/sizes-form`, {state: {images: row}});
          }}
        >
          <Edit className="text-black" />
        </button>
      ),
    },
  ];

  return <CustomTable data={images} columns={columns} />;
}
