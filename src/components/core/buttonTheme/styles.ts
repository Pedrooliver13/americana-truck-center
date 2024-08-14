// Packages
import styled, { css } from 'styled-components';

interface ButtonThemeContainerProps {
  currenttheme: 'light' | 'dark';
}

export const ButtonThemeContainer = styled.button<ButtonThemeContainerProps>`
  ${({ theme, currenttheme }) => css`
    background-color: ${currenttheme === 'light'
      ? '#fff3d6'
      : theme.colors['purple-100']};

    border-radius: 50%;
    border: 4px solid transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    padding: 1rem;

    svg {
      color: ${currenttheme === 'light'
        ? theme.colors.text
        : theme.colors['gray-400']};
    }

    &:hover {
      border-color: ${currenttheme === 'light'
        ? theme.colors.yellow
        : theme.colors['purple']};
    }
  `}
`;
