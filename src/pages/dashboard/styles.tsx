// Packages
import styled, { css } from 'styled-components';

export const DashboardContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding-top: 20px;
    padding-bottom: 20px;

    .dashboard__infos {
      display: grid;
      justify-content: space-between;
      grid-template-columns: repeat(4, 1fr);

      width: 90%;
      margin-bottom: 40px;
      gap: 10px;

      @media (max-width: ${theme.breakpoints.XL}) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: ${theme.breakpoints.SM}) {
        grid-template-columns: 1fr;
      }
    }

    .dashboard__charts {
      width: 90%;
      gap: 30px;
      display: flex;
      flex-direction: column;
    }
  `}
`;
