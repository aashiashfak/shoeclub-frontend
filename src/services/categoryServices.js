import {instance} from "@/utils/axios";

export const CategoryServices = {
  getCategories: async () => {
    const response = await instance.get("/custom-admin/categories");
    return response.data;
  },
  createCategory: async (data) => {
    const response = await instance.post("/custom-admin/categories/", data);
    return response.data;
  },
  updateCategory: async (catId, data) => {
    const response = await instance.patch(`/custom-admin/categories/${catId}/`);
    return response.data
  },
  deleteCategory: async (catId) => {
    const response = await instance.patch(`/custom-admin/categories/${catId}/`);
    return response.data
  },
};
