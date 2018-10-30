import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Icon from 'react-icons-kit';
import { warning } from 'react-icons-kit/ikons/warning';

import styles from '../../Booking/containers/TimelineCalendar/DomaBooking-styles.scss';

// Reusable ReactSelectAdapter component
export default class ReactSelectAdapter extends PureComponent {
  state = {
    selectedOption: this.props.defaultvalue,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.tasktypevalue !== nextProps.tasktypevalue) {
      this.setState({
        selectedOption: nextProps.tasktypevalue,
      });
    }
  }

  handleChange = (selectedOption) => {
    if (this.props.tasktypeonchange) {
      this.props.tasktypeonchange(selectedOption.value);
    } else {
      this.setState({ selectedOption: selectedOption.value });
    }
    if (this.props.onchange) {
      this.props.onchange(selectedOption.value);
    }
    this.props.input.onChange(selectedOption.value);
  }

  render() {
    const { selectedOption } = this.state;

    return (
      <div className={this.props.className}>
        <Select
          name={this.props.input.name}
          value={selectedOption || ''}
          onChange={this.handleChange}
          options={this.props.options}
          className={styles.react_select_adapter}
          placeholder={
            <div>
              <span>
                <p style={{ float: 'left' }}>search</p>
                {this.props.isError && <Icon className={styles.general__icon_warning} icon={warning} />}
              </span>
            </div>
          }
          clearable={false}
        />
      </div>
    );
  }
}

ReactSelectAdapter.propTypes = {
  onchange: PropTypes.func,
  defaultvalue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object,
    PropTypes.string,
  ]),
  name: PropTypes.string,
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  input: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  isError: PropTypes.bool,
};
