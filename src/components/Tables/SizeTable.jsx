import {Edit} from "lucide-react";
import {CustomTable} from "./CutomTable";
import {useLocation, useNavigate} from "react-router-dom";

export function SizeTable({sizes}) {
  const navigate = useNavigate();
  const columns = [
    {header: "size", accessorKey: "size"},
    {header: "quantity", accessorKey: "quantity"},
    
    {
      header: "Edit",
      accessorKey: (row) => (
        <button
          className="text-white font-bold py-1 px-2 rounded"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/admin/sizes-form`, {state: {sizes: row}});
          }}
        >
          <Edit className="text-black" />
        </button>
      ),
    },
  ];

  return (
    <>
      <CustomTable data={sizes} columns={columns} />
    </>
  );
}
