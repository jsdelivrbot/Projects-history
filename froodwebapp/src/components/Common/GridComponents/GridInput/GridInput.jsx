import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { gridInput } from './GridInput.scss';

class GridInput extends PureComponent {
  onChange = (e) => {
    this.props.onChange(e.target.value, this.props.index, this.props.propName);
  }

  render() {
    const {
      disabled = false,
      autoFocus,
      value
    } = this.props;

    return (
      <Input
        className={ gridInput }
        autoFocus={ autoFocus }
        value={ value }
        size="small"
        disabled={ disabled }
        onChange={ this.onChange }
        onPressEnter={ this.onChange }
      />
    );
  }
}

GridInput.propTypes = {
  value: PropTypes.any,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  propName: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
};

export default GridInput;
