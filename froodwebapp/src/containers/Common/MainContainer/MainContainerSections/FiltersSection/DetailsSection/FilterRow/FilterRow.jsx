/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { FroodSelect } from 'components';
import { AddIcon, DeleteIcon } from 'icons';
import { logicOperators, relationalOperators, getMenuItems } from 'utils';
import getComponentByType from './getComponentByType';

const FilterRow = ({
  rowIndex,
  rowData: {
    id,
    value,
    columnId,
    logicalOpId,
    relationalOpId
  },
  filterColumns,
  handleChangeColumn,
  handleChangeColumnAvailableValue,
  handleChangeLogicalOperator,
  handleChangeRelationalOperator,
  handleFilterInputChange,
  handleDatePickerChange,
  handleAddFilterRow,
  handleDeleteFilterRow
}) => {

  const {
    tableDataType,
    availableValues
  } = filterColumns.find(col => col.id === Number(columnId));

  let relationalOperatorsItems = relationalOperators;

  if (tableDataType.includes('varchar')) {
    relationalOperatorsItems = relationalOperators.filter(op => op.symbol === '=' || op.symbol === '!=');
  }

  return (
    <Row middle="xs">
      <Col xs={ 2 } sm={ 1 } md={ 1 } lg={ 1 }>
        { rowIndex !== 0 &&
          <FroodSelect
            id={ id }
            menuItems={ logicOperators }
            value={ logicalOpId }
            onChange={ handleChangeLogicalOperator }
          />
        }
      </Col>
      <Col xs sm={ 3 } md={ 3 } lg={ 2 }>
        <FroodSelect
          id={ id }
          menuItems={ getMenuItems(filterColumns) }
          value={ columnId }
          onChange={ handleChangeColumn }
        />
      </Col>
      <Col xs sm={ 2 } md={ 2 } lg={ 2 }>
        <FroodSelect
          id={ id }
          menuItems={ relationalOperatorsItems }
          value={ relationalOpId }
          onChange={ handleChangeRelationalOperator }
        />
      </Col>
      { availableValues &&
        <Col xs sm={ 4 } md={ 4 } lg={ 3 }>
          <FroodSelect
            id={ id }
            value={ value }
            menuItems={ availableValues }
            onChange={ handleChangeColumnAvailableValue }
          />
        </Col>
      }
      { !availableValues &&
        <Col xs sm={ 4 } md={ 4 } lg={ 3 }>
          { getComponentByType(
            id, // filterId
            tableDataType.toLowerCase(), // columnDataType
            value, // filterValue
            handleFilterInputChange, // Input Change handler
            handleDatePickerChange // DatePicker Change handler
          )}
        </Col>
      }
      <Col xs sm={ 2 } md={ 2 } lg={ 1 }>
        <AddIcon
          id={ id }
          onClick={ handleAddFilterRow }
        />
        { rowIndex !== 0 &&
          <DeleteIcon
            id={ id }
            onClick={ handleDeleteFilterRow }
          />
        }
      </Col>
    </Row>
  );
};

FilterRow.propTypes = {
  filterColumns: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired,
  rowData: PropTypes.object.isRequired,
  handleChangeColumn: PropTypes.func.isRequired,
  handleChangeColumnAvailableValue: PropTypes.func.isRequired,
  handleChangeLogicalOperator: PropTypes.func.isRequired,
  handleChangeRelationalOperator: PropTypes.func.isRequired,
  handleFilterInputChange: PropTypes.func.isRequired,
  handleDatePickerChange: PropTypes.func.isRequired,
  handleAddFilterRow: PropTypes.func.isRequired,
  handleDeleteFilterRow: PropTypes.func.isRequired
};

export default FilterRow;

