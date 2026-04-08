import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";

export const useRemoveAdminUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/admin-users/delete/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['viewAdminUsers']);
    },
  });
};