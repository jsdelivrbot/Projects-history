import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PromotionAutoComplete } from 'components';

class FormPromotionAutoComplete extends Component {
  onChange = (code) => {
    this.props.input.onChange({
      ...this.props.input.value,
      id: null,
      code
    });
  }

  onSelect = (id, code) => {
    if (this.props.input.value.id !== id) {
      this.props.input.onChange({
        ...this.props.input.value,
        id: Number(id), // autocomplete behaviour, we need to parse id back to number
        code
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
      <PromotionAutoComplete
        value={ value.code }
        onChange={ this.onChange }
        onSelect={ this.onSelect }
        alignRight={ alignRight }
        disabled={ disabled }
      />
    );
  }
}

FormPromotionAutoComplete.propTypes = {
  input: PropTypes.object.isRequired,
  alignRight: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default FormPromotionAutoComplete;
