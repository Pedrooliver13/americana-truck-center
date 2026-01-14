// Packages
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import moment from 'moment';

// Models
import { Report } from 'models/reports/reports';

// Services
import { getAllReports } from 'services/reports/getAllReports';

export const useGetAllReports = (id?: string) => {
  const location = useLocation();
  const URLToEnableGet = ['/', '/reports'];

  const response = useQuery<Array<Report>>({
    queryKey: ['reports'],
    queryFn: () => getAllReports() as unknown as Promise<Array<Report>>,
    staleTime: 1000 * 60 * 30, // 30 minutes
    enabled: Boolean(!id) && URLToEnableGet.includes(location.pathname),
  });

  return {
    ...response,
    data: response?.data?.sort((a, b) => {
      const dateA = moment((a?.createdAt?.seconds ?? 0) * 1000);
      const dateB = moment((b?.createdAt?.seconds ?? 0) * 1000);

      return dateB.diff(dateA);
    }),
  };
};
