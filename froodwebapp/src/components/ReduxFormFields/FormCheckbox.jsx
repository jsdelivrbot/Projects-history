import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';

export default class FormCheckbox extends Component {
  handleChange = ({ target: { checked } }) => {
    this.props.input.onChange(checked);
  }

  render() {
    const {
      input: { value },
      text
    } = this.props;

    return (
      <Checkbox
        checked={ value }
        onChange={ this.handleChange }
      >
        { text }
      </Checkbox>
    );
  }
}

FormCheckbox.propTypes = {
  input: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
};
