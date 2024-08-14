// Packages
import { ReactElement } from 'react';
import { SunOutlined as SunOutlinedIcon } from '@ant-design/icons';

// Styles
import * as Styled from './styles';

export const ButtonTheme = (): ReactElement => {
  const currentTheme = localStorage.getItem('theme') as 'light' | 'dark';

  const handleToggleTheme = () => {
    const isDarkMode = currentTheme === 'dark';

    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
    window.location.reload();
  };

  return (
    <Styled.ButtonThemeContainer
      currenttheme={currentTheme}
      onClick={handleToggleTheme}
    >
      <SunOutlinedIcon />
    </Styled.ButtonThemeContainer>
  );
};
