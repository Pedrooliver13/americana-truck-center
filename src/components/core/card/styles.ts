// Packages
import styled, { css } from 'styled-components';
import { Card as CardAntDesign, CardProps } from 'antd';

export const CardContainer = styled(CardAntDesign)<CardProps>`
  ${({ theme }) => css`
    background-color: ${theme.colors.background};
    border: ${theme.colors.border};
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  `}
`;
