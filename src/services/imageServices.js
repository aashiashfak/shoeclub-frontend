import {instance} from "@/utils/axios";

export const imageServices = {
  createImage: async (productId, formData) => {
    const response = await instance.post(
      `/custom-admin/images/${productId}/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },
};
