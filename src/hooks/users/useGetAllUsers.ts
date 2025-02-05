// Packages
import { useQuery } from '@tanstack/react-query';

// Models
import { Users } from 'models/users/users';

// Services
import { getAllUsers } from 'services/users/getAllUsers';

export const useGetAllUsers = () => {
  const location = window.location.pathname;
  const URLToDisableGet = ['/login', '/forgot-password'];

  const response = useQuery<Array<Users>>({
    queryKey: ['users'],
    queryFn: () => getAllUsers() as Promise<Array<Users>>,
    staleTime: 0,
    enabled: !URLToDisableGet.includes(location),
  });

  if (!response?.data || !Array.isArray(response?.data)) {
    return { ...response, data: [] };
  }

  return response;
};
