import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";

export const useViewCategory = () => { 
    return useQuery({ 
        queryKey: ['viewcategory'], 
        queryFn: async () => { 
            const res = await api.get('/category/all', {
                params: { includeInactive: true }
            }); 
            return res.data; 
        }
     });
};  