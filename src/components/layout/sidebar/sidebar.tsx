// Packages
import { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import {
  DashboardOutlined as DashboardOutlinedIcon,
  CarOutlined as CarOutlinedIcon,
  UserOutlined as UserOutlinedIcon,
  DollarOutlined as DollarOutlinedIcon,
  PieChartOutlined as PieChartOutlinedIcon,
  SettingOutlined as SettingOutlinedIcon,
  PoweroffOutlined as PoweroffOutlinedIcon,
} from '@ant-design/icons';

// Assets
import TruckCenterLogo from 'assets/truck-center.png';

// Styles
import * as Styled from './styles';

interface SidebarProps {
  isOpen: boolean;
  onToggle: (status?: boolean) => void;
}

export const Sidebar = (props: SidebarProps): ReactElement => {
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
        <img src={TruckCenterLogo} alt="Logo marca" />
      </a>
      <Menu
        className="sidebar__menu"
        defaultSelectedKeys={[location.pathname]}
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
            key: '/prices',
            icon: <DollarOutlinedIcon />,
            label: <Link to={'/prices'}>Preços</Link>,
          },
          {
            key: '/reports',
            icon: <PieChartOutlinedIcon />,
            label: <Link to={'/prices'}>Relatórios</Link>,
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
            label: <Link to={'/logout'}>Sair</Link>,
          },
        ]}
      />
    </Styled.SidebarContainer>
  );
};
