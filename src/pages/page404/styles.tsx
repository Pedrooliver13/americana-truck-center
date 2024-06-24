// Packages
import styled from 'styled-components';

// Assets
import backgroudImage404 from 'assets/404-2.svg';
import { css } from 'styled-components';

export const Page404Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 80vh;

    background: url(${backgroudImage404}) no-repeat center;
    background-size: 400px;

    @media (max-width: ${theme.breakpoints.MD}) {
      background-size: 300px;
    }

    img {
      width: 400px;
      margin: 30px auto;

      @media (max-width: ${theme.breakpoints.MD}) {
        background-size: 280px;
        margin: 60px auto;
      }
    }

    p {
      text-align: center;
      font-size: 3rem;
      font-weight: 900;
    }
  `}
`;
