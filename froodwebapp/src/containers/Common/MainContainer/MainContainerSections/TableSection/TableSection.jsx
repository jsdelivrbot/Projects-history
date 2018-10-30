import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import { ConnectedDynamicTable } from 'components';
import { prepareHeaders } from 'utils';
import { pagination } from './TableSection.scss';

class TableSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      selectedRows: []
    };
  }

  componentWillReceiveProps(nextProps) {
    // reset page on new data or tab change
    if (nextProps.totalRows !== this.props.totalRows ||
        nextProps.activeFilterId !== this.props.activeFilterId) {
      this.setState({
        activePage: 1
      });
    }
  }

  handlePaginate = (page, limit, sortByColumn, sortOrder) => {
    const { activeFilterId } = this.props;

    const filter = {
      limit: limit || this.props.limit,
      offset: this.props.limit * (page - 1)
    };

    if (activeFilterId === 'All') { // if Tab === All
      if (sortByColumn) {
        filter.sortBy = sortByColumn;
        filter.sortOrder = sortOrder;
      }
      this.setState(
        { activePage: page },
        () => this.props.getAllItemsRequest(filter));

    } else {
      if (sortByColumn) {
        filter.id = activeFilterId;
        filter.sortBy = sortByColumn;
        filter.sortOrder = sortOrder;
      }

      this.setState(
        { activePage: page },
        () => this.props.getWithFilterRequest({
          payload: filter,
          limit,
          offset: filter.offset
        })
      );
    }
  }

  handleSort = (sortByColumn, sortOrder) => {
    this.handlePaginate(
      this.state.activePage,
      this.props.limit,
      sortByColumn,
      sortOrder
    );
  }

  handleLimitChange = (currentPage, limit) => {
    this.handlePaginate(currentPage, limit);
  }

  handleUpdateColumnsOrder = (columns) => {
    const {
      activeFilterId,
      limit,
      offset
    } = this.props;

    const payload = {
      columns,
      limit,
      offset
    };

    if (activeFilterId !== 'All') {
      payload.filterId = activeFilterId;
    }

    this.props.updateColumnsRequest({ payload });
  }

  handleSelectRows = (rowId, checked) => {
    if (rowId === 'all' && checked) {
      const allRows = this.props.data.map(item => item.id);
      this.setState({
        selectedRows: allRows
      });
    } else if (rowId === 'all' && !checked) {
      this.setState({
        selectedRows: []
      });
    } else {
      const selectedRows = [...this.state.selectedRows];
      const selectedRow = selectedRows.find(sr => sr === rowId);

      if (!selectedRow) {
        selectedRows.push(rowId);
      } else {
        const index = selectedRows.indexOf(selectedRow);
        selectedRows.splice(index, 1);
      }

      this.setState({
        selectedRows
      });
    }
  }

  handleRowClick = (e) => {
    this.props.handleRowClick(e.target.parentNode.id);
  }

  handleDownloadItem = (e) => {
    this.props.downloadItemRequest({
      id: e.target.id
    });
  }

  render() {
    const {
      columns,
      data,
      totalRows,
      loadingTableData,
      actionColumnVisible,
      limit
    } = this.props;

    const {
      activePage,
      selectedRows
    } = this.state;

    const tableDefaultColumns = columns.filter(col => col.isDefault === true);

    return (
      <div id="salesTable">
        <ConnectedDynamicTable
          // trigger
          loadingTableData={ loadingTableData }
          // props
          actionColumnVisible={ actionColumnVisible }
          selectedRows={ selectedRows }
          // data
          data={ data }
          headers={ prepareHeaders(tableDefaultColumns) }
          // handlers
          handleRowClick={ this.handleRowClick }
          handleUpdateColumnsOrder={ this.handleUpdateColumnsOrder }
          handleDownloadItem={ this.handleDownloadItem }
          handleSelectRows={ this.handleSelectRows }
          handleSort={ this.handleSort }

        />
        <Row end="xs">
          <Col xs sm md lg>
            <Pagination
              className={ pagination }
              onChange={ this.handlePaginate }
              showSizeChanger
              onShowSizeChange={ this.handleLimitChange }
              defaultCurrent={ 1 }
              pageSize={ limit }
              current={ activePage }
              showTotal={ total => `Total ${total} records` }
              total={ totalRows }
            />
          </Col>
        </Row>
      </div>
    );
  }
}

TableSection.propTypes = {
  // trigger
  loadingTableData: PropTypes.bool.isRequired,
  // data
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  // props
  actionColumnVisible: PropTypes.bool,
  limit: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  totalRows: PropTypes.number.isRequired,
  activeFilterId: PropTypes.string.isRequired,
  handleRowClick: PropTypes.func.isRequired,
  // redux-base
  getAllItemsRequest: PropTypes.func.isRequired,
  getWithFilterRequest: PropTypes.func.isRequired,
  updateColumnsRequest: PropTypes.func.isRequired,
  downloadItemRequest: PropTypes.func,
};

export default TableSection;
