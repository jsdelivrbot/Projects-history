/* eslint-disable babel/new-cap, react/no-array-index-key, react/no-unused-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spin, Alert } from 'antd';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import getTableRows from './getTableRows';
import StickyTable from './StickyTable';
import BulkMenu from './BulkMenu/BulkMenu';
import styles from './StickyTable.scss';

export class DynamicTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: props.headers,
      data: props.data,
      selectedRows: props.selectedRows,
      tableRows: getTableRows(
        props.headers,
        props.data,
        props.selectedRows,
        props.handleRowClick,
        props.handleDownloadItem,
        props.handleSelectRows,
        props.handleSort,
        props.actionColumnVisible,
        this.moveHeader,
        this.saveHeaderOrder
      )
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loadingTableData) {
      this.setState({
        headers: nextProps.headers,
        data: nextProps.data,
        selectedRows: nextProps.selectedRows,
        tableRows: getTableRows(
          nextProps.headers,
          nextProps.data,
          nextProps.selectedRows,
          nextProps.handleRowClick,
          nextProps.handleDownloadItem,
          nextProps.handleSelectRows,
          nextProps.handleSort,
          nextProps.actionColumnVisible,
          this.moveHeader,
          this.saveHeaderOrder
        )
      });
    }
  }

  moveHeader = (dragIndex, hoverIndex) => {
    const { headers } = this.state;
    const dragHeader = headers[dragIndex];

    const newState = update(this.state, {
      headers: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragHeader],
        ],
      }
    });

    this.setState({
      headers: newState.headers,
      tableRows: getTableRows(
        newState.headers,
        this.state.data,
        this.state.selectedRows,
        this.props.handleRowClick,
        this.props.handleDownloadItem,
        this.props.handleSelectRows,
        this.props.handleSort,
        this.props.actionColumnVisible,
        this.moveHeader,
        this.saveHeaderOrder
      )
    });
  }

  saveHeaderOrder = () => {
    const { headers } = this.state;

    this.props.handleUpdateColumnsOrder(headers.map((header, index) => ({
      id: header.id,
      order: index
    })));
  }

  render() {
    const { tableRows, selectedRows } = this.state;
    const { loadingTableData } = this.props;

    return (
      <div id="dynamicTable" className={ styles.dynamicTable }>
        { (tableRows.length === 1 &&
          !loadingTableData &&
          <Alert
            message="No Data"
            type="info"
            className={ styles.dynamicTableAlert }
          />) ||
          <div>
            { selectedRows.length !== 0 &&
              <BulkMenu
                selectedRowsNumber={ selectedRows.length }
              />
            }
            <Spin
              tip="Loading..."
              spinning={ loadingTableData }
            >
              <StickyTable>
                { tableRows }
              </StickyTable>
            </Spin>
          </div>
        }
      </div>
    );
  }
}

DynamicTable.propTypes = {
  data: PropTypes.array,
  headers: PropTypes.array,
  selectedRows: PropTypes.array,
  loadingTableData: PropTypes.bool,
  actionColumnVisible: PropTypes.bool,
  handleSelectRows: PropTypes.func.isRequired,
  handleSort: PropTypes.func.isRequired,
  handleRowClick: PropTypes.func,
  handleUpdateColumnsOrder: PropTypes.func.isRequired,
  handleDownloadItem: PropTypes.func
};

export default DragDropContext(HTML5Backend)(DynamicTable);
