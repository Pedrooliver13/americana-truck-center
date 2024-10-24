// Packages
import { ReactElement } from 'react';

// Components
import { StatusCard } from 'components/core';
import { SalesOverview } from 'components/shared';

// Hooks
import { useDashboardContext } from 'hooks/dashboard/useDashboardContext';

// Assets
import UsersImage from 'assets/users.svg';
import SalesImage from 'assets/sales.svg';
import VehiclesImage from 'assets/vehicles.svg';
import PendingImage from 'assets/pending.svg';

// Styles
import * as Styled from './styles';

export const Dashboard = (): ReactElement => {
  const { totalClients, totalTasks, totalPrices } = useDashboardContext();

  return (
    <Styled.DashboardContainer>
      <div className="container dashboard__infos">
        <StatusCard
          title="Nº de clientes"
          value={totalClients}
          icon={<img src={UsersImage} alt="Icon" />}
        />
        <StatusCard
          title="Nº de serviços"
          value={totalTasks}
          bgicon="#D9F7E8"
          icon={<img src={SalesImage} alt="Icon" />}
        />
        <StatusCard
          title="Nº de Preços"
          value={totalPrices}
          bgicon="#FFF3D6"
          icon={<img src={VehiclesImage} alt="Icon" />}
        />
        <StatusCard
          title="Pendentes"
          value="0"
          bgicon="#FFEEF0"
          icon={<img src={PendingImage} alt="Icon" />}
        />
      </div>

      <div className="container dashboard__charts">
        <SalesOverview />
      </div>
    </Styled.DashboardContainer>
  );
};
