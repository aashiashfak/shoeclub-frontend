import { Edit } from "lucide-react";
import { CustomTable } from "./CutomTable";
import { useNavigate } from "react-router-dom";

export function ProductTable({products}) {
    console.log( "products in product Tanblee", products)
    const navigate = useNavigate()
  const columns = [
    {
      header: "Image",
      accessorKey: (row) => (
        <div className="w-16 h-16 relative">
          <img
            src={
              row.images.find((img) => img.is_main)?.image || "/placeholder.svg"
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
    {header: "Design Type", accessorKey: "design_type"},
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
        <button
          className="text-white font-bold py-1 px-2 rounded"
          onClick={(e) => {
            e.stopPropagation(); // Prevents row click event
            navigate(`/admin/product-form`, {state: {product: row}});
          }}
        >
          <Edit className="text-black" />
        </button>
      ),
    },
  ];

  return <CustomTable data={products} columns={columns} />;
}
