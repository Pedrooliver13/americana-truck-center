// Packages
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

// Models
import { Prices } from 'models/prices/prices';

// Services
import { getAllPrices } from 'services/prices/getAllPrices';

export const useGetAllPrices = (id?: string) => {
  const location = useLocation();
  const URLToEnableGet = ['/', '/prices', '/tasks/new'];

  const response = useQuery<Array<Prices>>({
    queryKey: ['prices'],
    queryFn: () => getAllPrices() as Promise<Array<Prices>>,
    staleTime: 1000 * 60 * 30, // 30 minutes
    enabled: Boolean(!id) && URLToEnableGet.includes(location.pathname),
  });

  return response;
};
