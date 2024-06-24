// Packages
import { ReactElement } from 'react';
import { Button, Dropdown, Avatar as AvatarAntDesign } from 'antd';
import { DownOutlined as DownOutlinedIcon } from '@ant-design/icons';

// Assets
import AdminAvatarImage from 'assets/admin.png';

// Styles
import * as Styled from './styles';

export const Avatar = (): ReactElement => {
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
          <p>Júlia</p>
          <span>Admin</span>
        </div>

        <Button size="small">
          <DownOutlinedIcon />
        </Button>
      </Styled.AvatarContainer>
    </Dropdown>
  );
};
