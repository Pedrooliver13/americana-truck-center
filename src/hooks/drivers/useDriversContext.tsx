// Packages
import { useContext } from 'react';

// Contexts
import { DriversContext } from 'contexts/driversContext';

export const useDriversContext = () => {
  return useContext(DriversContext);
};
