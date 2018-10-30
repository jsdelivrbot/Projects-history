import React from 'react';
import PropTypes from 'prop-types';
import styles from '../StickyTable.scss';

const Table = props => (
  <div { ...props } className={ styles.table }>
    { props.children }
  </div>
);

Table.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ])
};

export default Table;
