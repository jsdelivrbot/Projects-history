import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';

const FormRadioGroup = ({
  input: { value, onChange },
  radioButtonValues,
  className
}) => (
  <Radio.Group
    className={ className }
    onChange={ onChange }
    defaultValue={ value }
  >
    { radioButtonValues.map(radioButton => (
      <Radio
        key={ radioButton.value }
        value={ radioButton.value }
      >
        { radioButton.text }
      </Radio>))
    }
  </Radio.Group>
);

FormRadioGroup.propTypes = {
  input: PropTypes.object.isRequired,
  radioButtonValues: PropTypes.array.isRequired,
  className: PropTypes.string,
};

export default FormRadioGroup;
