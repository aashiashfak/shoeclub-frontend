import {instance} from "@/utils/axios";

export const ProductServices = {
  getProducts: async (params) => {
    const response = await instance.get("/product/list-create/", {params});
    return response.data;
  },
  fetchProducts: async () => {
    const response = await instance.get("/custom-admin/products/");
    return response.data;
  },
  createProducts: async (formData) => {
    const response = await instance.post("/product/list-create/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  updateProduct: async (id, formData) => {
    const response = await instance.patch(
      `/custom-admin/products/${id}/`,
      formData
    );
    return response.data;
  },
  deleteProduct: async (id) => {
    const response = await instance.delete(`/custom-admin/products/${id}/`);
    return response.data;
  },
};
