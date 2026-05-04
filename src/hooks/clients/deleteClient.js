import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";

export const useDeleteClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/client/delete/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['viewClient'] });
    },
  });
};
