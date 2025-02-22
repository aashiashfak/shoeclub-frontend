import {Edit, Trash} from "lucide-react";
import {CustomTable} from "./CutomTable";
import {useNavigate} from "react-router-dom";
import {Tooltip} from "react-tooltip";
import { useState } from "react";
import useToastNotification from "@/hooks/SonnerToast";
import { useQueryClient } from "@tanstack/react-query";
import { ProductServices } from "@/services/productServices";
import DeleteModal from "../Modals/DeleteModal";

export function ProductTable({products}) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const showToast = useToastNotification();
  const queryClient = useQueryClient();
  const [isLoading, setLoading] = useState(false);

  const handleDelete = async () => {
      try {
          setLoading(true)
        await ProductServices.deleteProduct(selectedProduct?.id);
        showToast("product deleted succussfully", "success");
      } catch (error) {
        console.log(error);
      } finally {
        await queryClient.invalidateQueries(["products"]);
        setLoading(false)
        setIsOpen(false);
      }
    };


  const columns = [
    {
      header: "Image",
      accessorKey: (row) => (
        <div className="w-16 h-16 relative">
          <img
            src={
              row.images.find((img) => img.is_main)?.image || ""
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
      header: "Action Type",
      accessorKey: (row) => (
        <div className="flex gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/admin/product-form`, {
                state: {product: row, },
              });
            }}
          >
            <Edit className="text-black hover:text-blue-500" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(row);
              setIsOpen(true);
            }}
          >
            <Trash className="text-black hover:text-red-500" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      {isOpen && (
        <DeleteModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={handleDelete}
          isLoading={isLoading}
        />
      )}
      <CustomTable data={products} columns={columns} />
      <Tooltip id="image-tooltip" />
      <Tooltip id="size-tooltip" />
    </>
  );
}
