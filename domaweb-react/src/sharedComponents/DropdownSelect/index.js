import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

import ReactSelectAdapter from '../ReactSelectAdapter/index';

// Resuable DropdownSelect component
export default class DropdownSelect extends PureComponent {
  render() {
    const options = [];
    this.props.data.forEach((option) => {
      const optionObject = {};

      if (typeof option === 'object') {
        optionObject.value = option.id;
        optionObject.label = option.title || option.name;
      } else if (typeof option === 'string') {
        optionObject.value = option;
        optionObject.label = option;
      }

      options.push(optionObject);
    });

    return (
      <div>
        <Field
          name={this.props.name}
          component={ReactSelectAdapter}
          onchange={this.props.onchange}
          defaultvalue={this.props.defaultvalue}
          options={options}
          tasktypevalue={this.props.tasktypevalue}
          tasktypeonchange={this.props.tasktypeonchange}
          className={this.props.className}
          isError={this.props.isError}
        />
      </div>
    );
  }
}

DropdownSelect.propTypes = {
  name: PropTypes.string,
  onchange: PropTypes.func,
  defaultvalue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object,
    PropTypes.string,
  ]),
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  isError: PropTypes.bool,
};
