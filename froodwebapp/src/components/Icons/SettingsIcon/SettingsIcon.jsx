import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { settingsIcon } from './SettingsIcon.scss';

const SettingsIcon = ({ onClick }) => (
  <Icon
    type="setting"
    className={ settingsIcon }
    onClick={ onClick }
  />
);


SettingsIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SettingsIcon;
