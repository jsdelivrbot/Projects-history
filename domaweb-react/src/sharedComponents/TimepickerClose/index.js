import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-icons-kit';
import { calendar } from 'react-icons-kit/fa/calendar';

class TimepickerClose extends React.Component {

  render() {
    return (
      <div>
        <Icon icon={calendar} size={16} />
      </div>
    );
  }
}

TimepickerClose.propTypes = {

};

export default TimepickerClose;
