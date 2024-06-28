// Packages
import styled, { css } from 'styled-components';

export const InputContainer = styled.div`
  ${({ theme }) => css`
    svg {
      color: ${theme.colors['gray-300']};
    }
  `}
`;
