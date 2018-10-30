import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

export const TaxonomyTable = (props) => {
	const paperStyle = {
    padding: 20,
  };
  return (
    <Paper zDepth={2} style={paperStyle}>
      <Table>
        <TableHeader 
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            <TableHeaderColumn >Group</TableHeaderColumn>
            <TableHeaderColumn>Subgroup</TableHeaderColumn>
            <TableHeaderColumn>Description</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {props.tableData.map( (row, index) => (
            <TableRow className="rowWithoutBorder" key={index}>
              <TableRowColumn 
                style={
                  {
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                    borderBottom: row.border && "1px solid rgb(224, 224, 224)"
                  }
                }
              >
                {row.group}
              </TableRowColumn>
              <TableRowColumn 
                style={
                  {
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                    borderBottom: "1px solid rgb(224, 224, 224)",
                    borderLeft: "1px solid rgb(224, 224, 224)",
                  }
                }
              >
                {row.subgroup}
              </TableRowColumn>
              <TableRowColumn 
                style={
                  {
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                    borderBottom: "1px solid rgb(224, 224, 224)"
                  }
                }
              >
                {row.description}
              </TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

TaxonomyTable.propTypes = {
  tableData: PropTypes.array,
};