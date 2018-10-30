import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { deleteIcon } from './DeleteIcon.scss';

const DeleteIcon = ({
  id,
  type = 'delete',
  onClick
}) => (
  <Icon
    id={ id }
    type={ type }
    className={ deleteIcon }
    onClick={ onClick }
  />
);

DeleteIcon.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default DeleteIcon;
