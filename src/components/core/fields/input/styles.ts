// Packages
import styled, { css } from 'styled-components';

export const InputContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: ${theme.colors.text};

    .ant-input-outlined {
      background-color: ${theme.colors.inputBackground};
      color: ${theme.colors.text};
      border-color: ${theme.colors.border};
    }

    input,
    span,
    .label {
      color: ${theme.colors.text} !important;

      &::placeholder {
        color: ${theme.colors.text};
      }
    }

    svg {
      color: ${theme.colors['gray-300']};
    }
  `}
`;
