// Packages
import { useContext } from 'react';

// Contexts
import { ReportsContext } from 'contexts/reportsContext';

export const useReportsContext = () => {
  return useContext(ReportsContext);
};
