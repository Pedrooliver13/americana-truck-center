// Packages
import { theme } from 'antd';

export const darkAntTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#1677ff', // Azul padrão do Ant Design
    colorBgBase: '#141414', // Fundo principal escuro
    colorTextBase: '#ffffff', // Texto principal branco
    borderRadius: 8, // Borda arredondada
    colorSuccess: '#52c41a', // Verde para sucesso
    colorWarning: '#faad14', // Amarelo para avisos
    colorError: '#ff4d4f', // Vermelho para erros
  },
  components: {
    Button: {
      colorPrimary: '#1890ff', // Cor primária dos botões
      colorPrimaryHover: '#40a9ff', // Hover dos botões primários
      colorBgBase: '#1f1f1f', // Fundo dos botões
      borderRadius: 6,
    },
    Input: {
      colorBgContainer: '#1f1f1f', // Fundo do input
      colorBorder: '#434343', // Cor da borda
      colorText: '#ffffff', // Cor do texto
      borderRadius: 6,
      hoverBg: '#2a2a2a',
      colorTextPlaceholder: '#8c8c8c',
    },
    Card: {
      colorBgContainer: '#1e1e1e', // Fundo do card
      colorBorder: '#303030', // Borda do card
      borderRadius: 10,
    },
    Modal: {
      colorBgContainer: '#202020', // Fundo do modal
      colorText: '#ffffff', // Texto do modal
    },
    Select: {
      colorBgContainer: '#1f1f1f', // Fundo do select
      colorBorder: '#434343', // Cor da borda
      colorText: '#ffffff', // Cor do texto
      borderRadius: 6,
      selectorBg: '#1f1f1f',
      optionSelectedBg: '#2a2a2a',
    },
  },
};
