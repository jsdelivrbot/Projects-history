import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { select } from 'styles/common.scss';

const { Option } = Select;

const FormSelect = ({
  input: {
    value,
    onChange
  },
  menuItems = [],
  placeholder,
  disabled = false
}) => (
  <Select
    className={ select }
    showSearch
    value={ ((value || value === 0) && value.toString()) || undefined } // hack to show placeholder
    onChange={ onChange }
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

FormSelect.propTypes = {
  input: PropTypes.object.isRequired,
  menuItems: PropTypes.array,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

export default FormSelect;
