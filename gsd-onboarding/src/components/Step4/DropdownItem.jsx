import React from 'react';
import PropTypes from 'prop-types';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import { Dropdown } from '../CommonBlocks/Dropdown/Dropdown';

export const DropdownItem = (props) => {
  return (
  	<TableRow displayBorder={ props.displayBorder }>
      <TableRowColumn colSpan="1" style={ { textAlign: 'center' } }>{ props.item.id }</TableRowColumn>
      <TableRowColumn colSpan="2" style={ { textAlign: 'center' } }>
	      <Dropdown dropdownValues={ props.dropdownValues } />
      </TableRowColumn>
    </TableRow>
  );
};

DropdownItem.propTypes = {
  item: PropTypes.object,
  dropdownValues: PropTypes.array,
  displayBorder: PropTypes.bool,
};
