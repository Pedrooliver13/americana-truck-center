// Packages
import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

// Routes
import { Router } from 'router';

// Styles
import { GlobalStyle } from 'styles/global';
import { defaultTheme } from 'styles/theme/default';

function App(): ReactElement {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
