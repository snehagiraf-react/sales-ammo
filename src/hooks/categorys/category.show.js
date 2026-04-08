import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";

export const useViewSingleCategory = (id, enabled = true) => {
  return useQuery({
    queryKey: ['viewCategoryDetails', id],
    enabled: !!id && enabled, 
    queryFn: async ({ queryKey }) => {
      const categoryId = queryKey[1];   
      const res = await api.get(`/categories/show/${categoryId}`);
      return res.data;
    },
  });
};