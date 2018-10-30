import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { Table, Pagination, Spin } from 'antd';
import { ConnectedCustomerOrderAutoComplete } from 'components';
import { customerOrdersGetRequest } from 'redux-base/actions';
import { rowsContainer, table } from 'styles/common.scss';

import ordersColumns from './columns';


const mapStateToProps = state => ({
  orders: state.customerProfile.orders,
  loadingPage: state.customerProfile.loadingPage
});

const mapDispatchToProps = {
  customerOrdersGetRequest,
  push
};

export class OrdersTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      limit: 10,
      offset: 0,
      autocompleteKeyword: ''
    };
  }

  handleLimitChange = (current, pageSize) => {
    this.setState({
      limit: pageSize,
      offset: 0,
      activePage: 1
    }, () => this.props.customerOrdersGetRequest({
      id: this.props.customerId,
      limit: this.state.limit,
      offset: this.state.offset
    }));
  }

  handleEdit = (e) => {
    const url = `/sales/orders/${e.target.id}`;
    this.props.push(url);
  }

  handleCancel = () => {
    // TODO when api will be done
  }

  handlePaginate = (activePage) => {
    const { limit } = this.state;
    this.setState({
      activePage
    }, () => this.props.customerOrdersGetRequest({
      id: this.props.customerId,
      offset: (activePage - 1) * limit,
      limit
    }));
  }

  handleAutoCompleteChange = (value) => {
    this.setState({
      autocompleteKeyword: value
    });
  }

  handleAutoCompleteSelect = (orderId) => {
    const url = `/sales/orders/${orderId}`;
    this.props.push(url);
  }

  render() {
    const {
      activePage,
      limit,
      autocompleteKeyword
    } = this.state;

    const {
      orders,
      loadingPage,
      customerId
    } = this.props;

    return (
      <Spin spinning={ loadingPage }>
        <div className={ rowsContainer }>
          <Row>
            <Col xs md={ 4 } lg={ 4 }>
              <ConnectedCustomerOrderAutoComplete
                value={ autocompleteKeyword }
                customerId={ customerId }
                onChange={ this.handleAutoCompleteChange }
                onSelect={ this.handleAutoCompleteSelect }
              />
            </Col>
          </Row>
          <Row>
            <Col xs sm md lg>
              <Table
                className={ table }
                columns={ ordersColumns(this.handleEdit, this.handleCancel) }
                dataSource={ orders.data }
                size="small"
                pagination={ false }
              />
            </Col>
          </Row>
          <Row end="xs">
            <Col xs sm md lg>
              <Pagination
                onChange={ this.handlePaginate }
                showSizeChanger
                onShowSizeChange={ this.handleLimitChange }
                pageSize={ limit }
                current={ activePage }
                showTotal={ total => `Total ${total} records` }
                total={ orders.totalRows }
              />
            </Col>
          </Row>
        </div>
      </Spin>
    );
  }
}

OrdersTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  // router
  push: PropTypes.func.isRequired,
  // data
  orders: PropTypes.object.isRequired,
  customerId: PropTypes.string.isRequired,
  // redux-base
  customerOrdersGetRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersTab);
