// Packages
import styled from 'styled-components';
import {
  Radio as RadioAntDesign,
  RadioProps as RadioAntDesignProps,
} from 'antd';

export const RadioContainer = styled(
  RadioAntDesign.Button
)<RadioAntDesignProps>`
  max-width: 100%;
  width: 100%;
`;
