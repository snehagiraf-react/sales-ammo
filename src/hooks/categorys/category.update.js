import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useQueryClient } from "@tanstack/react-query";

export const useCategoryUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, body, params }) => {
      const config = {};
      if (params) config.params = params;
      // Only set multipart header when sending FormData
      if (body instanceof FormData) {
        config.headers = { "Content-Type": "multipart/form-data" };
      }
      const res = await api.put(`/categories/update/${id}`, body ?? undefined, config);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["viewcategory"]);
    },
  });
};

