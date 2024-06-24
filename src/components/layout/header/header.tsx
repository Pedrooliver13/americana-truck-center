// Packages
import { ReactElement } from 'react';
import {
  MenuOutlined as MenuOutlinedIcon,
  SearchOutlined as SearchOutlinedIcon,
} from '@ant-design/icons';

// Components
import { Input } from 'components/core';

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
        <form
          className="content__search"
          onSubmit={(event) => {
            event.preventDefault();
            console.log('Ativei', event);
          }}
        >
          <Input
            id="search-input"
            data-cy="search-input"
            placeholder="Buscar"
            className="content__search--input"
            prefix={
              <button id="search-button" data-cy="search-input" type="submit">
                <SearchOutlinedIcon />
              </button>
            }
          />
        </form>
        <div className="content__avatar"></div>
      </div>
    </Styled.HeaderContainer>
  );
};
