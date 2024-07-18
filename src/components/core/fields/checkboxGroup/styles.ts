// Packages
import styled, { css } from 'styled-components';
import {
  Checkbox as CheckBoxAntDesign,
  CheckboxProps as CheckboxAntDesignProps,
} from 'antd';

export const CheckboxGroupContainer = styled(
  CheckBoxAntDesign
)<CheckboxAntDesignProps>`
  ${({ theme }) => css`
    color: ${theme.colors.text};
  `}
`;
