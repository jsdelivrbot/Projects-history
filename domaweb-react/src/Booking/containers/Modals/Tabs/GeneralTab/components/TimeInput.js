import React from 'react';
import PropTypes from 'prop-types';

import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

export default class TimeInput extends React.Component {
  state = {
    open: false,
  };
  setOpen = ({ open }) => this.setState({ open });

  setClose = () => this.setState({ open: false });

  render() {
    const {
      classname,
      onchange,
      selected,
      disabled,
      type,
    } = this.props;
    return (
      <div className={classname}>
        <TimePicker
          showSecond={false}
          open={this.state.open}
          onChange={(date) => { onchange(date, type); this.setClose(); }}
          clearText={'Clear Time'}
          value={selected}
          disabled={disabled}
          onOpen={this.setOpen}
          onClose={this.setOpen}
          focusOnOpen
        />
      </div>
    );
  }
}

TimeInput.propTypes = {
  classname: PropTypes.string,
  onchange: PropTypes.func.isRequired,
  selected: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]).isRequired,
  disabled: PropTypes.bool,
  type: PropTypes.string,
};
