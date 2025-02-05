// Packages
import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { FloatButton, ConfigProvider } from 'antd';
import { ToastContainer } from 'react-toastify';
import ptBR from 'antd/lib/locale/pt_BR';

// Contexts
import { useGlobalContext } from 'contexts/globalContext';

// Routes
import { Router } from 'router/router';

// Styles
import { darkAntTheme } from 'styles/theme/ant/antDark';
import { GlobalStyle } from 'styles/global';
import { defaultTheme } from 'styles/theme/default';
import { darkTheme } from 'styles/theme/dark';
import 'react-toastify/dist/ReactToastify.css';

export const DefaultProvider = (): ReactElement => {
  const { theme } = useGlobalContext();

  const isDarkTheme = theme === 'dark';

  return (
    <ConfigProvider
      locale={ptBR}
      theme={isDarkTheme ? darkAntTheme : undefined}
    >
      <ThemeProvider
        theme={
          isDarkTheme
            ? (darkTheme as unknown as typeof defaultTheme)
            : defaultTheme
        }
      >
        <GlobalStyle />

        <BrowserRouter>
          <Router />
        </BrowserRouter>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          style={{
            fontSize: '14px',
            zIndex: 99999,
          }}
        />
        <FloatButton.BackTop tooltip="Voltar para o topo!" />
      </ThemeProvider>
    </ConfigProvider>
  );
};
