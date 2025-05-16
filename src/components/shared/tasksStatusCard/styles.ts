// Packages
import styled, { css } from 'styled-components';

// Components
import { Card } from 'components/core/card/card';

export const TaskStatusContainer = styled(Card)`
  ${() => css`
    max-width: 100%;
    width: 100%;

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-bottom: 20px;
      font-size: 16px;
    }
  `}
`;
