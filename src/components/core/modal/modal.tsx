// Packages
import { ReactElement } from 'react';
import { ModalProps as ModalAntDesignProps } from 'antd';

// Styles
import * as Styled from './styles';

export interface ModalProps extends ModalAntDesignProps {}

export const Modal = (props: ModalProps): ReactElement => {
  return <Styled.ModalAntDesign {...props} zIndex={9999} />;
};
