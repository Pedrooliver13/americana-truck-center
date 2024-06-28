// Packages
import styled, { css } from 'styled-components';

export const TasksContainer = styled.div`
  ${({ theme }) => css`
    padding-top: 20px;
    padding-bottom: 20px;

    .tasks__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 40px;

      @media (max-width: ${theme.breakpoints.SM}) {
        flex-direction: column;
        align-items: center;
        gap: 20px;
      }
    }

    .tasks__actions {
      display: flex;
      align-items: center;
      gap: 20px;
      margin: 20px 0;

      @media (max-width: ${theme.breakpoints.MD}) {
        display: none;
      }
    }

    .tasks-table__expands {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 20px;
      margin-left: 20px;
      line-height: 2;
    }
  `}
`;
