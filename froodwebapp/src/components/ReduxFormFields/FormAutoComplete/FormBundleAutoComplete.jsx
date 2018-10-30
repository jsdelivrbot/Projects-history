import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ConnectedBundleAutoComplete } from 'components';

class FormBundleAutoComplete extends Component {
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
      <ConnectedBundleAutoComplete
        value={ value.name }
        onChange={ this.onChange }
        onSelect={ this.onSelect }
        alignRight={ alignRight }
        disabled={ disabled }
      />
    );
  }
}

FormBundleAutoComplete.propTypes = {
  input: PropTypes.object.isRequired,
  alignRight: PropTypes.bool,
  disabled: PropTypes.bool
};

export default FormBundleAutoComplete;
