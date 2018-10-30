import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { gridSelect } from './GridSelect.scss';

const { Option } = Select;

class GridSelect extends Component {
  onChange = (value) => {
    if (this.props.value !== value) {
      const { index, propName } = this.props;
      this.props.onChange(value, index, propName);
    }
  }

  render() {
    const {
      value,
      menuItems = [],
      placeholder,
      disabled = false
    } = this.props;

    return (
      <Select
        showSearch
        className={ gridSelect }
        value={ ((value || value === 0) && value.toString()) || undefined } // hack to show placeholder
        onChange={ this.onChange }
        placeholder={ placeholder }
        disabled={ disabled }
        optionFilterProp="children"
        filterOption={ (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
      >
        { menuItems.map(item => (
          <Option
            key={ item.key.toString() }
            value={ item.key.toString() }
          >
            { item.value }
          </Option>
        )) }
      </Select>
    );
  }
}

GridSelect.propTypes = {
  // props
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  index: PropTypes.number,
  propName: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  menuItems: PropTypes.array,
  // handlers
  onChange: PropTypes.func.isRequired
};

export default GridSelect;
