import React from 'react';
import PropTypes from 'prop-types';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export const Dropdown = (props) => {
  const limitedWidth = {
    width: '650px',
  };
  const fullWidth = {
    width: '100%',
  };
  return (
    <DropDownMenu
      style={ props.fullwidth ? fullWidth : limitedWidth }
      value={ 1 }
      autoWidth={ false }
    >
      <MenuItem
        style={ fullWidth }
        value={ 1 }
        primaryText="Big Data"
      />
      {
        props.dropdownValues.map((value, index) => 
        (
          <MenuItem 
            autoWidth={ true }
            key={ index }
            value={ value }
            primaryText={ value }
          />
        ))
      }
    </DropDownMenu>
  );
};

Dropdown.propTypes = {
  dropdownValues: PropTypes.array,
  fullwidth: PropTypes.bool,
};

  

