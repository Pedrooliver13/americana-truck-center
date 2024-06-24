// Packages
import styled, { css } from 'styled-components';

export const HeaderContainer = styled.header`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};

    .content {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 1rem 2.5rem;
      min-height: 70px;

      &__search {
        max-width: 400px;
        max-height: 40px;
        width: 100%;

        &--input {
          border-radius: 20px;
        }

        input {
          padding-left: 0.5rem;
        }

        button {
          border: 0;
          background-color: transparent;
        }
      }
    }
  `}
`;
