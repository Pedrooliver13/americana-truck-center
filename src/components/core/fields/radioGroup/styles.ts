// Packages
import styled, { css } from 'styled-components';
import {
  Radio as RadioAntDesign,
  RadioGroupProps as RadioGroupAntDesignProps,
} from 'antd';

export const RadioContainer = styled.div``;

export const RadioGroup = styled(
  RadioAntDesign.Group
)<RadioGroupAntDesignProps>`
  ${() => css`
    display: flex;
    align-items: center;
    text-align: center;
  `}
`;
