// Packages
import { ReactElement, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

// Routes
import { Router } from 'router';

// Styles
import { GlobalStyle } from 'styles/global';
import { darkTheme } from 'styles/theme/dark';
import { defaultTheme } from 'styles/theme/default';

function App(): ReactElement {
  const [theme] = useState<'default' | 'dark'>('default');
  const currentTheme = theme === 'dark' ? defaultTheme : darkTheme;

  return (
    <ThemeProvider theme={currentTheme as typeof defaultTheme}>
      <GlobalStyle />

      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
