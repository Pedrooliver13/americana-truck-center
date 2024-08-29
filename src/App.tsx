// Packages
import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { FloatButton, ConfigProvider, theme } from 'antd';
import { ToastContainer } from 'react-toastify';
import ptBR from 'antd/lib/locale/pt_BR';

// Routes
import { Router } from 'router';

// Styles
import { GlobalStyle } from 'styles/global';
import { darkTheme } from 'styles/theme/dark';
import { defaultTheme } from 'styles/theme/default';
import { darkAntTheme } from 'styles/theme/ant/antDark';
import 'react-toastify/dist/ReactToastify.css';

function App(): ReactElement {
  const currentTheme = localStorage.getItem('theme') || 'light';
  const isDarkMode = currentTheme === 'dark';

  return (
    <ConfigProvider
      locale={ptBR}
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        components: isDarkMode ? darkAntTheme : {},
      }}
    >
      <ThemeProvider
        theme={(!isDarkMode ? defaultTheme : darkTheme) as typeof defaultTheme}
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
        />
        <FloatButton.BackTop tooltip="Voltar para o topo!" />
      </ThemeProvider>
    </ConfigProvider>
  );
}

export default App;
