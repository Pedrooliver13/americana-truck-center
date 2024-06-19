// Packages
import styled, { css } from 'styled-components';

export const HeaderContainer = styled.header`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};

    .content {
      display: flex;
      align-items: center;
      padding: 1rem 1.5rem;
      min-height: 70px;
    }
  `}
`;
