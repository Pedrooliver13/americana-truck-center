// Packages
import styled, { css } from 'styled-components';

interface InputContainerProps {
  $currentTheme: 'light' | 'dark';
}

export const InputContainer = styled.div<InputContainerProps>`
  ${({ theme, $currentTheme }) => css`
    display: flex;
    justify-content: center;
    flex-direction: column;

    input {
      background-color: ${theme.colors['inputBackground']};
      border-color: ${theme.colors['inputBorder']};
      color: ${theme.colors.text};

      ${$currentTheme === 'dark' &&
      css`
        &.ant-input-status-error {
          background: transparent !important;
        }

        &::placeholder {
          color: ${theme.colors['placeholder']};
        }

        &:focus {
          background: transparent !important;
        }

        &:not(:disabled):hover {
          background-color: ${theme.colors.inputHover} !important;
        }

        &:disabled {
          color: rgba(255, 255, 255, 0.25);
          background-color: rgba(255, 255, 255, 0.08);
          border-color: #434343;
          box-shadow: none;
          cursor: not-allowed;
          opacity: 1;
        }

        :where(
            .css-dev-only-do-not-override-m4timi
          ).ant-input-outlined.ant-input-status-error:not(.ant-input-disabled) {
          background-color: red !important;
        }
      `}
    }

    svg {
      color: ${theme.colors['gray-300']};
    }
  `}
`;
