// Packages
import styled, { css } from 'styled-components';

export const HeaderContainer = styled.header`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};

    .content {
      display: flex;
      align-items: center;
      justify-content: space-between;

      padding: 1rem 1.5rem;
      min-height: 70px;
    }
  `}
`;
