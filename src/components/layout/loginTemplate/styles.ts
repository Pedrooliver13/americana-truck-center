// Packages
import styled, { css } from 'styled-components';

export const LoginContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;

    @media (max-width: ${theme.breakpoints.MD}) {
      height: 100vh;
      justify-content: center;
    }

    .background {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 3rem;
      max-width: 65%;
      width: 100%;
      height: 100vh;
      padding: 90px;
      background: linear-gradient(#0575e6, #02298a, #021b79);
      color: ${theme.colors.white};

      &__logo {
        max-width: 100%;
        width: 350px;
        z-index: 1;
      }

      &__generic-01,
      &__generic-02 {
        position: absolute;
        max-width: 100%;
        width: 450px;
        opacity: 0.5;
      }

      &__generic-01 {
        top: 0;
        right: 0;
        transform: rotate(180deg);
      }

      &__generic-02 {
        bottom: 0;
        left: 0;
      }

      @media (max-width: ${theme.breakpoints.MD}) {
        display: none;
      }
    }
  `}
`;
