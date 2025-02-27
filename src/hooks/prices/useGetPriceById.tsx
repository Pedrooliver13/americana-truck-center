// Packages
import { useQuery } from '@tanstack/react-query';

// Models
import { Prices } from 'models/prices/prices';

// Services
import { getByIdPrice } from 'services/prices/getByIdPrice';

export const useGetByIdPrice = (id?: string) => {
  const response = useQuery<Prices>({
    queryKey: ['price-by-id', id],
    queryFn: () => getByIdPrice(id) as Promise<Prices>,
    enabled: Boolean(id),
  });

  return {
    ...response,
    data: response.data
      ? {
          id: response.data?.id ?? '',
          name: response.data?.name ?? '',
          type: response.data?.type ?? '',
          value: String(response.data?.value ?? ''),
          client: response.data?.client ?? null,
          createdAt: response.data?.createdAt ?? '',
        }
      : response.data,
  };
};
