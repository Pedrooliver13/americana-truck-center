// Packages
import styled, { css } from 'styled-components';

export const SelectContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    min-width: 100%;

    .ant-select-selector {
      flex: 1;
    }
  `}
`;
