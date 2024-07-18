// Packages
import styled, { css } from 'styled-components';
import {
  Radio as RadioAntDesign,
  RadioGroupProps as RadioGroupAntDesignProps,
} from 'antd';

export const RadioGroupContainer = styled(
  RadioAntDesign.Group
)<RadioGroupAntDesignProps>`
  ${() => css`
    display: flex;
    align-items: center;
    text-align: center;
  `}
`;
