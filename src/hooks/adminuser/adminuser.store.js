import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import api  from '../../services/api';


export const useAdminUserStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body) => {
      const isFormData = body instanceof FormData;
      
      const config = isFormData
        ? { headers: { "Content-Type": "multipart/form-data" } }
        : {};
      
      const res = await api.post("/register", body, config);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['viewAdminUsers']);
    },
  });

};
