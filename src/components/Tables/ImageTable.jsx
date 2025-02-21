import {Edit, Check, X, Trash} from "lucide-react";
import {CustomTable} from "./CutomTable";
import {useNavigate} from "react-router-dom";
import {Button} from "../ui/button";
import {useState} from "react";
import DeleteModal from "../Modals/DeleteModal";
import useToastNotification from "@/hooks/SonnerToast";
import {imageServices} from "@/services/imageServices";
import {useQueryClient} from "@tanstack/react-query";

export function ImageTable({images, productID}) {
    
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({});
  const showToast = useToastNotification();
  const queryClient = useQueryClient();
  const [isLoading, setLoading] = useState(false)

  const handleDelete = async () => {
    try {
        setLoading(true)
      await imageServices.deleteImage(selectedImage?.id);
      showToast("Image deleted succussfully", "success");
    } catch (error) {
      console.log(error);
    } finally {
      await queryClient.invalidateQueries(["images", productID]);
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
            src={row.image}
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
      header: "Action Type",
      accessorKey: (row) => (
        <div className="flex gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/admin/image-form`, {
                state: {image: row, productID: productID},
              });
            }}
          >
            <Edit className="text-black hover:text-blue-500" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(row);
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
      <CustomTable data={images} columns={columns} />
    </>
  );
}
