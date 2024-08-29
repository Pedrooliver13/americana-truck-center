// Packages
import styled, { css } from 'styled-components';

export const ClientFormContainer = styled.div`
  ${() => css`
    padding-top: 20px;

    button {
      width: 100%;
    }

    .clients__header {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 20px;
    }
  `}
`;

export const clientsFormPriceCard = styled.div``;
