import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { refreshIcon } from './RefreshIcon.scss';

const RefreshIcon = ({ onClick }) => (
  <Icon
    type="sync"
    className={ refreshIcon }
    onClick={ onClick }
  />
);


RefreshIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default RefreshIcon;
