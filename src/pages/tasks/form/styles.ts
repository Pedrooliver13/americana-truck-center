// Packages
import styled, { css } from 'styled-components';

export const TasksFormContainer = styled.div`
  ${({ theme }) => css`
    padding-top: 20px;

    button {
      width: 100%;
    }

    .tasks__header {
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

    .tasks__total {
      font-weight: bold;
      font-size: 1.5rem;
      padding: 0.5rem;
    }

    .tasks-form {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;

      .licensePlate input {
        text-transform: uppercase;

        &::placeholder {
          text-transform: none;
        }
      }

      &__fields {
        width: 650px;
        margin-bottom: 20px;

        @media (max-width: ${theme.breakpoints.XL}) {
          width: 100%;
        }
      }

      &__services {
        display: flex;
        flex-direction: column;
        flex: 1;
        font-size: 1.6rem;

        ul {
          max-height: 170px;
          overflow-y: auto;
        }

        li {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: ${theme.colors.body};
          border: 1px solid ${theme.colors.border};
          border-radius: 8px;
          margin: 10px 0px;
          padding: 0.5rem;
        }

        &--empty {
          margin: auto;
        }
      }

      &__price {
        flex: 1;
        max-width: 100%;
        max-height: 380px;
        box-sizing: border-box;

        .ant-card-body {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        @media (max-width: ${theme.breakpoints.SM}) {
          max-width: 100%;
          min-width: 100%;
          width: 100%;
          margin-bottom: 20px;
        }

        &--content {
          margin-top: auto;
          font-size: 1.6rem;
          padding: 5px;

          div {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 1.6rem;
            line-height: 2;

            p {
              font-weight: bold;
            }
          }
        }

        &--footer {
          display: flex;
          margin-top: 20px;
          gap: 10px;
          height: auto;
        }
      }
    }
  `}
`;

export const TasksFormPriceCard = styled.div``;
