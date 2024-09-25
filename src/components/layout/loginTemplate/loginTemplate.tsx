// Packages
import { ReactElement, ReactNode } from 'react';

// Assets
import LogoImage from 'assets/truck-center.png';
import BackgroundImage from 'assets/background.svg';

// Styles
import * as Styled from './styles';

interface LoginTemplateProps {
  children: ReactNode;
}

export const LoginTemplate = (props: LoginTemplateProps): ReactElement => {
  return (
    <Styled.LoginContainer>
      <div className="background">
        <img src={LogoImage} className="background__logo" />
        <img src={BackgroundImage} className="background__generic-01" />
        <img src={BackgroundImage} className="background__generic-02" />
      </div>

      {props.children}
    </Styled.LoginContainer>
  );
};
