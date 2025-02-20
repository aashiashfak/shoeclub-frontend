import {Edit} from "lucide-react";
import {CustomTable} from "./CutomTable";
import {useNavigate} from "react-router-dom";
import {Tooltip} from "react-tooltip";

export function ProductTable({products}) {
  console.log("products in product Table", products);
  const navigate = useNavigate();

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
            className="w-full h-full object-cover rounded-md cursor-pointer"
            data-tooltip-id="image-tooltip"
            data-tooltip-content={"list images"}
            data-tooltip-place="top"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/admin/images`, {state: {product: row}});
            }}
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
        <div
          className="flex flex-wrap gap-1 cursor-pointer"
          data-tooltip-id="size-tooltip"
          data-tooltip-content="list all"
          data-tooltip-place="top"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/admin/sizes`, {state: {product: row}});
          }}
        >
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
            e.stopPropagation();
            navigate(`/admin/product-form`, {state: {product: row}});
          }}
        >
          <Edit className="text-black" />
        </button>
      ),
    },
  ];

  return (
    <>
      <CustomTable data={products} columns={columns} />
      <Tooltip id="image-tooltip" />
      <Tooltip id="size-tooltip" />
    </>
  );
}
