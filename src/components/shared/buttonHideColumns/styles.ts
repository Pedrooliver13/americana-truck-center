// Packages
import styled, { css } from 'styled-components';

export const ButtonHideColumnsContainer = styled.div`
  ${() => css`
    position: relative;

    button {
      position: relative;
    }

    .select-columns {
      pointer-events: none;
      position: absolute;
      width: 0;
      opacity: 0;
      top: 0;
      left: 10px;
      right: 0;
    }
  `}
`;
