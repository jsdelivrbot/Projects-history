/* eslint-disable object-curly-newline */
// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

type Props = {
  input: {
    value: number | string,
    onChange: Function
  },
  type?: 'text' | 'email' | 'password',
  style?: Object,
  className?: string,
  prefix?: string,
  placeholder?: string,
  disabled?: boolean
};

const FormInput = ({
  input: { value, onChange },
  style = {
    width: '100%'
  },
  type = 'text',
  className,
  prefix,
  placeholder,
  disabled = false
}: Props) => (
  <Input
    className={ className }
    type={ type }
    style={ style }
    placeholder={ placeholder }
    value={ value }
    prefix={ prefix }
    onChange={ onChange }
    disabled={ disabled }
  />
);

FormInput.propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  prefix: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

export default FormInput;
