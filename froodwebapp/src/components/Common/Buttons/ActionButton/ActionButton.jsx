import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { Button } from 'components';
import classnames from 'classnames';
import { actionButton } from './ActionButton.scss';

const ActionButton = ({
  type = 'button',
  disabled = false,
  className,
  children,
  onClick,
  style
}) => (
  <Button
    style={ style }
    type={ type }
    disabled={ disabled }
    className={ classnames(actionButton, className) }
    onClick={ onClick }
  >
    <FontAwesome
      className="fa-th"
      name="fa-th"
    />
    { children }
  </Button>
);

ActionButton.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ActionButton;
