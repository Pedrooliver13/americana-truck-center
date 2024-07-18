// Packages
import styled, { css } from 'styled-components';

export const HeaderContainer = styled.header`
  ${({ theme }) => css`
    background-color: ${theme.colors.background};

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

        @media (max-width: ${theme.breakpoints.MD}) {
          display: none;
        }

        &--input {
          border-radius: 20px;
          background-color: ${theme.colors.body} !important;
          color: ${theme.colors.text} !important;
          border-color: ${theme.colors.body};

          ::placeholder {
            color: ${theme.colors['gray-300']};
          }
        }

        input {
          padding-left: 0.5rem;
        }

        button {
          border: 0;
          background-color: transparent;
        }
      }

      &__avatar {
        margin-left: auto;
        max-width: 180px;
        width: 100%;
        cursor: pointer;

        @media (max-width: ${theme.breakpoints.MD}) {
          max-width: 80px;
        }
      }
    }
  `}
`;
