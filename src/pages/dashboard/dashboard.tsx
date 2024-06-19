// Packages
import { ReactElement } from 'react';

// Components
import { SalesOverview } from 'components/core';

// Styles
import * as Styled from './styles';

export const Dashboard = (): ReactElement => {
  return (
    <Styled.DashboardContainer>
      <div className="container dashboard__infos">
        <div>preços</div>
        <div>preços</div>
        <div>preços</div>
        <div>preços</div>
        <div>preços</div>
        <div>preços</div>
      </div>

      <div className="dashboard__charts">
        <SalesOverview />
      </div>
    </Styled.DashboardContainer>
  );
};
