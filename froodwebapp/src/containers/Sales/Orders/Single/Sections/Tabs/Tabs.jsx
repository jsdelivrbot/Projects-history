import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import {
  orderGetRequest,
  orderGetAllocationDataRequest,
  orderGetPickDataRequest,
  orderGetPackDataRequest,
  orderGetShipDataRequest,
  orderGetInvoiceDataRequest
} from 'redux-base/actions';
import { connect } from 'react-redux';
import {
  ConnectedOrderTab,
  ConnectedAllocationsTab,
  ConnectedPickTab,
  ConnectedPackTab,
  ConnectedShipTab,
  ConnectedInvoiceTab
} from './index';

const mapDispatchToProps = {
  orderGetRequest,
  orderGetPickDataRequest,
  orderGetAllocationDataRequest,
  orderGetPackDataRequest,
  orderGetShipDataRequest,
  orderGetInvoiceDataRequest
};

const { TabPane } = Tabs;

export class OrderTabs extends Component {
  componentWillMount() {
    if (!this.props.isNewOrder) {
      this.props.orderGetRequest({
        id: this.props.orderId
      });
    }
  }

  handleTabClick = (activeTab) => {
    const { orderId } = this.props;

    switch (activeTab) {
      case 'order':
        if (!this.props.isNewOrder) {
          this.props.orderGetRequest({
            id: orderId
          });
        }
        break;
      case 'allocations':
        this.props.orderGetAllocationDataRequest({ id: orderId });
        break;
      case 'pick':
        this.props.orderGetPickDataRequest({ id: orderId });
        break;
      case 'pack':
        this.props.orderGetPackDataRequest({ id: orderId });
        break;
      case 'ship':
        this.props.orderGetShipDataRequest({ id: orderId });
        break;
      case 'invoice':
        this.props.orderGetInvoiceDataRequest({ id: orderId });
        break;
      default:
    }
  }

  render() {
    const {
      // common data
      isNewOrder,
      disabled,
      // redux-form
      handleSubmit,
      onFieldChange
    } = this.props;

    return (
      <Row>
        <Col xs>
          <Tabs
            defaultActiveKey="order"
            onTabClick={ this.handleTabClick }
            animated={ false }
          >
            <TabPane
              key="order"
              tab="Order"
            >
              <ConnectedOrderTab
                disabled={ disabled }
                isNewOrder={ isNewOrder }
                onFieldChange={ onFieldChange }
                handleSubmit={ handleSubmit }
              />
            </TabPane>
            { !isNewOrder &&
              <TabPane
                key="allocations"
                tab="Allocations"
              >
                <ConnectedAllocationsTab />
              </TabPane>
            }
            { !isNewOrder &&
              <TabPane
                key="pick"
                tab="Pick"
              >
                <ConnectedPickTab />
              </TabPane>
            }
            { !isNewOrder &&
              <TabPane
                key="pack"
                tab="Pack"
              >
                <ConnectedPackTab />
              </TabPane>
            }
            { !isNewOrder &&
              <TabPane
                key="ship"
                tab="Ship"
              >
                <ConnectedShipTab />
              </TabPane>
            }
            { !isNewOrder &&
              <TabPane
                key="invoice"
                tab="Invoice"
              >
                <ConnectedInvoiceTab />
              </TabPane>
            }
          </Tabs>
        </Col>
      </Row>
    );
  }
}

OrderTabs.propTypes = {
  // data
  orderId: PropTypes.string,
  // redux-base
  orderGetRequest: PropTypes.func.isRequired,
  orderGetAllocationDataRequest: PropTypes.func.isRequired,
  orderGetPickDataRequest: PropTypes.func.isRequired,
  orderGetPackDataRequest: PropTypes.func.isRequired,
  orderGetShipDataRequest: PropTypes.func.isRequired,
  orderGetInvoiceDataRequest: PropTypes.func.isRequired,
  // redux-form
  onFieldChange: PropTypes.func.isRequired,
  // props
  disabled: PropTypes.bool,
  isNewOrder: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(OrderTabs);
