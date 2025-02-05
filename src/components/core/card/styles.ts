// Packages
import styled, { css } from 'styled-components';
import { Card as CardAntDesign, CardProps as CardAntDesignProps } from 'antd';

interface CardProps extends CardAntDesignProps {
  $currentTheme: 'light' | 'dark';
}

export const CardContainer = styled(CardAntDesign)<CardProps>`
  ${({ theme, $currentTheme }) => css`
    background-color: ${theme.colors.background};
    border: ${theme.colors.border};

    ${$currentTheme !== 'dark' &&
    css`
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    `}
  `}
`;
