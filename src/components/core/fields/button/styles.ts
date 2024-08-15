// Packages
import styled, { css } from 'styled-components';
import {
  Button as ButtonAntDesign,
  ButtonProps as ButtonAntDesignProps,
} from 'antd';

export const ButtonContainer = styled(ButtonAntDesign)<ButtonAntDesignProps>`
  ${({ theme }) => css`
    &.ant-btn-dashed {
      background-color: ${theme.colors.background} !important;
      color: ${theme.colors.text};
      border-color: ${theme.colors.border};
    }
  `}
`;
