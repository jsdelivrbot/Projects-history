import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import styles from '../TaskConfirm-styles.scss';

// Reusable ReactSelectAdapter component
export default class EmployeeDropDown extends PureComponent {
  state = {
    selectedOption: this.props.defaultvalue,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.defaultvalue !== nextProps.defaultvalue) {
      this.setState({
        selectedOption: nextProps.defaultvalue,
      });
    }
  }

  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        name={'dd-select'}
        value={selectedOption || ''}
        onChange={this.props.onchange}
        options={this.props.options}
        className={styles.react_select_adapter}
        clearable={false}
        arrowRenderer={this.props.renderArrow}
        valueRenderer={() => <span style={{ color: 'white' }}>{selectedOption}</span>}
      />
    );
  }
}

EmployeeDropDown.propTypes = {
  onchange: PropTypes.func,
  defaultvalue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object,
    PropTypes.string,
  ]),
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  renderArrow: PropTypes.func,
};
