import React from 'react';
import PropTypes from 'prop-types';
import { GridTable } from 'components';

const FormGridTable = props => (
  <GridTable
    dataSource={ props.input.value }
    updateTableData={ props.input.onChange }
    { ...props }
  />
);

FormGridTable.propTypes = {
  input: PropTypes.object.isRequired,
};

export default FormGridTable;
