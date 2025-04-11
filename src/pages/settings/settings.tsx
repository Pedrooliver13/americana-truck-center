// Packages
import { ReactElement } from 'react';
import { Tabs } from 'antd';

// Pages
import { ForgotPasswordTab } from 'pages/settings/tabs/forgotPasswordTab/forgotPasswordTab';

// Hooks
import { useIsMobile } from 'hooks/core/useMobile';

// Styles
import * as Styled from './styles';

export const Settings = (): ReactElement => {
  const isMobile = useIsMobile();

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
        ]}
      />
    </Styled.SettingsContainer>
  );
};
