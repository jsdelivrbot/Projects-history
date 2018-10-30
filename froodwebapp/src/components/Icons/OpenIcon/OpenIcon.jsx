import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { openIcon } from './OpenIcon.scss';

const OpenIcon = ({ onClick }) => (
  <Icon
    type="plus-circle-o"
    className={ openIcon }
    onClick={ onClick }
  />
);


OpenIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default OpenIcon;
