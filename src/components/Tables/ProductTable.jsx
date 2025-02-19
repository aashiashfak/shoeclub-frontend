import { Edit } from "lucide-react";
import { CustomTable } from "./CutomTable";

export function ProductTable({products}) {
    console.log( "products in product Tanblee", products)
  const columns = [
    {
      header: "Image",
      accessorKey: (row) => (
        <div className="w-16 h-16 relative">
          <img
            src={
              row.images.find((img) => img.is_main)?.image_url ||
              "/placeholder.svg"
            }
            alt={row.name}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      ),
    },
    {header: "Name", accessorKey: "name"},
    {header: "Category", accessorKey: "category"},
    {header: "Price", accessorKey: "price"},
    {
      header: "Sizes",
      accessorKey: (row) => (
        <div className="flex flex-wrap gap-1">
          {row.sizes.map((size) => (
            <span
              key={size.size}
              className="text-xs bg-gray-100 px-2 py-1 rounded"
            >
              {size.size} ({size.quantity})
            </span>
          ))}
        </div>
      ),
    },
    {
        header: "Edit",
        accessorKey: (row) => (
            <div className="flex items-center gap-2">
                <button className="text-white font-bold py-
                1 px-2 rounded"><Edit className="text-black"/></button>
            </div>
        )
    }
  ];

  return <CustomTable data={products} columns={columns} />;
}
