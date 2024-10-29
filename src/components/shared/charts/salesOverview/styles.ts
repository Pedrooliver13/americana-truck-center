// Packages
import styled, { css } from 'styled-components';

export const SalesOverviewContainer = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    max-width: 100%;
    padding: 3rem;
    border-radius: 12px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

    .salesOverview__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;

      margin-bottom: 2rem;

      div {
        max-width: 300px;
        width: 100%;
      }
    }
  `}
`;
