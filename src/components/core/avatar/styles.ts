// Packages
import styled from 'styled-components';
import { css } from 'styled-components';

export const AvatarContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 15px;
    max-width: 180px;
    width: 100%;
    cursor: pointer;

    @media (max-width: ${theme.breakpoints.MD}) {
      max-width: 80px;
    }

    .avatar__infos {
      flex: 1;

      @media (max-width: ${theme.breakpoints.MD}) {
        display: none;
      }

      p {
        flex: 1;
        line-height: 1;
        font-weight: bold;
        font-size: 1.6rem;
      }

      span {
        font-size: 1.2rem;
      }
    }
  `}
`;
