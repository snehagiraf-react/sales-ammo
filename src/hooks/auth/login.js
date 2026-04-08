import {
  useMutation,
} from '@tanstack/react-query'
import api  from '../../services/api';


export const useLogin = () => {

  return useMutation({
    mutationFn: async (body) => {
      const res = await api.post("/login", body);
      return res.data;
    }
  });

};
