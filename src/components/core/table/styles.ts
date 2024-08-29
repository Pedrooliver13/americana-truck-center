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
      align-items: center;
      justify-content: space-around;

      max-width: 100px;
      margin: 0 auto;
      background-color: ${theme.colors['gray-200']};
      color: ${theme.colors['gray-400']};
      border: 1px solid ${theme.colors['gray-300']};
      border-radius: 8px;
      padding: 2px;

      &--normal {
        color: ${theme.colors['gray-400']};
      }

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
