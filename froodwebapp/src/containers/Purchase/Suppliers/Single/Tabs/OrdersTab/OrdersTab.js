import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import {
  supplierOrdersGetRequest,
} from 'redux-base/actions';
import { ActionButton, FroodSearchInput } from 'components';
import { Table, Spin } from 'antd';
import { table, row } from 'styles/common.scss';
import columns from './ordersTabHelpers';

const mapStateToProps = state => ({
  loadingPage: state.supplier.loadingPage,
  orders: state.supplier.orders,
});

const mapDispatchToProps = {
  supplierOrdersGetRequest,
};

export class OrdersTab extends Component {
  onSearchChange = (value) => {
    this.props.supplierOrdersGetRequest({
      id: this.props.supplierId,
      orderNo: value
    });
  }

  render() {
    const {
      orders,
      loadingPage
    } = this.props;

    return (
      <div>
        <Row between="xs" middle="xs" className={ row }>
          <Col xs>
            <FroodSearchInput
              placeholder="Search by Order number"
              onChange={ this.onSearchChange }
            />
          </Col>
          <Col xs>
            <ActionButton style={ { marginLeft: 'auto' } }>
              New PO
            </ActionButton>
          </Col>
        </Row>
        <Row className={ row }>
          <Col xs>
            <Spin spinning={ loadingPage }>
              <Table
                className={ table }
                rowKey="id"
                size="middle"
                columns={ columns }
                dataSource={ orders }
              />
            </Spin>
          </Col>
        </Row>
      </div>
    );
  }
}

OrdersTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  // data
  supplierId: PropTypes.string.isRequired,
  orders: PropTypes.array.isRequired,
  // redux-base
  supplierOrdersGetRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersTab);
