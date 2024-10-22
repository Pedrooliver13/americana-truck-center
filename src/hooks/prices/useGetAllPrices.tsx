// Packages
import { useQuery } from '@tanstack/react-query';

// Models
import { Prices } from 'models/prices/prices';

// Services
import { getAllPrices } from 'services/prices/getAllPrices';

export const useGetAllPrices = (id?: string) => {
  const response = useQuery<Array<Prices>>({
    queryKey: ['prices'],
    queryFn: () => getAllPrices() as Promise<Array<Prices>>,
    staleTime: 1000 * 60 * 30, // 30 minutes
    enabled: Boolean(!id),
  });

  return response;
};
