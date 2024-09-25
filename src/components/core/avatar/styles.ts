// Packages
import styled from 'styled-components';
import { css } from 'styled-components';

export const AvatarContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 15px;
    width: 100%;
    cursor: pointer;

    @media (max-width: ${theme.breakpoints.MD}) {
      max-width: 80px;
    }

    .avatar__infos {
      flex: 1;
      text-overflow: ellipsis;

      @media (max-width: ${theme.breakpoints.MD}) {
        display: none;
      }

      p {
        flex: 1;
        line-height: 1;
        font-weight: bold;
        font-size: 1.6rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 120px;
      }

      span {
        font-size: 1.2rem;
      }
    }
  `}
`;
