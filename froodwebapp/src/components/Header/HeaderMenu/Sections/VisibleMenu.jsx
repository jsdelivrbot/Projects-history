import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { Badge } from 'antd';
import {
  visibleMenu,
  menuIcon,
  arrowIcon,
  badge
} from '../HeaderMenu.scss';

const VisibleMenu = ({
  badgeVisible,
  title,
  activeTitle,
  icon,
  badgeNotificationsCount,
}) => (
  <div className={ visibleMenu }>
    { badgeVisible && <Badge className={ badge } count={ badgeNotificationsCount } /> }
    <div className={ menuIcon }>
      <FontAwesome
        className={ icon }
        name={ icon }
      />
    </div>
    <div>{ title }</div>
    <div
      className={ arrowIcon }
      style={ { color: title === activeTitle ? 'orange' : 'inherit' } }
    >
      <FontAwesome
        className="fa-chevron-down"
        name="fa-chevron-down"
      />
    </div>
  </div>
);

VisibleMenu.propTypes = {
  badgeVisible: PropTypes.bool.isRequired,
  activeTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  badgeNotificationsCount: PropTypes.number,
};

export default VisibleMenu;
