// Packages
import { ReactElement, forwardRef, useRef, useState } from 'react';
import { AppstoreOutlined as AppstoreOutlinedIcon } from '@ant-design/icons';

// Components
import { Button, Select, Tooltip } from 'components/core';
import { BaseSelectRef } from 'components/core/fields/select/select';

// Styles
import * as Styled from './styles';

interface ButtonHideColumnsProps {
  options: Array<{ label: string; value: string }>;
  checkedList: string[];
  setCheckedList: (value: string[]) => void;
}

export const ButtonHideColumnsBase = (
  props: ButtonHideColumnsProps,
  ref:
    | ((instance: HTMLButtonElement | HTMLAnchorElement | null) => void)
    | React.RefObject<HTMLButtonElement | HTMLAnchorElement>
    | null
    | undefined
): ReactElement => {
  const selectRef = useRef<BaseSelectRef>(null);
  const [isOpenSelectColumns, setIsOpenSelectColumns] = useState(false);

  const handleToggle = () => {
    setIsOpenSelectColumns((state) => !state);
  };

  return (
    <Styled.ButtonHideColumnsContainer>
      <Tooltip title="Gerenciar colunas">
        <div>
          <Button shape="circle" size="large" onClick={handleToggle} ref={ref}>
            <AppstoreOutlinedIcon />
          </Button>
        </div>
      </Tooltip>

      <Select
        id="select-columns"
        className="select-columns"
        open={isOpenSelectColumns}
        mode="tags"
        showSearch={false}
        value={props?.checkedList}
        options={props?.options}
        suffixIcon={null}
        placement="bottomRight"
        dropdownStyle={{ width: '250px' }}
        onBlur={handleToggle}
        onChange={(value) => {
          props?.setCheckedList(value as string[]);
        }}
        ref={selectRef}
      />
    </Styled.ButtonHideColumnsContainer>
  );
};

export const ButtonHideColumns = forwardRef(ButtonHideColumnsBase);
