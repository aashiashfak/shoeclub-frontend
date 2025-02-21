import {instance} from "@/utils/axios";

export const imageServices = {
  getImages: async (productId) => {
    const response = await instance.get(`/custom-admin/images/${productId}/`);
    return response.data;
  },
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
  updateImage: async (imgId, formData) => {
    const response = await instance.patch(
      `/custom-admin/image/${imgId}/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
  deleteImage: async (imgId) => {
    await instance.delete(`/custom-admin/image/${imgId}/`);
  },
};
