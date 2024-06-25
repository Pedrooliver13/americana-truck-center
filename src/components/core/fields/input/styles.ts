// Packages
import styled, { css } from 'styled-components';

export const InputContainer = styled.div`
  ${({ theme }) => css`
    svg {
      color: ${theme.colors['gray-300']};
    }

    .input-error {
      font-size: 1.4rem;
      color: red;
    }
  `}
`;
