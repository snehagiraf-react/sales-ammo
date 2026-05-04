import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";
import { toast } from "react-toastify";

export const useClientUpdate = () => {
  const queryClient = useQueryClient();

 return useMutation({
 mutationFn: async ({ id, body }) => {
  const isFormData = body instanceof FormData;

  const res = await api.put(`/client/update/${id}`, body, {
    headers: isFormData
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" },
  });

  return res.data;
},
  onSuccess: () => {
    toast.success("Client updated!");
    queryClient.invalidateQueries({ queryKey: ["viewClient"] });
  },
  onError: (error) => {
    console.log("UPDATE ERROR:", error.response || error);
    toast.error("Update failed!");
  }
});
};