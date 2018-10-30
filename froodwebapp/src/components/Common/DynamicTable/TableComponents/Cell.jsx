import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from '../StickyTable.scss';

const Cell = props => (
  <div { ...props } className={ classnames(styles.cell, { [props.className]: props.className && true }) }>
    { props.children }
  </div>
);

Cell.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};

export default Cell;
