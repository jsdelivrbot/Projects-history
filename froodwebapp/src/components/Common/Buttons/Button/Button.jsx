import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Button.scss';

const Button = ({
  id,
  children,
  color,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  style
}) => (
  <button
    id={ id }
    type={ type }
    className={ classnames(styles.button, { [styles.disabled]: disabled }, className) }
    style={ {
      backgroundColor: color,
      ...style,
    } }
    onClick={ !disabled && onClick }
  >
    { children }
  </button>
);

Button.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;
