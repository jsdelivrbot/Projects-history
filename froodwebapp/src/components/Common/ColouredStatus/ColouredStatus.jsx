import React from 'react';
import PropTypes from 'prop-types';
import { colouredStatus } from './ColouredStatus.scss';

const ColouredStatus = ({ color, status }) => (
  <div
    className={ colouredStatus }
    style={ { backgroundColor: color } }
  >
    { status }
  </div>
);

ColouredStatus.propTypes = {
  status: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default ColouredStatus;
