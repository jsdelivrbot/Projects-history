import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTelephoneInput from 'react-telephone-input/lib/withStyles';
import { reactTelephoneInput } from './FormTelephoneInput.scss';
import flags from './flags.png';

class FormTelephoneInput extends Component {
  handleChange = (phone, selectedCountry) => {
    this.props.input.onChange({
      number: phone.replace(`+${selectedCountry.dialCode}`, '').replace(/[-()]/g, '').trim(),
      countryCode: selectedCountry.dialCode
    });
  }

  render() {
    const {
      input: { value },
      defaultCountry
    } = this.props;

    return (
      <ReactTelephoneInput
        defaultCountry={ defaultCountry }
        flagsImagePath={ flags }
        onChange={ this.handleChange }
        classNames={ reactTelephoneInput }
        value={ `+${value.countryCode}${value.number}` }
      />
    );
  }
}

FormTelephoneInput.propTypes = {
  input: PropTypes.object,
  defaultCountry: PropTypes.string,
};

export default FormTelephoneInput;
