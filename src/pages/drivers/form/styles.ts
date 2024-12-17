// Packages
import styled, { css } from 'styled-components';

export const DriversFormContainer = styled.div`
  ${({ theme }) => css`
    padding-top: 20px;

    .drivers__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 20px;
      font-size: 1rem;

      h1 {
        display: flex;
        gap: 10px;
        font-size: 2rem;

        #info-icon {
          font-size: 1.5rem;
          color: ${theme.colors.primary};
        }
      }
    }

    .drivers-form__footer {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
  `}
`;