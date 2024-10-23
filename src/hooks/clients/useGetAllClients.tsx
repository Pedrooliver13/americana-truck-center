// Packages
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

// Models
import { Clients } from 'models/clients/clients';

// Services
import { getAllClients } from 'services/clients/getAllClients';

export const useGetAllClients = (id?: string) => {
  const location = useLocation();
  const URLToEnableGet = ['/', '/clients', '/tasks/new'];

  const response = useQuery<Array<Clients>>({
    queryKey: ['clients'],
    queryFn: () => getAllClients() as Promise<Array<Clients>>,
    staleTime: 1000 * 60 * 30, // 30 minutes
    enabled: Boolean(!id) && URLToEnableGet.includes(location.pathname),
  });

  return response;
};
