// Packages
import { ReactElement } from 'react';
import { MenuOutlined as MenuOutlinedIcon } from '@ant-design/icons';

// Components
import { Avatar } from 'components/core';
import { SearchInput, ButtonTheme } from 'components/shared';

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
        <div className="content__search">
          <SearchInput />
        </div>
        <div className="content__avatar">
          <ButtonTheme />
          <Avatar />
        </div>
      </div>
    </Styled.HeaderContainer>
  );
};
