import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import classnames from 'classnames';
import styles from './BulkMenu.scss';

const BulkMenuBodyItem = ({
  icon,
  onClick,
  text
}) => (
  <div className={ styles.bulkMenuBodyItem }>
    <FontAwesome
      className={ classnames(icon, { [styles.bulkMenuActionIcon]: true }) }
      name={ icon }
      onClick={ onClick }
    />
    { text }
  </div>
);

BulkMenuBodyItem.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default BulkMenuBodyItem;
