// Packages
import { ReactElement, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import {
  DashboardOutlined as DashboardOutlinedIcon,
  CarOutlined as CarOutlinedIcon,
  UserOutlined as UserOutlinedIcon,
  DollarOutlined as DollarOutlinedIcon,
  SettingOutlined as SettingOutlinedIcon,
  PoweroffOutlined as PoweroffOutlinedIcon,
  IdcardOutlined as IdcardOutlinedIcon,
} from '@ant-design/icons';

// Hooks
import { useSignOut } from 'hooks/login/useSignOut';

// Assets
import TruckCenterLogo from 'assets/truck-center.png';

// Styles
import * as Styled from './styles';

interface SidebarProps {
  isOpen: boolean;
  onToggle: (status?: boolean) => void;
}

export const Sidebar = (props: SidebarProps): ReactElement => {
  const location = useLocation();
  const { mutate } = useSignOut();
  const [isMobile, setIsMobile] = useState(false);

  const currentCollapsedWidth = isMobile ? 0 : 80;
  const isShowTriggerButton = isMobile && !props.isOpen;

  const handleBreakpoint = (broken: boolean) => {
    if (broken && !isMobile) {
      setIsMobile(true);
      return;
    }

    if (broken && props.isOpen && isMobile) {
      props.onToggle();
    }

    setIsMobile(false);
  };

  return (
    <Styled.SidebarContainer
      collapsible
      collapsed={props.isOpen}
      width={250}
      breakpoint="lg"
      collapsedWidth={currentCollapsedWidth}
      trigger={
        isShowTriggerButton ? <div className="sidebar__outline" /> : null
      }
      onCollapse={() => props.onToggle()}
      onBreakpoint={handleBreakpoint}
    >
      <a href="/" className="sidebar__logo">
        <img src={TruckCenterLogo} alt="Logo marca" loading="lazy" />
      </a>
      <Menu
        className="sidebar__menu"
        selectedKeys={[location.pathname]}
        mode="inline"
        items={[
          /* Dashboard */
          {
            key: '/',
            icon: <DashboardOutlinedIcon />,
            label: <Link to={'/'}>Dashboard</Link>,
          },

          /* ITEMS */
          {
            type: 'divider',
          },
          {
            key: '1',
            label: !props.isOpen && 'Serviços',
            type: 'group',
            children: [
              {
                key: '/tasks',
                icon: <CarOutlinedIcon />,
                label: <Link to={'/tasks'}>Serviços</Link>,
              },
            ],
          },
          {
            key: '/clients',
            icon: <UserOutlinedIcon />,
            label: <Link to={'/clients'}>Clientes</Link>,
          },
          {
            key: '/drivers',
            icon: <IdcardOutlinedIcon />,
            label: <Link to={'/drivers'}>Motoristas</Link>,
          },
          {
            key: '/prices',
            icon: <DollarOutlinedIcon />,
            label: <Link to={'/prices'}>Preços</Link>,
          },

          /* FOOTER */
          {
            type: 'divider',
            className: 'sidebar__footer',
          },
          {
            key: '/settings',
            icon: <SettingOutlinedIcon />,
            label: <Link to={'/settings'}>Configurações</Link>,
          },
          {
            key: '/logout',
            icon: <PoweroffOutlinedIcon />,
            label: (
              <Link to={'/login'} onClick={() => mutate()}>
                Sair
              </Link>
            ),
          },
        ]}
      />
    </Styled.SidebarContainer>
  );
};
