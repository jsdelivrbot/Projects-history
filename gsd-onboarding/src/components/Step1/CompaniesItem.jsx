import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

export const CompaniesItem = (props) => {
  return (
  	<TableRow displayBorder={props.displayBorder}>
      <TableRowColumn colSpan="1">{props.company.id}</TableRowColumn>
      <TableRowColumn colSpan="5">
	      <TextField
          hintText="Enter Company Name"
          fullWidth
        />
      </TableRowColumn>
      <TableRowColumn colSpan="5">
	      <TextField
          hintText="Enter Company Note"
          fullWidth
        />
      </TableRowColumn>
    </TableRow>
  );
};

CompaniesItem.propTypes = {
  company: PropTypes.object,
  displayBorder: PropTypes.bool,
};
