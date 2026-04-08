import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";

export const useViewAdminUsers = () => { 
    return useQuery({ 
        queryKey: ['viewAdminUsers'], 
        queryFn: async () => { 
            const res = await api.get('/admin-users', {
            }); 
            return res.data; 
        }
     });
};  