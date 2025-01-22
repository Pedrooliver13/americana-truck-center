// Packages
import { ReactElement } from 'react';
import { Dropdown, Avatar as AvatarAntDesign } from 'antd';
import { DownOutlined as DownOutlinedIcon } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

// Components
import { Button } from 'components/core';

// Styles
import * as Styled from './styles';

// Hooks
import { useSignOut } from 'hooks/login/useSignOut';

// Contexts
import { useAuth } from 'contexts/authContext';

export const Avatar = (): ReactElement => {
  const navigate = useNavigate();
  const { currentUser, isAdmin } = useAuth();
  const { mutate } = useSignOut();

  return (
    <Dropdown
      menu={{
        items: [
          {
            label: 'Configurações',
            key: '1',
            onClick: () => navigate('/settings'),
          },
          {
            label: 'Sair',
            key: '2',
            onClick: () => mutate(),
          },
        ],
      }}
      trigger={['click']}
      arrow
    >
      <Styled.AvatarContainer>
        <AvatarAntDesign
          size="large"
          style={{
            backgroundColor: '#8280FF',
            textTransform: 'uppercase',
            fontWeight: 'bold',
          }}
        >
          {currentUser?.email.charAt(0)}
        </AvatarAntDesign>

        <div className="avatar__infos">
          <p>{currentUser?.email}</p>
          <span>{isAdmin ? 'admin' : 'usuário'}</span>
        </div>

        <Button shape="circle" size="small">
          <DownOutlinedIcon />
        </Button>
      </Styled.AvatarContainer>
    </Dropdown>
  );
};
