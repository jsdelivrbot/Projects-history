import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from '../CommonBlocks/Dropdown/Dropdown';
import { TextArea } from '../CommonBlocks/TextArea/TextArea';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

export const DropdownItem = (props) => {
  return (
    <TableRow>
      <TableRowColumn colSpan="1">{props.item.id}</TableRowColumn>
      <TableRowColumn colSpan="5">
        <Dropdown dropdownValues={props.dropdownValues} fullwidth />
      </TableRowColumn>
      <TableRowColumn colSpan="5">
        <TextArea fullwidth />
      </TableRowColumn>
    </TableRow>
  );
};

DropdownItem.propTypes = {
  item: PropTypes.object,
  dropdownValues: PropTypes.array,
};
