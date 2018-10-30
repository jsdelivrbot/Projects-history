import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';
import classnames from 'classnames';
import { radioGroup } from 'styles/common.scss';

const FormRadioButtonGroup = ({
  input: {
    checked, value, onChange
  },
  radioButtonValues,
  className,
  disabled = false
}) => (
  <Radio.Group
    onChange={ onChange }
    value={ value || checked }
    className={ classnames(radioGroup, className) }
    disabled={ disabled }
  >
    { radioButtonValues.map(radioButton => (
      <Radio.Button
        key={ radioButton.value }
        value={ radioButton.value }
        disabled={ radioButton.disabled }
      >
        { radioButton.text }
      </Radio.Button>))
    }
  </Radio.Group>
);

FormRadioButtonGroup.propTypes = {
  disabled: PropTypes.bool,
  input: PropTypes.object.isRequired,
  radioButtonValues: PropTypes.array.isRequired,
  className: PropTypes.string
};

export default FormRadioButtonGroup;
