// Packages
import styled, { css } from 'styled-components';

export const PricesTableContainer = styled.div`
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
        display: flex;
        gap: 10px;
        font-size: 2.5rem;

        #info-icon {
          font-size: 1.5rem;
          color: ${theme.colors.primary};
        }
      }

      @media (max-width: ${theme.breakpoints.SM}) {
        flex-direction: column;
        align-items: center;
        gap: 20px;
      }
    }

    .ant-card-body.prices-card {
      @media (max-width: ${theme.breakpoints.MD}) {
        padding: 0 !important;
        margin: 0;
        position: none;
      }
    }

    .prices-card__actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      color: ${theme.colors.text};
      border-radius: 8px;

      &--search {
        display: flex;
        align-items: center;
        gap: 5px;
      }

      &--columns {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 100px;
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
