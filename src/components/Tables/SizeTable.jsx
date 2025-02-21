import {Edit, Trash} from "lucide-react";
import {CustomTable} from "./CutomTable";
import {useLocation, useNavigate} from "react-router-dom";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useToastNotification from "@/hooks/SonnerToast";
import { sizeServices } from "@/services/sizeServices";
import DeleteModal from "../Modals/DeleteModal";

export function SizeTable({sizes , productID}) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState({});
  const showToast = useToastNotification();
  const queryClient = useQueryClient();
  const [isLoading, setLoading] = useState(false);

  const handleDelete = async () => {
      try {
          setLoading(true)
        await sizeServices.deleteSize(selectedSize?.id);
        showToast("Image deleted succussfully", "success");
      } catch (error) {
        console.log(error);
      } finally {
        await queryClient.invalidateQueries(["sizes", productID]);
        setLoading(false)
        setIsOpen(false);
      }
    };
  const columns = [
    {header: "size", accessorKey: "size"},
    {header: "quantity", accessorKey: "quantity"},
    {
      header: "Action Type",
      accessorKey: (row) => (
        <div className="flex gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/admin/size-form`, {
                state: {size: row, productID: productID},
              });
            }}
          >
            <Edit className="text-black hover:text-blue-500" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedSize(row);
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
      <CustomTable data={sizes} columns={columns} />
    </>
  );
}
