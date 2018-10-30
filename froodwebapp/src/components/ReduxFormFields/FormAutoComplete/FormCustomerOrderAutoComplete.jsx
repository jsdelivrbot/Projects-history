import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ConnectedCustomerOrderAutoComplete } from 'components';

class FormCustomerOrderAutoComplete extends Component {
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
        id: Number(id), // autocomplete behaviour, we need to parse id back to number
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
      <ConnectedCustomerOrderAutoComplete
        value={ value.name }
        onChange={ this.onChange }
        onSelect={ this.onSelect }
        alignRight={ alignRight }
        disabled={ disabled }
      />
    );
  }
}

FormCustomerOrderAutoComplete.propTypes = {
  input: PropTypes.object.isRequired,
  alignRight: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default FormCustomerOrderAutoComplete;
