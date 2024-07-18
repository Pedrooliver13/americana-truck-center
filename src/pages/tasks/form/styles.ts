// Packages
import styled, { css } from 'styled-components';

export const TasksFormContainer = styled.div`
  ${({ theme }) => css`
    padding-top: 20px;

    .tasks__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    .tasks__total {
      font-weight: bold;
      font-size: 1.5rem;
      padding: 0.5rem;
    }

    .tasks-form {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;

      &__fields {
        width: 650px;

        @media (max-width: ${theme.breakpoints.XL}) {
          width: 100%;
        }
      }

      &__price {
        flex: 1;
        max-width: 100%;
        max-height: 450px;

        @media (max-width: ${theme.breakpoints.SM}) {
          max-width: 100%;
          min-width: 100%;
          width: 100%;
        }
      }
    }
  `}
`;
