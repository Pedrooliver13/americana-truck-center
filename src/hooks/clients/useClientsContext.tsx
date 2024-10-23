// Packages
import { useContext } from 'react';

// Contexts
import { ClientsContext } from 'contexts/clientContext';

export const useClientsContext = () => {
  return useContext(ClientsContext);
};
