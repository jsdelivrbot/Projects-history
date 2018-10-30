import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { closeIcon } from './CloseIcon.scss';

const CloseIcon = ({ onClick }) => (
  <Icon
    type="close-circle-o"
    className={ closeIcon }
    onClick={ onClick }
  />
);

CloseIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CloseIcon;
