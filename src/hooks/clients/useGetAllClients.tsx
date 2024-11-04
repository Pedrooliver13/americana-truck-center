// Packages
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import moment from 'moment';

// Models
import { Clients } from 'models/clients/clients';

// Services
import { getAllClients } from 'services/clients/getAllClients';

export const useGetAllClients = (id?: string) => {
  const location = useLocation();
  const URLToEnableGet = ['/', '/clients', '/tasks/new', '/prices/new'];

  const response = useQuery<Array<Clients>>({
    queryKey: ['clients'],
    queryFn: () => getAllClients() as Promise<Array<Clients>>,
    staleTime: 1000 * 60 * 30, // 30 minutes
    enabled: Boolean(!id) && URLToEnableGet.includes(location.pathname),
  });

  if (!response?.data || !Array.isArray(response?.data)) {
    return { ...response, data: [] };
  }

  return {
    ...response,

    // Data sorted by createdAt
    data: response?.data?.sort((a, b) => {
      const dateA = moment(a?.createdAt?.seconds * 1000);
      const dateB = moment(b?.createdAt?.seconds * 1000);

      return dateB.diff(dateA);
    }),
  };
};
