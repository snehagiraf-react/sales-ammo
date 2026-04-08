import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";

export const useViewSingleAdminUser = (id) => {
  return useQuery({
    queryKey: ['viewAdminUserDetails', id],
    enabled: !!id, 
    queryFn: async ({ queryKey }) => {
      const adminUserId = queryKey[1];   
      const res = await api.get(`/admin-users/${adminUserId}`);
      return res.data;
    },
  });
};