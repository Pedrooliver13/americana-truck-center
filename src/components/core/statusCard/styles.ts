// Packages
import styled, { css } from 'styled-components';

interface StatusCardContainerProps {
  $bgicon?: string;
}

export const StatusCardContainer = styled.div<StatusCardContainerProps>`
  ${({ theme, $bgicon }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: ${theme.colors.white};
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    width: 100%;
    height: 100px;
    padding: 1.5rem;
    border-radius: 14px;

    .status-card__infos {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 10px;

      h3 {
        font-size: 1.6rem;
        color: ${theme.colors['gray-300']};
      }

      p {
        font-size: 2.8rem;
        font-weight: 900;
      }
    }

    .status-card__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 6rem;
      height: 6rem;
      padding: 1.5rem;
      background-color: ${$bgicon || theme.colors['purple-100']};

      border-radius: 23px;
    }
  `}
`;
