// Packages
import { ReactElement } from 'react';

// Components
import { SalesOverview, StatusCard } from 'components/core';

// Assets
import UsersImage from 'assets/users.svg';
import SalesImage from 'assets/sales.svg';
import VehiclesImage from 'assets/vehicles.svg';
import PendingImage from 'assets/pending.svg';

// Styles
import * as Styled from './styles';

export const Dashboard = (): ReactElement => {
  return (
    <Styled.DashboardContainer>
      <div className="container dashboard__infos">
        <StatusCard
          title="Nº de clientes"
          value="40,0000"
          icon={<img src={UsersImage} alt="Icon" />}
        />
        <StatusCard
          title="Vendas"
          value="40,0000"
          bgicon="#D9F7E8"
          icon={<img src={SalesImage} alt="Icon" />}
        />
        <StatusCard
          title="Nº de veículos"
          value="40,0000"
          bgicon="#FFF3D6"
          icon={<img src={VehiclesImage} alt="Icon" />}
        />
        <StatusCard
          title="Pendentes"
          value="40,0000"
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
