/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  GridTable
} from 'components';
import {
  scWarehousesUsersGetRequest,
  stockCountGetRequest,
  stockCountDetailConfirmUpdateRequest
} from 'redux-base/actions';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'react-flexbox-grid';
import { Spin, Input } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import ConnectedStockCountForm from './StockCountForm';
import columns from './stockCountHelpers';
import styles from './StockCount.scss';

const { Search } = Input;

const mapStateToProps = state => ({
  loadingPage: state.stockCount.loadingPage,
  needReload: state.stockCount.needReload,
  initialValues: {
    startDate: moment().format('DD-MMMM-YYYY'),
    ...state.stockCount.stockCount
  },
  stockCount: state.stockCount.stockCount
});

const mapDispatchToProps = {
  scWarehousesUsersGetRequest,
  stockCountGetRequest,
  stockCountDetailConfirmUpdateRequest
};

export class StockCount extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tableData: []
    };
  }

  componentWillMount() {
    this.getStockCount();
    if (this.props.isNewStockCount) {
      this.props.scWarehousesUsersGetRequest();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.needReload) {
      this.getStockCount();
    }

    if (nextProps.stockCount.details) {
      this.setState({
        tableData: nextProps.stockCount.details
      });
    }
  }

  getStockCount = () => {
    if (!this.props.isNewStockCount) {
      this.props.stockCountGetRequest({
        id: this.props.stockCountId
      });
    }
  }

  getStatus = () => (
    this.props.stockCount.status || 'Assigned'
  )

  handleNewQty = (newTableData, index) => {
    const tableData = [...newTableData];
    tableData[index].change = tableData[index].newQty - tableData[index].stockOnHand;
    this.setState({
      tableData
    });
  }

  handleSearchChange = (e) => {
    const searchValue = e.target.value;
    const filteredData = this.props.stockCount.details.filter(item =>
      item.sku.toLowerCase().includes(searchValue.toLowerCase())
    );
    this.setState({
      tableData: filteredData
    });
  }

  handleConfirm = (e) => {
    const detailId = e.target.id;
    const { newQty } = this.state.tableData.find(item => item.id === Number(detailId));
    this.props.stockCountDetailConfirmUpdateRequest({
      id: this.props.stockCount.id,
      detailId,
      payload: {
        newQty
      }
    });
  }

  render() {

    const { tableData } = this.state;
    const {
      initialValues,
      loadingPage,
      isNewStockCount
    } = this.props;
    const status = this.getStatus();

    return (
      <div>
        <Spin spinning={ loadingPage }>
          <Row className={ styles.formWrapper }>
            <Col xs>
              <ConnectedStockCountForm
                initialValues={ initialValues }
                started={ status !== 'Assigned' }
                isNewStockCount={ isNewStockCount }
                tableData={ tableData }
              />
            </Col>
          </Row>
          { (status !== 'Assigned' && !isNewStockCount) &&
          <div>
            <Row>
              <Col xs>
                <Search
                  className={ styles.search }
                  placeholder="Type to search SKU/Variant"
                  onChange={ this.handleSearchChange }
                />
              </Col>
            </Row>
            <Row className={ styles.table }>
              <Col xs>
                <GridTable
                  columns={ columns(this.handleConfirm) }
                  dataSource={ tableData }
                  rowKey="id"
                  pagination={ false }
                  updateTableData={ this.handleNewQty }
                />
              </Col>
            </Row>
          </div>
          }
        </Spin>
      </div>
    );
  }
}

StockCount.propTypes = {
  // props
  isNewStockCount: PropTypes.bool,
  stockCountId: PropTypes.number,
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  needReload: PropTypes.bool.isRequired,
  // redux base
  scWarehousesUsersGetRequest: PropTypes.func.isRequired,
  stockCountGetRequest: PropTypes.func.isRequired,
  stockCountDetailConfirmUpdateRequest: PropTypes.func.isRequired,
  // redux-form related props
  initialValues: PropTypes.object.isRequired,
  stockCount: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StockCount));
