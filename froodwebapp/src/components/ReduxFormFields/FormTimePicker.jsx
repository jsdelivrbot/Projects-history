import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TimePicker, Button } from 'antd';
import moment from 'moment';

class FormTimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleOpen = (open) => {
    this.setState({ open });
  }

  handleClose = () => this.setState({ open: false })

  handleChange = (time, timeString) => {
    this.props.input.onChange(timeString);
  }

  render() {
    const {
      input: { value },
      timeFormat,
      disabled
    } = this.props;
    return (
      <TimePicker
        open={ this.state.open }
        onOpenChange={ this.handleOpen }
        disabled={ disabled || false }
        format={ timeFormat }
        onChange={ this.handleChange }
        style={ { width: '100%' } }
        value={ value !== '' && moment(value, timeFormat) }
        addon={ () => (
          <Button
            size="small"
            type="primary"
            onClick={ this.handleClose }
          >
            Ok
          </Button>
        ) }
      />
    );
  }
}

FormTimePicker.propTypes = {
  input: PropTypes.object.isRequired,
  timeFormat: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};

export default FormTimePicker;
