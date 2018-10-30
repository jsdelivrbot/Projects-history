import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FontAwesome from 'react-fontawesome';
import { sortIcon } from './SortIcon.scss';


const SortIcon = ({ onClick }) => (
  <FontAwesome
    className={ classnames('fa-sort', sortIcon) }
    name="fa-sort"
    onClick={ onClick }
  />
);

SortIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SortIcon;
