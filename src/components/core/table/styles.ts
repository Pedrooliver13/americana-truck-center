// Packages
import styled, { css } from 'styled-components';
import { Table, TableProps } from 'antd';

export const TableAntDesign = styled(Table)<TableProps>`
  ${({ theme }) => css`
    overflow: hidden;
    border-radius: 16px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    /* .ant-table-content {
      background-color: ${theme.colors.background};
      color: ${theme.colors.text};
    }

    .ant-table-row:hover {
      background-color: ${theme.colors.background};
      border-bottom: 1px solid red;
    } */

    .ant-pagination {
      padding: 0px 20px;
    }

    .table__actions {
      display: flex;
      align-items: center;
      justify-content: space-around;

      max-width: 100px;
      margin: 0 auto;
      background-color: ${theme.colors['gray-200']};
      border: 1px solid ${theme.colors['gray-300']};
      border-radius: 8px;
      padding: 2px;

      button + button {
        border-left: 1px solid ${theme.colors['gray-300']};
      }

      button {
        flex: 1;
        border-radius: 0;
      }
    }
  `}
`;
