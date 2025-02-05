// Packages
import { forwardRef, ReactElement } from 'react';
import {
  MoonOutlined as MoonOutlinedIcon,
  SunOutlined as SunOutlinedIcon,
} from '@ant-design/icons';

// Components
import { Button } from 'components/core';

// Contexts
import { useGlobalContext } from 'contexts/globalContext';

interface ButtonThemeProps {}

const ButtonThemeBase = (
  props: ButtonThemeProps,
  ref:
    | ((instance: HTMLButtonElement | HTMLAnchorElement | null) => void)
    | React.RefObject<HTMLButtonElement | HTMLAnchorElement>
    | null
    | undefined
): ReactElement => {
  const { theme, setTheme } = useGlobalContext();
  const isDarkMode = theme === 'dark';

  const handleClick = () => {
    localStorage.setItem(
      '@americana-truck-center:theme-state-1.0.0',
      isDarkMode ? 'light' : 'dark'
    );

    setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <Button ref={ref} size="large" onClick={handleClick} {...props}>
      {isDarkMode ? <SunOutlinedIcon /> : <MoonOutlinedIcon />}
    </Button>
  );
};

export const ButtonTheme = forwardRef(ButtonThemeBase);
