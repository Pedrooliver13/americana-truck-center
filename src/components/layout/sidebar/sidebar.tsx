// Packages
import { ReactElement } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  onToggle: () => void;
}

export const Sidebar = (props: SidebarProps): ReactElement => {
  const navigate = useNavigate();

  return (
    <Styled.SidebarContainer
      collapsible
      collapsed={props.isOpen}
      width={250}
      trigger={null}
    >
      <Link to="/">
        <img className="sidebar__logo" src={TruckCenterLogo} alt="Logo marca" />
      </Link>

      <Menu
        className="sidebar__menu"
        defaultSelectedKeys={['1']}
        // defaultOpenKeys={['sub1']}
        mode="inline"
        items={[
          /* Dashboard */
          {
            key: '1',
            icon: <DashboardOutlinedIcon />,
            label: 'Dashboard',
            onClick: () => navigate('/'),
          },

          /* ITEMS */
          {
            type: 'divider',
          },
          {
            key: '2',
            label: !props.isOpen && 'Serviços',
            type: 'group',
            children: [
              {
                key: '2-1',
                icon: <CarOutlinedIcon />,
                onClick: () => navigate('/services'),
                label: 'Serviços',
              },
            ],
          },
          {
            key: '3',
            icon: <UserOutlinedIcon />,
            label: 'Clientes',
            onClick: () => navigate('/clientes'),
          },
          {
            key: '4',
            icon: <DollarOutlinedIcon />,
            label: 'Preços',
            onClick: () => navigate('/prices'),
          },
          {
            key: '5',
            icon: <PieChartOutlinedIcon />,
            label: 'Relatórios',
            onClick: () => navigate('/reports'),
          },

          /* FOOTER */
          {
            type: 'divider',
            className: 'sidebar__footer',
          },
          {
            key: '6',
            icon: <SettingOutlinedIcon />,
            label: 'Configurações',
            onClick: () => navigate('/settings'),
          },
          {
            key: '7',
            icon: <PoweroffOutlinedIcon />,
            label: 'Sair',
          },
        ]}
      />
    </Styled.SidebarContainer>
  );
};
