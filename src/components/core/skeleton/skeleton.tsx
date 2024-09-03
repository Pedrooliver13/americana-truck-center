// Packages
import { ReactElement } from 'react';
import { SkeletonProps as SkeletonAntDesignProps } from 'antd';

// Styles
import * as Styled from './styles';

interface SkeletonProps extends SkeletonAntDesignProps {}

export const Skeleton = (props: SkeletonProps): ReactElement => {
  return (
    <>
      {Array(5)
        .fill(null)
        .map((_, index) => (
          <Styled.SkeletonContainer key={index} {...props} />
        ))}
    </>
  );
};
