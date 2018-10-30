import React from 'react';
import {
  TableHeaderColumn,
  TableRow
} from 'material-ui/Table';

export const TableHead = () => {
  return (
    <TableRow>
      <TableHeaderColumn colSpan="1"></TableHeaderColumn>
      <TableHeaderColumn colSpan="5">Key Relationship</TableHeaderColumn>
      <TableHeaderColumn colSpan="5">Relationship Name</TableHeaderColumn>
    </TableRow>
  );
};
