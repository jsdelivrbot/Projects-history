import React from 'react';
import PropTypes from 'prop-types';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { TextArea } from '../CommonBlocks/TextArea/TextArea';

export const InputItem = (props) => {
  return (
  	<TableRow  displayBorder={ props.displayBorder }>
      <TableRowColumn colSpan="1" style={ { textAlign: 'center' } }>
        { props.item.id }
      </TableRowColumn>
      <TableRowColumn colSpan="2" style={ { textAlign: 'center' } }>
	      <TextArea style={ { paddingLeft: '24px', width: '650px' } } />
      </TableRowColumn>
    </TableRow>
  );
};

InputItem.propTypes = {
  item: PropTypes.object,
  displayBorder: PropTypes.bool,
};
