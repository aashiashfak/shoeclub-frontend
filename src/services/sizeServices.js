import {instance} from "@/utils/axios";

export const sizeServices = {
  getSizes: async (productId) => {
    const response = await instance.get(`/custom-admin/sizes/${productId}/`);
    return response.data;
  },
  createSize: async (productId, data) => {
    const response = await instance.post(
      `/custom-admin/sizes/${productId}/`,
      data
    );
    return response.data;
  },
  updateSize: async (sizeId, data) => {
    const response = await instance.patch(
      `/custom-admin/size/${sizeId}/`,
      data
    );
  },
  deleteSize: async (sizeId) => {
    await instance.delete(`/custom-admin/size/${sizeId}/`);
  },
};
