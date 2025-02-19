import {Edit} from "lucide-react";
import {CustomTable} from "./CutomTable";

export function CategoryTable({categories}) {
  const columns = [
    {header: "Name", accessorKey: "name"},
    {
      header: "Edit",
      accessorKey: (row) => (
        <div className="flex items-center gap-2">
          <button
            className="text-white font-bold py-
                1 px-2 rounded"
          >
            <Edit className="text-black" />
          </button>
        </div>
      ),
    },
  ];

  return <CustomTable data={categories} columns={columns} />;
}
