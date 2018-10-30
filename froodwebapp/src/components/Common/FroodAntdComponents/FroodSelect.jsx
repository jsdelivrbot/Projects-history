import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { select } from 'styles/common.scss';

const { Option } = Select;

class FroodSelect extends Component {
  onChange = (value) => {
    this.props.onChange(this.props.id, value);
  }

  render() {
    const {
      menuItems = [],
      value
    } = this.props;

    return (
      <Select
        className={ select }
        value={ value && value.toString() }
        onChange={ this.onChange }
      >
        { menuItems.map(item => (
          <Option
            key={ item.key.toString() }
            value={ item.key.toString() }
          >
            { item.value }
          </Option>
        ))}
      </Select>
    );
  }
}

FroodSelect.propTypes = {
  id: PropTypes.number.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  menuItems: PropTypes.array.isRequired,
};

export default FroodSelect;
