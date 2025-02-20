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
};
