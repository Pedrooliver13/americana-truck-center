// Packages
import { ReactElement } from 'react';
import { MenuOutlined as MenuOutlinedIcon } from '@ant-design/icons';

// Styles
import * as Styled from './styles';

interface HeaderProps {
  onToggle: () => void;
}

export const Header = (props: HeaderProps): ReactElement => {
  return (
    <Styled.HeaderContainer>
      <div className="content">
        <div className="content__toggle">
          <MenuOutlinedIcon onClick={props.onToggle} size={20} />
        </div>
        <div className="content__search"></div>
        <div className="content__avatar"></div>
      </div>
    </Styled.HeaderContainer>
  );
};
