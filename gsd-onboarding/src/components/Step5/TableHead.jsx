import React from 'react';
import {
  TableHeaderColumn,
  TableRow
} from 'material-ui/Table';

export const TableHead = () => {
  return (
    <TableRow>
      <TableHeaderColumn colSpan="1"></TableHeaderColumn>
      <TableHeaderColumn colSpan="5">Strategy Vertical</TableHeaderColumn>
      <TableHeaderColumn colSpan="5">Strategy Sub-Vertical</TableHeaderColumn>
    </TableRow>
  );
};
