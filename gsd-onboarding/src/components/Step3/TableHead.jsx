import React from 'react';
import {
  TableHeaderColumn,
  TableRow
} from 'material-ui/Table';

export const TableHead = () => {
  return (
    <TableRow>
      <TableHeaderColumn colSpan="1" />
      <TableHeaderColumn colSpan="2">Strategy</TableHeaderColumn>
    </TableRow>
  );
};