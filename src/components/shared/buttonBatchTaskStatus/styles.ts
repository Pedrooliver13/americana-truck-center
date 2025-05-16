// Packages
import styled, { css } from 'styled-components';

// Components
import { Button } from 'components/core/fields/button/button';

export const ButtonTaskStatusContainer = styled(Button)`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;

    &.btn-status-1 .status {
      background-color: ${theme.colors.green};
    }

    &.btn-status-2 .status {
      background-color: ${theme.colors.yellow};
    }

    &.btn-status-3 .status {
      background-color: ${theme.colors['red-900']};
    }

    .status {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
  `}
`;

export const ModalContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 20px;
  `}
`;
