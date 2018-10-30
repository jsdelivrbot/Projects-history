import React from 'react';
import PropTypes from 'prop-types';
import styles from '../StickyTable.scss';

const Row = props => (
  <div { ...props } className={ styles.row }>
    { props.children }
  </div>
);

Row.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ])
};

export default Row;
