// Packages
import { ReactElement } from 'react';

// Assets
import Image404 from 'assets/404.svg';

// Styles
import * as Styled from './styles';

export const Page404 = (): ReactElement => {
  return (
    <Styled.Page404Container className="container">
      <img src={Image404} alt="404 Page" />
      <p>ERRO 404: Página não encontrada!</p>
    </Styled.Page404Container>
  );
};
