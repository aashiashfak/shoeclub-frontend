import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import ImageForm from "@/components/Forms/ImageForm";
import PageHeader from "@/components/PageHeader/PageHeader";
import useToastNotification from "@/hooks/SonnerToast";
import { imageServices } from "@/services/imageServices";
import { useQueryClient } from "@tanstack/react-query";
const ImageCrud = () => {
  const location = useLocation();
  const {productID, image} = location.state || {};
  const isEditMode = Boolean(image);
  const showToast = useToastNotification();
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  
  console.log("product id in image form .........", productID)

  const handleSubmit = async (values) => {
    console.log("submitting image values", values)
    try {
      let formData = new FormData();
      if (!isEditMode) {
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value);
        });
        const response = await imageServices.createImage(productID, formData);
        showToast("New image created successfully", "success");
        queryClient.invalidateQueries(["products"]);

        navigate(-1)
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log("finish");
    }
  };

  const handleDelete = () => {};

  return (
    <div className="max-w-xl mx-auto shadow-lg my-5 p-3 rounded-lg">
      <PageHeader title={`${isEditMode ? "Edit" : "Create"} Image`} />
      <ImageForm
        initialValues={{
          image: image?.image || null,
          is_main: image?.is_main || false,
        }}
        onSubmit={handleSubmit}
        isEditMode={isEditMode}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ImageCrud;
