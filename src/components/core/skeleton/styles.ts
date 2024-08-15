// Packages
import styled from 'styled-components';
import {
  Skeleton as SkeletonAntDesign,
  SkeletonProps as SkeletonAntDesignProps,
} from 'antd';

export const SkeletonContainer = styled(
  SkeletonAntDesign.Input
)<SkeletonAntDesignProps>`
  width: 100% !important;
  margin-bottom: 4px !important;
`;
