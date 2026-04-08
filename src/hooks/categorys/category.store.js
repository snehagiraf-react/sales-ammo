import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import api  from '../../services/api';


export const useCategoryStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body) => {
      const isFormData = body instanceof FormData;
      
      const config = isFormData
        ? { headers: { "Content-Type": "multipart/form-data" } }
        : {};
      
      const res = await api.post("/categories/store", body, config);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['viewcategory']);
    },
  });

};
