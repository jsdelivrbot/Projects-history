import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ConnectedSkuAutoComplete } from 'components';

class FormSkuAutoComplete extends Component {
  onChange = (name) => {
    this.props.input.onChange({
      ...this.props.input.value,
      id: null,
      name
    });
  }

  onSelect = (id, name) => {
    if (this.props.input.value.id !== id) {
      this.props.input.onChange({
        ...this.props.input.value,
        id,
        name
      });
    }
  }

  render() {
    const {
      input: { value },
      alignRight = false,
      disabled = false
    } = this.props;

    return (
      <ConnectedSkuAutoComplete
        value={ value.name }
        onChange={ this.onChange }
        onSelect={ this.onSelect }
        alignRight={ alignRight }
        disabled={ disabled }
      />
    );
  }
}

FormSkuAutoComplete.propTypes = {
  input: PropTypes.object.isRequired,
  alignRight: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default FormSkuAutoComplete;
