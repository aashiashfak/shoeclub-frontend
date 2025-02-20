import {instance} from "@/utils/axios";

export const CategoryServices = {
  getCategories: async () => {
    const response = await instance.get("/custom-admin/categories");
    return response.data;
  },
};
