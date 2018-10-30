import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { InputNumber } from 'antd';
import { gridInputNumber } from './GridInputNumber.scss';

class GridInputNumber extends PureComponent {
  onChange = (value) => {
    this.props.onChange(value, this.props.index, this.props.propName);
  }

  render() {
    const {
      disabled = false,
      autoFocus,
      value,
      min,
      max,
      formatter,
      parser
    } = this.props;

    return (
      <InputNumber
        className={ gridInputNumber }
        autoFocus={ autoFocus }
        value={ value }
        min={ min }
        max={ max }
        formatter={ formatter }
        parser={ parser }
        size="small"
        disabled={ disabled }
        onChange={ this.onChange }
        onPressEnter={ this.onChange }
      />
    );
  }
}

GridInputNumber.propTypes = {
  value: PropTypes.any,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  propName: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  formatter: PropTypes.func,
  parser: PropTypes.func,
  autoFocus: PropTypes.bool,
};

export default GridInputNumber;
