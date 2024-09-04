// Packages
import styled, { css } from 'styled-components';
import { Table, TableProps } from 'antd';

export const TableAntDesign = styled(Table)<TableProps>`
  ${({ theme }) => css`
    overflow: hidden;
    border-radius: 16px;

    .ant-table-content {
      background-color: ${theme.colors.background};
      color: ${theme.colors.text};
      min-height: 250px;
    }

    .ant-table-content.ant-table-row-hover:hover {
      background-color: ${theme.colors.background} !important;
      filter: brightness(195%);
    }

    .ant-pagination {
      margin: 0 !important;
      padding: 8px 20px;
      background-color: ${theme.colors.body};
      color: ${theme.colors.text};
    }

    .table__actions {
      display: flex;
      justify-content: space-around;
      max-width: 100px;
      width: fit-content;
      margin: 0 auto;
      background-color: ${theme.colors['gray-200']} !important;
      color: ${theme.colors['gray-400']};
      border: 1px dashed ${theme.colors['gray-300']};
      border-radius: 8px;

      &--normal {
        color: ${theme.colors['gray-400']};
      }

      button {
        width: 30px;
        border-radius: 8px;
      }
    }
  `}
`;
