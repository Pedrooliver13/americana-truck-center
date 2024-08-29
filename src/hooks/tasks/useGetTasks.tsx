// Packages
import { useQuery } from '@tanstack/react-query';

// Services
import { api } from 'services/axios';

export const useGetTasks = () => {
  const response = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await api.get('/pokemon?limit=100000&offset=0');
      return response?.data?.results;
    },
    staleTime: 1000 * 60 * 5,
  });

  return response;
};
