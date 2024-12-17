// Packages
import { ReactElement, ReactNode } from 'react';

// Styles
import * as Styled from './styles';

interface StatusCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  bgicon?: string;
  to: string;
}

export const StatusCard = (props: StatusCardProps): ReactElement => {
  return (
    <Styled.StatusCardContainer to={props?.to} $bgicon={props.bgicon}>
      <div className="status-card__infos">
        <h3 className="status-card__infos--title">{props.title}</h3>
        <p className="status-card__infos--value">{props.value}</p>
      </div>

      <div className="status-card__icon">{props.icon}</div>
    </Styled.StatusCardContainer>
  );
};
