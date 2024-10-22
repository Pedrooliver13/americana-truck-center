// Packages
import styled, { css } from 'styled-components';

export const InputContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: ${theme.colors.text};

    svg {
      color: ${theme.colors['gray-300']};
    }

    .ant-input-number-affix-wrapper {
      width: 100%;
    }
  `}
`;
