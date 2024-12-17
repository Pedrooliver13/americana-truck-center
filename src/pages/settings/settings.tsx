// Packages
import { ReactElement } from 'react';
import { Tabs } from 'antd';

// Pages
import { ForgotPasswordTab } from 'pages/settings/tabs/forgotPasswordTab/forgotPasswordTab';

// Styles
import * as Styled from './styles';

export const Settings = (): ReactElement => {
  return (
    <Styled.SettingsContainer className="container" id="#settings">
      <Tabs
        tabPosition="left"
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
