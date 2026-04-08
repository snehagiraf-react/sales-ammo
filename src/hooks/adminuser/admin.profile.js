import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';




export const useAdminProfile = () => {
    return useQuery({
        queryKey: ['adminProfile'], 
        queryFn: async () => {
            const res = await api.get('/me');
            return res.data;
        }
    });
};