// Packages
import { ReactElement, useState } from 'react';
import { Outlet } from 'react-router-dom';

// Components
import { Header, Sidebar } from 'components/layout';

// Styles
import * as Styled from './styles';

export const DefaultLayout = (): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Styled.DefaultLayoutContainer>
      <Sidebar isOpen={isOpen} />

      <div className="content">
        <Header onToggle={handleToggle} />
        <Outlet />
      </div>
    </Styled.DefaultLayoutContainer>
  );
};
