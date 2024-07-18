// Packages
import styled from 'styled-components';
import {
  Radio as RadioAntDesign,
  RadioProps as RadioAntDesignProps,
} from 'antd';

export const RadioContainer = styled(
  RadioAntDesign.Button
)<RadioAntDesignProps>`
  width: 100% !important;
`;
