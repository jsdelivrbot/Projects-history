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
  style?: Object,
  className?: string,
  placeholder?: string,
  disabled?: boolean,
};

const { TextArea } = Input;

const FormTextArea = ({
  input: { value, onChange },
  style = {
    width: '100%'
  },
  className,
  placeholder,
  disabled = false
}: Props) => (
  <TextArea
    autosize={ { minRows: 4, maxRows: 6 } }
    className={ className }
    placeholder={ placeholder }
    value={ value }
    style={ style }
    onChange={ onChange }
    disabled={ disabled }
  />
);

FormTextArea.propTypes = {
  input: PropTypes.object.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

export default FormTextArea;
