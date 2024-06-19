// Packages
import { ReactElement } from 'react';

// Components
import { SalesOverview } from 'components/core';

// Styles
import * as Styled from './styles';

export const Dashboard = (): ReactElement => {
  return (
    <Styled.DashboardContainer className="container">
      <SalesOverview />
    </Styled.DashboardContainer>
  );
};
