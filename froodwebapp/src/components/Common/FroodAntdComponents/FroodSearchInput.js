import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { input } from 'styles/common.scss';

const { Search } = Input;

class FroodSearchInput extends Component {
  onChange = (e) => {
    this.props.onChange(e.target.value);
  }

  render() {
    const { placeholder } = this.props;
    return (
      <Search
        className={ input }
        placeholder={ placeholder }
        onChange={ this.onChange }
      />
    );
  }
}

FroodSearchInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

export default FroodSearchInput;
