// Packages
import { ReactElement } from 'react';
import { Button, Tabs } from 'antd';

// Pages
import { ForgotPasswordTab } from 'pages/settings/tabs/forgotPasswordTab/forgotPasswordTab';

// Hooks
import { useIsMobile } from 'hooks/core/useMobile';
import { usePutUser } from 'hooks/users/usePutPrice';

// Contexts
import { useGlobalContext } from 'contexts/globalContext';

// Styles
import * as Styled from './styles';

export const Settings = (): ReactElement => {
  const isMobile = useIsMobile();
  const { allUsers } = useGlobalContext();
  const { mutateAsync: putUser } = usePutUser();

  console.log('allUsers', allUsers);

  return (
    <Styled.SettingsContainer className="container" id="#settings">
      <Tabs
        tabPosition={isMobile ? 'top' : 'left'}
        items={[
          {
            label: `Alterar senha`,
            key: '1',
            children: <ForgotPasswordTab />,
            animated: true,
          },
          {
            label: `Alterar perfil`,
            key: '2',
            children: (
              <>
                <Button
                  type="primary"
                  onClick={async () => {
                    await putUser({
                      email: 'financeiro@americanatruckcenter.com.br',
                      id: 'y7r9dJFXvMJSBJiZgiIA',
                      roles: [1, 2],
                    });
                  }}
                >
                  Alterar perfil para normal
                </Button>
              </>
            ),
            animated: true,
          },
        ]}
      />
    </Styled.SettingsContainer>
  );
};
