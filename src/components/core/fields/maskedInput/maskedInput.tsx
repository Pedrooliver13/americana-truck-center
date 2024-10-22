// Packages
import { ReactElement, forwardRef } from 'react';
import { MaskedInput as MaskInputAntDesign } from 'antd-mask-input';
import { InputRef, Typography, InputProps as InputAntDesignProps } from 'antd';

// Styles
import * as Styled from './styles';

export interface MaskednputProps extends InputAntDesignProps {
  label?: string;
  className?: string;
  firstmasklength?: number;
  mask: {
    mask: string | RegExp;
    lazy: boolean;
  }[];
}

export const MaskedInputBase = (
  props: MaskednputProps,
  ref: React.LegacyRef<InputRef> | undefined
): ReactElement => {
  return (
    <Styled.InputContainer>
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
      <MaskInputAntDesign
        ref={ref}
        size="large"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...(props as any)}
        maskOptions={{
          dispatch: function (appended, dynamicMasked) {
            const value = (dynamicMasked.value + appended).replace(/\D/g, '');

            return props?.firstmasklength &&
              value.length > props?.firstmasklength
              ? dynamicMasked.compiledMasks[1]
              : dynamicMasked.compiledMasks[0];
          },
        }}
        required={false}
      />
    </Styled.InputContainer>
  );
};

export const MaskedInput = forwardRef(MaskedInputBase);
