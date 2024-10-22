// Packages
import { useContext } from 'react';

// Contexts
import { PricesContext } from 'contexts/priceContext';

export const usePricesContext = () => {
  return useContext(PricesContext);
};
