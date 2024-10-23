// Packages
import { useContext } from 'react';

// Contexts
import { DashboardContext } from 'contexts/dashboardContext';

export const useDashboardContext = () => {
  return useContext(DashboardContext);
};
