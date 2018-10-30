import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'antd';

class FroodSwitch extends Component {
  onChange = (value) => {
    this.props.onChange(value, this.props.id);
  }

  render() {
    const {
      checkedText,
      unCheckedText,
      size = 'default',
      checked = false,
      id,
      disabled = false
    } = this.props;
    return (
      <Switch
        checkedChildren={ checkedText }
        unCheckedChildren={ unCheckedText }
        size={ size }
        checked={ checked }
        onChange={ this.onChange }
        id={ id }
        disabled={ disabled }
      />
    );
  }
}

FroodSwitch.propTypes = {
  checkedText: PropTypes.string.isRequired,
  unCheckedText: PropTypes.string.isRequired,
  size: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  disabled: PropTypes.bool
};

export default FroodSwitch;
