import React from 'react';
import PropTypes from 'prop-types';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import { TextArea } from '../CommonBlocks/TextArea/TextArea';

export const ServicesItem = (props) => {
  return (
  	<TableRow>
      <TableRowColumn colSpan="1" style={{textAlign: 'center'}}>{props.service.id}</TableRowColumn>
      <TableRowColumn colSpan="2" style={{textAlign: 'center'}}>
	      <TextArea fullwidth />
      </TableRowColumn>
    </TableRow>
  );
};

ServicesItem.propTypes = {
  service: PropTypes.object,
};
