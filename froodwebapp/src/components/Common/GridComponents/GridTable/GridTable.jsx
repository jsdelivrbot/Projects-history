import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Spin } from 'antd';
import { DeleteIcon } from 'icons';
import { NewTableRow } from 'components';
import { map, first, cloneDeep } from 'lodash';
import classnames from 'classnames';
import { getRandomId } from 'utils';
import { gridTable } from 'styles/common.scss';
import getColumnRender from './getColumnRender';

const { Column } = Table;

class GridTable extends Component {
  // expanded header cell
  handleChangeExpandedCell = (value, rowIndex, propName, parentId) => {
    const dataSource = map(this.props.dataSource, cloneDeep);
    const { children } = dataSource.find(row => row.id === parentId);
    if (children.length === 1) { // if we have 1 child we need to change value of header row also
      dataSource.find(row => row.id === parentId)[propName] = value;
      dataSource.find(row => row.id === parentId).children[rowIndex][propName] = value;
    } else {
      dataSource.find(row => row.id === parentId).children[rowIndex][propName] = value;
    }
    this.props.updateTableData(dataSource, rowIndex, 'add'); // update state
  }

  // expanded header cell (checkbox handling)
  handleChangeHeaderCheckBoxCell = (value, rowIndex, propName) => {
    const dataSource = map(this.props.dataSource, cloneDeep);
    dataSource[rowIndex][propName] = value; // change value of top data
    dataSource[rowIndex].children = dataSource[rowIndex].children.map(item => ({ // replace values of expanded rows for that prop
      ...item,
      [propName]: value
    }));
    this.props.updateTableData(dataSource, rowIndex, 'add'); // update state
  }

  handleChange = (value, rowIndex, propName) => {
    const dataSource = map(this.props.dataSource, cloneDeep);
    dataSource[rowIndex][propName] = value;
    this.props.updateTableData(dataSource, rowIndex, 'add'); // update state
  }

  handleFillSkuData = (skuData, rowIndex) => {
    const dataSource = map(this.props.dataSource, cloneDeep);
    dataSource[rowIndex] = {
      ...dataSource[rowIndex],
      name: skuData.skuName,
      vendorSku: skuData.vendorSku,
      uomName: skuData.uomName,
      availableQty: skuData.availableQuantity,
      tax: skuData.taxRate,
      price: skuData.unitPrice,
      discount: 0
    };

    this.props.updateTableData(dataSource);
  }

  handleAddRow = () => {
    const dataSource = map(this.props.dataSource, cloneDeep);

    const newRow = {
      id: getRandomId(),
      new: true
    };

    // dynamically get new object to add by columns dataIndex
    this.props.columns.forEach((column) => {
      if (column.dataIndex) {
        newRow[column.dataIndex] = '';
      }
    });

    dataSource.push(newRow);
    this.props.updateTableData(dataSource);
  }

  handleDeleteRow = (e) => {
    const dataSource = map(this.props.dataSource, cloneDeep);

    const rowIndex = e.target.id;
    dataSource.splice(rowIndex, 1);

    this.props.updateTableData(dataSource, rowIndex, 'delete');
  }

  handleAddTag = (tag, rowIndex, propName) => {
    const dataSource = map(this.props.dataSource, cloneDeep); // deep clone array
    const tags = dataSource[rowIndex][propName];

    if (tags.includes(tag)) {
      this.props.updateTableData(dataSource, 'uniqError', tag, rowIndex);
    } else {
      tags.push(tag);
      dataSource[rowIndex][propName] = tags;
      this.props.updateTableTags(dataSource, 'add', tag, rowIndex);
    }
  }

  handleDeleteTag = (rowIndex, tagIndex, propName) => {
    const dataSource = map(this.props.dataSource, cloneDeep); // deep clone array
    const tags = dataSource[rowIndex][propName];
    const tag = first(tags.splice(tagIndex, 1));
    dataSource[rowIndex][propName] = tags;
    this.props.updateTableTags(dataSource, 'delete', tag, rowIndex);
  }

  handleModalButtonClick = (rowIndex) => {
    this.props.handleModalButtonClick(rowIndex);
  }

  render() {
    const {
      columns,
      rowKey,
      dataSource,
      className,
      isExpandable,
      loadingData,
      addNewRowVisible
    } = this.props;

    return (
      <Spin spinning={ loadingData }>
        <Table
          className={ classnames(gridTable, className) }
          rowKey={ rowKey }
          dataSource={ dataSource }
          size="small"
          pagination={ false }
        >
          { columns.map((column, index) => {
            if (column.type === 'deleteIconColumn'
             && (column.onlyNewRowsCanBeDeleted || column.allRowsCanBeDeleted)) {
              return (
                <Column
                  width="3%"
                  key={ index }
                  render={ (text, record, rowIndex) => {
                    if (column.onlyNewRowsCanBeDeleted && record.new) {
                      return (
                        <DeleteIcon
                          id={ rowIndex }
                          onClick={ this.handleDeleteRow }
                        />
                      );
                    }

                    if (column.allRowsCanBeDeleted) {
                      return (
                        <DeleteIcon
                          id={ rowIndex }
                          onClick={ this.handleDeleteRow }
                        />
                      );
                    }

                    return null;
                  } }
                />
              );
            }

            return (
              <Column
                key={ index }
                title={ column.title }
                width={ column.width }
                dataIndex={ column.dataIndex }
                className={ column.className }
                render={ column.render ||
                  getColumnRender(
                    isExpandable,
                    column,
                    index,
                    this.handleChange,
                    this.handleChangeHeaderCheckBoxCell,
                    this.handleChangeExpandedCell,
                    this.handleFillSkuData,
                    this.handleAddTag,
                    this.handleDeleteTag,
                    this.handleDeleteRow,
                    this.handleModalButtonClick
                  )
                }
              />
            );
          })}
        </Table>
        { addNewRowVisible &&
          <NewTableRow
            addNewRowText="Add New Item"
            onClick={ this.handleAddRow }
          />
        }
      </Spin>
    );
  }
}

GridTable.defaultProps = {
  rowKey: 'id',
  isExpandable: false,
  loadingData: false,
  addNewRowVisible: false
};

GridTable.propTypes = {
  // trigger
  loadingData: PropTypes.bool,
  className: PropTypes.string,
  // props
  addNewRowVisible: PropTypes.bool,
  isExpandable: PropTypes.bool,
  // data
  dataSource: PropTypes.array,
  columns: PropTypes.array.isRequired,
  rowKey: PropTypes.string,
  // handlers
  updateTableTags: PropTypes.func,
  updateTableData: PropTypes.func,
  handleModalButtonClick: PropTypes.func
};

export default GridTable;
