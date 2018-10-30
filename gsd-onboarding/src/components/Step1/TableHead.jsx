import React from 'react';
import {
  TableHeaderColumn,
  TableRow
} from 'material-ui/Table';

export const TableHead = () => {
  return (
    <TableRow>
      <TableHeaderColumn colSpan="1"></TableHeaderColumn>
      <TableHeaderColumn colSpan="5">Company</TableHeaderColumn>
      <TableHeaderColumn colSpan="5">Notes</TableHeaderColumn>
    </TableRow>
  );
};
