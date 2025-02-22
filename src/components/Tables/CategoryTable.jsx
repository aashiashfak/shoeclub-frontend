import {Edit, Trash} from "lucide-react";
import {CustomTable} from "./CutomTable";
import {useState} from "react";
import DeleteModal from "../Modals/DeleteModal";
import useToastNotification from "@/hooks/SonnerToast";
import {CategoryServices} from "@/services/categoryServices";
import {useQueryClient} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function CategoryTable({categories}) {
  const [selectedCategory, setSelectedCategory] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const showToast = useToastNotification();
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  const handleDelete = async () => {
    try {
      setLoading(true);
      await CategoryServices.deleteCategory(selectedCategory?.id);
      showToast("category deleted succussfully", "success");
    } catch (error) {
      console.log(error);
      if (error.response?.data?.error) {
        let toastMessage = error.response.data.error;
        if (error.response?.data?.products) {
          const productNames = error.response.data.products.join(", ");
          toastMessage += ` Associated products: ${productNames}`;
        }
        showToast(toastMessage, "error");
      }
    } finally {
      await queryClient.invalidateQueries(["Categories"]);
      setLoading(false);
      setIsOpen(false);
    }
  };

  const columns = [
    {header: "Name", accessorKey: "name"},
    {
      header: "Action Type",
      accessorKey: (row) => (
        <div className="flex gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/admin/category-form`, {
                state: {category: row},
              });
            }}
          >
            <Edit className="text-black hover:text-blue-500" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedCategory(row);
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
      <CustomTable data={categories} columns={columns} />
    </>
  );
}
