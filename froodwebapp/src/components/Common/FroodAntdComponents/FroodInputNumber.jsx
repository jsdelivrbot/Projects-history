import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputNumber } from 'antd';

class FroodInputNumber extends Component {
  onChange = (value) => {
    this.props.onChange(this.props.id, value);
  }

  render() {
    const {
      max,
      min,
      disabled = false,
      value,
      step = 1,
      style,
      className,
      formatter,
      parser,
      placeholder
    } = this.props;
    return (
      <InputNumber
        max={ max }
        min={ min }
        disabled={ disabled }
        value={ value }
        onChange={ this.onChange }
        step={ step }
        className={ className }
        placeholder={ placeholder }
        style={ style }
        formatter={ formatter }
        parser={ parser }
      />
    );
  }
}

FroodInputNumber.propTypes = {
  onChange: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  value: PropTypes.number,
  disabled: PropTypes.bool,
  max: PropTypes.number,
  min: PropTypes.number,
  step: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string,
  formatter: PropTypes.func,
  parser: PropTypes.func,
  placeholder: PropTypes.string,
};

export default FroodInputNumber;
