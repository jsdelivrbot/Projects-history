import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { addIcon } from './AddIcon.scss';

const AddIcon = ({
  id,
  type = 'plus-circle-o',
  onClick
}) => (
  <Icon
    id={ id }
    type={ type }
    className={ addIcon }
    onClick={ onClick }
  />
);

AddIcon.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default AddIcon;
