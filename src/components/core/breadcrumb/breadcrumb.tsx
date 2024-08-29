// Packages
import { ReactElement } from 'react';
import {
  Breadcrumb as BreadcrumbAntDesign,
  BreadcrumbProps as BreadcrumbAntDesignProps,
} from 'antd';

interface BreadCrumbProps extends BreadcrumbAntDesignProps {}

export const Breadcrumb = (props: BreadCrumbProps): ReactElement => {
  return <BreadcrumbAntDesign {...props} />;
};
