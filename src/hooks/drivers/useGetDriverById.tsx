// Packages
import { useQuery } from '@tanstack/react-query';

// Models
import { Drivers } from 'models/drivers/drivers';

// Services
import { getByIdDriver } from 'services/drivers/getByIdDriver';

export const useGetByIdDriver = (id?: string) => {
  const response = useQuery<Drivers>({
    queryKey: ['driver-by-id', id],
    queryFn: () => getByIdDriver(id) as Promise<Drivers>,
    enabled: Boolean(id),
  });

  return response;
};
