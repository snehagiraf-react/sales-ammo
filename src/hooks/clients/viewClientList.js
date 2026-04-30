import {
  useQuery,
} from '@tanstack/react-query'
import api  from '../../services/api';


export const useViewClientQuery = () => {

  return useQuery({
    queryKey: ['viewClient'],
    queryFn: async () => {
        console.log('View client request body:');
      const res = await api.get("/client/list");
      return res.data;
    }
  });
};