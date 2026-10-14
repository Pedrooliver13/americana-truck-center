// Packages
import { useQuery } from '@tanstack/react-query';

// Models
import { Report } from 'models/reports/reports';

// Services
import { getByIdReport } from 'services/reports/getByIdReport';

export const useGetByIdReport = (id?: string) => {
  const response = useQuery<Report>({
    queryKey: ['report-by-id', id],
    queryFn: () => getByIdReport(id) as Promise<Report>,
    enabled: Boolean(id),
  });

  return response;
};
