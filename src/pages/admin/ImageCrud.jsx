import React, { useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import ImageForm from "@/components/Forms/ImageForm";
import PageHeader from "@/components/PageHeader/PageHeader";
import useToastNotification from "@/hooks/SonnerToast";
import {imageServices} from "@/services/imageServices";
import {useQueryClient} from "@tanstack/react-query";
import BackButton from "@/components/Buttons/BackButton";
const ImageCrud = () => {
  const location = useLocation();
  const {productID, image} = location.state || {};
  const isEditMode = Boolean(image);
  const showToast = useToastNotification();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
        setLoading(true)
      let formData = new FormData();
      let response;
      if (!isEditMode) {
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value);
        });
        response = await imageServices.createImage(productID, formData);
        showToast("New image created successfully", "success");
      } else {
        console.log("checking edit");
        Object.entries(values).forEach(([key, value]) => {
          if (value !== image[key]) {
            formData.append(key, value);
          }
        });
        response = await imageServices.updateImage(image.id, formData);
        showToast("Image updated succussfully", "success");
      }
    } catch (error) {
      console.log(error);
    } finally {
      queryClient.invalidateQueries(["images", productID]);
      queryClient.invalidateQueries(["products"]);
      setLoading(false)
      navigate(-1);
    }
  };


  return (
    <div className="max-w-xl mx-auto shadow-lg my-5 p-3 rounded-lg">
      <BackButton handleBackClick={() => navigate(-1)} />
      <PageHeader title={`${isEditMode ? "Edit" : "Create"} Image`} />
      <ImageForm
        initialValues={{
          image: image?.image || null,
          is_main: image?.is_main || false,
        }}
        onSubmit={handleSubmit}
        isEditMode={isEditMode}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ImageCrud;
