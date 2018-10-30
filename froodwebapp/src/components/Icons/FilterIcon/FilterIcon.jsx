import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { filterIcon } from './FilterIcon.scss';

const FilterIcon = ({
  id,
  type = 'filter',
  onClick
}) => (
  <Icon
    id={ id }
    type={ type }
    className={ filterIcon }
    onClick={ onClick }
  />
);

FilterIcon.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default FilterIcon;
