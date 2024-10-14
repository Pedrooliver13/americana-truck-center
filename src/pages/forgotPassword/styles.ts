// Packages
import styled, { css } from 'styled-components';

export const ForgotPasswordContainer = styled.div`
  ${({ theme }) => css`
    max-width: 400px;
    width: 100%;
    padding: 0 30px;
    margin-top: 60px;

    @media (max-width: ${theme.breakpoints.MD}) {
      max-width: 100%;
    }

    img {
      max-width: 200px;
      display: flex;
      align-self: center;
    }

    span {
      font-weight: lighter;
    }

    .header {
      margin-bottom: 30px;

      h1 {
        font-size: 2.5rem;
      }
    }

    .button {
      margin-top: 24px;
    }

    .footer {
      margin-top: 10px;
      display: flex;
      justify-content: center;
    }
  `}
`;
