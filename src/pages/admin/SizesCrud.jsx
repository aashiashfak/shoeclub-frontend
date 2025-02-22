import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import PageHeader from "@/components/PageHeader/PageHeader";
import useToastNotification from "@/hooks/SonnerToast";
import {useQueryClient} from "@tanstack/react-query";
import SizeForm from "@/components/Forms/SizeForm";
import {sizeServices} from "@/services/sizeServices";
import BackButton from "@/components/Buttons/BackButton";
const SizesCrud = () => {
  const location = useLocation();
  const {productID, size} = location.state || {};
  const isEditMode = Boolean(size);
  const showToast = useToastNotification();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (values, {setErrors}) => {
    try {
      setLoading(true);
      let formData = new FormData();
      let response;
      if (!isEditMode) {
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value);
        });
        response = await sizeServices.createSize(productID, formData);
        showToast("New size created successfully", "success");
      } else {
        console.log("checking edit");
        Object.entries(values).forEach(([key, value]) => {
          if (value !== size[key]) {
            formData.append(key, value);
          }
        });
        response = await sizeServices.updateSize(size.id, formData);
        showToast("Size updated succussfully", "success");
      }
      queryClient.invalidateQueries(["sizes", productID]);
      queryClient.invalidateQueries(["products"]);
      navigate(-1);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
        showToast(error.response.data.size || "An error occurred", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto shadow-lg my-5 p-3 rounded-lg ">
      <BackButton handleBackClick={() => navigate(-1)} />
      <PageHeader title={`${isEditMode ? "Edit" : "Add"} size`} />
      <SizeForm
        initialValues={{
          size: size?.size || null,
          quantity: size?.quantity || false,
        }}
        onSubmit={handleSubmit}
        isEditMode={isEditMode}
        isLoading={isLoading}
      />
    </div>
  );
};

export default SizesCrud;
