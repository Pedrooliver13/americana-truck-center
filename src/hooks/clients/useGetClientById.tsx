// Packages
import { useQuery } from '@tanstack/react-query';

// Models
import { Clients } from 'models/clients/clients';

// Services
import { getByIdClient } from 'services/clients/getByIdClient';

export const useGetByIdClient = (id?: string) => {
  const response = useQuery<Clients>({
    queryKey: ['client-by-id', id],
    queryFn: () => getByIdClient(id) as Promise<Clients>,
    enabled: Boolean(id),
  });

  return response;
};
