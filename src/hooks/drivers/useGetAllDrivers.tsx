// Packages
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

// Models
import { Drivers } from 'models/drivers/drivers';

// Services
import { getAllDrivers } from 'services/drivers/getAllDrivers';

export const useGetAllDrivers = (id?: string) => {
  const location = useLocation();
  const URLToEnableGet = ['/', '/drivers', '/tasks/new'];

  const response = useQuery<Array<Drivers>>({
    queryKey: ['drivers'],
    queryFn: () => getAllDrivers() as Promise<Array<Drivers>>,
    staleTime: 1000 * 60 * 30, // 30 minutes
    enabled: Boolean(!id) && URLToEnableGet.includes(location.pathname),
  });

  return response;
};
