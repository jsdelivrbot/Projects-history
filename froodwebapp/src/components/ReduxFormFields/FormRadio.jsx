import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';

const FormRadio = ({ input: { onChange, checked } }) => (
  <Radio
    checked={ checked }
    onChange={ onChange }
  />
);

FormRadio.propTypes = {
  input: PropTypes.object,
};

export default FormRadio;
