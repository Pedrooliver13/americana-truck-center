// Packages
import styled, { css } from 'styled-components';

export const PriceContainer = styled.div`
  ${({ theme }) => css`
    padding-top: 20px;
    padding-bottom: 20px;

    .prices__header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      gap: 10px;
      margin-bottom: 40px;

      h1 {
        font-size: 2.5rem;
      }

      @media (max-width: ${theme.breakpoints.SM}) {
        flex-direction: column;
        align-items: center;
        gap: 20px;
      }
    }

    .prices__actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      margin: 20px 0;
      color: ${theme.colors.text};

      &--search {
        display: flex;
        align-items: center;
        gap: 5px;
      }

      @media (max-width: ${theme.breakpoints.MD}) {
        display: none;
      }
    }

    .prices-table__expands {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 20px;
      margin-left: 20px;
      line-height: 2;
    }
  `}
`;
