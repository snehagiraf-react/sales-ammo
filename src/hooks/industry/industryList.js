import {
  useQuery,
} from '@tanstack/react-query'
import api  from '../../services/api';


export const useViewIndustryQuery = () => {

  return useQuery({
    queryKey: ['viewIndustry'],
    queryFn: async () => {
        console.log('View industry request body:');
      const res = await api.get("/industry/all");
      return res.data;
    }
  });
};