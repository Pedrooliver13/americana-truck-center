// Packages
import { ReactElement } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Components
import { DefaultProvider } from 'components/layout';

// Contexts
import { GlobalProvider } from 'contexts/globalContext';

// Libs
import { queryClient } from 'libs/queryClient';

function App(): ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <GlobalProvider>
        <DefaultProvider />
      </GlobalProvider>
    </QueryClientProvider>
  );
}

export default App;
