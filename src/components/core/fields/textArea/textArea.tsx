// Packages
import { ReactElement, forwardRef } from 'react';
import { InputRef, Typography, Input as InputAntDesign } from 'antd';

// Styles
import * as Styled from './styles';

export interface TextAreaProps
  extends React.ComponentProps<typeof InputAntDesign.TextArea> {
  label?: string;
  className?: string;
}

export const TextAreaBase = (
  props: TextAreaProps,
  ref: React.LegacyRef<InputRef> | undefined
): ReactElement => {
  return (
    <Styled.TextAreaContainer>
      {props.label && (
        <label htmlFor={props?.id}>
          <Typography.Title
            level={5}
            className="label"
            disabled={props?.disabled}
          >
            {props.label} {props?.required && '*'}
          </Typography.Title>
        </label>
      )}
      <InputAntDesign.TextArea
        id={props?.id}
        name={props?.name}
        disabled={props?.disabled}
        className={props?.className}
        placeholder={props?.placeholder}
        ref={ref}
        size="large"
        autoSize={{ minRows: props?.rows, maxRows: props?.rows }}
        required={false}
        {...props}
      />
    </Styled.TextAreaContainer>
  );
};

export const TextArea = forwardRef(TextAreaBase);
