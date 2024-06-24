// Packages
import { ReactElement } from 'react';
import {
  Input as InputAntDesign,
  InputProps as InputAntDesignProps,
} from 'antd';

// Styles
import * as Styled from './styles';

interface InputProps extends InputAntDesignProps {
  error?: string;
}

export const Input = (props: InputProps): ReactElement => {
  return (
    <Styled.InputContainer>
      <InputAntDesign size="large" {...props} />
      {props?.error && <span className="input-error">{props.error}</span>}
    </Styled.InputContainer>
  );
};
