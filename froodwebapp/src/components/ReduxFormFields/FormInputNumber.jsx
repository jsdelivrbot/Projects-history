/* eslint-disable object-curly-newline */
// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { InputNumber } from 'antd';

type Props = {
  input: {
    value: number | string,
    onChange: Function
  },
  style?: Object,
  className?: string,
  formatter?: Function,
  parser?: Function,
  placeholder?: string,
  disabled?: boolean,
  min?: number,
  max?: number,
  step?: number
};

const FormInputNumber = ({
  input: {
    value,
    onChange
  },
  style = {
    width: '100%'
  },
  className,
  formatter,
  parser,
  placeholder,
  disabled = false,
  min,
  max,
  step = 1
}: Props) => (
  <InputNumber
    className={ className }
    placeholder={ placeholder }
    value={ value }
    onChange={ onChange }
    disabled={ disabled }
    style={ style }
    min={ min }
    max={ max }
    step={ step }
    formatter={ formatter }
    parser={ parser }
  />
);

FormInputNumber.propTypes = {
  input: PropTypes.object.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
  formatter: PropTypes.func,
  parser: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number
};

export default FormInputNumber;
