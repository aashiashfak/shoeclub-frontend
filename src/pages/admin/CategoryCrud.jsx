import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import PageHeader from "@/components/PageHeader/PageHeader";
import useToastNotification from "@/hooks/SonnerToast";
import {useQueryClient} from "@tanstack/react-query";
import CategoryForm from "@/components/Forms/CategoryForm";
import { CategoryServices } from "@/services/categoryServices";

const CategoryCrud = () => {
  const location = useLocation();
  const category = location.state?.category
  const isEditMode = Boolean(category)
  const showToast = useToastNotification();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoading, setLoading] = useState(false);


  const handleSubmit = async (values, {setErrors}) => {
    try {
      setLoading(true);
      let response;
      let data = {}
      if (!isEditMode) {
        Object.entries(values).forEach(([key, value]) => {
          data[key] = value;
        });
        response = await CategoryServices.createCategory(data);
        showToast("New category created successfully", "success");
      } else {
        console.log("checking edit");
        Object.entries(values).forEach(([key, value]) => {
          if (value !== category[key]) {
            data[key] = value;
          }
        });
        response = await CategoryServices.updateCategory(category.id, data);
        showToast("category updated succussfully", "success");
      }
      queryClient.invalidateQueries(["categories"]);
      queryClient.invalidateQueries(["products"]);
      navigate(-1);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
        showToast(error.response.data.name || "An error occurred", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto shadow-lg my-5 p-3 rounded-lg ">
      <PageHeader title={`${isEditMode ? "Edit" : "Add"} category`} />
      <CategoryForm
        initialValues={{
          name: category?.name || null,
        }}
        onSubmit={handleSubmit}
        isEditMode={isEditMode}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CategoryCrud;
