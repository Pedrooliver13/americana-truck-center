// Packages
import { ReactElement } from 'react';
import { TagProps as TagAntDesignProps } from 'antd';

// Styles
import * as Styled from './styles';

interface TagProps extends TagAntDesignProps {}

export const Tag = (props: TagProps): ReactElement => {
  return <Styled.TagContainer {...props} />;
};
