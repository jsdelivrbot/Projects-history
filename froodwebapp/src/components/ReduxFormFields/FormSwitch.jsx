import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'antd';

const FormSwitch = ({
  input: { value, onChange },
  size = 'default',
  checkedText,
  unCheckedText,
  disabled = false
}) => (
  <Switch
    size={ size }
    onChange={ onChange }
    checked={ value }
    value={ value }
    checkedChildren={ checkedText }
    unCheckedChildren={ unCheckedText }
    disabled={ disabled }
  />
);

FormSwitch.propTypes = {
  input: PropTypes.object.isRequired,
  checkedText: PropTypes.string,
  unCheckedText: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool
};

export default FormSwitch;
