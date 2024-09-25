// Packages
import { ReactElement } from 'react';
import { Dropdown, Avatar as AvatarAntDesign } from 'antd';
import { DownOutlined as DownOutlinedIcon } from '@ant-design/icons';

// Components
import { Button } from 'components/core';

// Assets
import AdminAvatarImage from 'assets/admin.png';

// Styles
import * as Styled from './styles';

// Hooks
import { useSignOut } from 'hooks/login/useSignOut';

// Contexts
import { useAuth } from 'contexts/authContext';

export const Avatar = (): ReactElement => {
  const { currentUser } = useAuth();
  const { mutate } = useSignOut();

  return (
    <Dropdown
      menu={{
        items: [
          {
            label: 'Configurações',
            key: '1',
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
          icon={<img src={AdminAvatarImage} alt="User avatar image" />}
        />

        <div className="avatar__infos">
          <p>{currentUser?.email}</p>
          <span>Admin</span>
        </div>

        <Button shape="circle" size="small">
          <DownOutlinedIcon />
        </Button>
      </Styled.AvatarContainer>
    </Dropdown>
  );
};
