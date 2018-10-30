/**
*
* SearchBox
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import Icon from 'react-icons-kit';
import { chevronRight } from 'react-icons-kit/fa/chevronRight';

import styles from './IconMenu-styles.scss';

const IconMenu = ({ icon, iconBackground, text, selectedBackground, selected }) => <div
  className={styles['icon-menu']}
  style={{ background: selected ? selectedBackground : 'none', color: selected ? 'white' : undefined }}
>
  <div style={{ background: iconBackground }} className={styles['icon-container']}>
    <Icon size={16} icon={icon} />
  </div>
  <FormattedMessage {...text} />
  { selected && <Icon size={25} icon={chevronRight} className={styles['chevron-right']} />}
</div>;

IconMenu.propTypes = {
  icon: PropTypes.shape({
    viewBox: PropTypes.string,
    children: PropTypes.array,
  }),
  text: PropTypes.shape({
    id: PropTypes.string,
    defaultMessage: '',
  }),
  iconBackground: PropTypes.string,
  selectedBackground: PropTypes.string,
  selected: PropTypes.bool,
};

IconMenu.defaultProps = {
  icon: chevronRight,
  text: {
    id: 'internalMenu.text',
    defaultMessage: 'Menu item',
  },
  iconBackground: '#36ABE0',
  selectedBackground: '#36ABE0',
  selected: false,
};

export default IconMenu;
