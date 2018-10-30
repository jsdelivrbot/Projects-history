import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

class FroodInput extends Component {
  onChange = (e) => {
    this.props.onChange(e, this.props.id);
  }

  render() {
    const { id, value } = this.props;

    return (
      <Input
        id={ id.toString() }
        placeholder="Value.."
        size="default"
        value={ value }
        onChange={ this.onChange }
      />
    );
  }
}

FroodInput.propTypes = {
  id: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FroodInput;
