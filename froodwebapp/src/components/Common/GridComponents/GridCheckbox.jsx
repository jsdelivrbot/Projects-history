import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';

class GridCheckBox extends Component {
  onChange = () => {
    const {
      value,
      propName,
      index,
      parentId
    } = this.props;

    if (parentId) {
      this.props.onChange(!value, index, propName, parentId);
    } else {
      this.props.onChange(!value, index, propName);
    }
  }

  render() {
    const { value, disabled } = this.props;
    return (
      <Checkbox
        checked={ value }
        disabled={ disabled }
        onChange={ this.onChange }
      />
    );
  }
}

GridCheckBox.propTypes = {
  value: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  parentId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  disabled: PropTypes.bool,
  propName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default GridCheckBox;
