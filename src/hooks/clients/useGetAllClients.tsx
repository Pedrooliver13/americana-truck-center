// Packages
import { useQuery } from '@tanstack/react-query';

// Models
import { Clients } from 'models/clients/clients';

// Services
import { getAllClients } from 'services/clients/getAllClients';

export const useGetAllClients = (id?: string) => {
  const response = useQuery<Array<Clients>>({
    queryKey: ['clients'],
    queryFn: () => getAllClients() as Promise<Array<Clients>>,
    staleTime: 1000 * 60 * 30, // 30 minutes
    enabled: Boolean(!id),
  });

  return response;
};
