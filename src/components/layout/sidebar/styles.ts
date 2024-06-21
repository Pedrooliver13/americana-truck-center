// Packages
import styled, { css } from 'styled-components';
import { Layout } from 'antd';

export const SidebarContainer = styled(Layout.Sider)`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    z-index: 9999;
    top: 0;
    left: 0;
    transition: all 0.3s ease-in-out;

    @media (max-width: ${theme.breakpoints.LG}) {
      position: fixed;
      transition: all 0.1s ease-in-out;

      .ant-menu-inline-collapsed {
        width: 0;
      }

      .sidebar__outline {
        width: 100vw;
        height: 100vh;
        position: fixed;
        z-index: -1;
        top: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.5);
      }
    }

    .ant-layout-sider-children {
      width: inherit;
      position: fixed;
      background-color: ${theme.colors.white};
      box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    }

    .sidebar__logo img {
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
