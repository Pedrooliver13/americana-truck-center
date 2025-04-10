// Packages
import { ReactElement } from 'react';

// Components
import { StatusCard } from 'components/core';
import { SalesOverview } from 'components/shared';
import { TasksStatusCard } from 'components/shared/tasksStatusCard';

// Hooks
import { useDashboardContext } from 'hooks/dashboard/useDashboardContext';

// Contexts
import { useGlobalContext } from 'contexts/globalContext';

// Assets
import UsersImage from 'assets/users.svg';
import SalesImage from 'assets/sales.svg';
import VehiclesImage from 'assets/vehicles.svg';
import PendingImage from 'assets/pending.svg';

// Styles
import * as Styled from './styles';

export const Dashboard = (): ReactElement => {
  const { isAdmin } = useGlobalContext();

  const { totalClients, totalTasks, totalPrices, totalDrivers } =
    useDashboardContext();

  return (
    <Styled.DashboardContainer>
      <div className="container dashboard__infos">
        <StatusCard
          title="Nº de clientes"
          value={totalClients}
          to="/clients"
          icon={<img src={UsersImage} alt="Icon" />}
        />
        <StatusCard
          title="Nº de serviços"
          value={totalTasks}
          bgicon="#D9F7E8"
          to="/tasks"
          icon={<img src={SalesImage} alt="Icon" />}
        />
        <StatusCard
          title="Nº de preços"
          value={totalPrices}
          bgicon="#FFF3D6"
          to="/prices"
          icon={<img src={VehiclesImage} alt="Icon" />}
        />
        <StatusCard
          title="Nº de motoristas"
          value={totalDrivers}
          bgicon="#FFF3D6"
          to="/drivers"
          icon={<img src={PendingImage} alt="Icon" />}
        />
      </div>

      {isAdmin && (
        <div className="container dashboard__charts">
          <SalesOverview />
          <TasksStatusCard />
        </div>
      )}
    </Styled.DashboardContainer>
  );
};
