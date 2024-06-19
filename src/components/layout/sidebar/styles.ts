// Packages
import styled, { css } from 'styled-components';
import { Layout } from 'antd';

export const SidebarContainer = styled(Layout.Sider)`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    background: ${theme.colors.white};
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    z-index: 9999;
    top: 0;
    left: 0;
    height: 100vh;
    transition: all 0.3s;

    .sidebar__logo {
      height: 15vh;
      display: flex;
      margin: 0 auto;
    }

    .sidebar__menu {
      display: flex;
      flex-direction: column;
      font-size: 1.6rem;
      height: calc(100vh - 15vh);

      .ant-menu-item {
        position: relative;
        display: flex;
        align-items: center;
        height: 50px;
      }

      .ant-menu-item-selected {
        background-color: ${theme.colors.primary};
        color: ${theme.colors.white};
      }
    }

    .sidebar__footer {
      margin-top: auto;
    }
  `}
`;
