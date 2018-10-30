import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import {
  purchaseOrderGetRequest,
  purchaseOrderGRNGetRequest,
  purchaseOrderInvoiceGetRequest
} from 'redux-base/actions';
import { connect } from 'react-redux';
import {
  ConnectedOrderTab,
  ConnectedGRNTab,
  ConnectedInvoiceTab
} from './index';
import { tabs } from './Tabs.scss';

const mapDispatchToProps = {
  purchaseOrderGetRequest,
  purchaseOrderGRNGetRequest,
  purchaseOrderInvoiceGetRequest
};

const { TabPane } = Tabs;

const hideGrnStatuses = ['Draft', 'Authorized', 'Approved', 'Rejected', 'Cancelled', 'Not Saved'];
const showInvoiceStatuses = ['Received', 'Closed'];

class POTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'order'
    };
  }

  componentWillReceiveProps(nextProps) {
    // when we are on GRN or Invoice tab and click `New PO`
    // to show Order Tab without request to API
    if (nextProps.status.toLowerCase() === 'not saved') {
      this.setState({
        activeTab: 'order'
      });
    }
  }

  handleTabClick = (activeTab) => {
    this.setState({
      activeTab
    }, () => {
      switch (activeTab) {
        case 'order':
          this.props.purchaseOrderGetRequest({
            params: [{
              id: this.props.orderId
            }]
          });
          break;
        case 'grn':
          this.props.purchaseOrderGRNGetRequest({
            id: this.props.orderId
          });
          break;
        case 'invoice':
          this.props.purchaseOrderInvoiceGetRequest({
            id: this.props.orderId
          });
          break;
        default:
      }
    });
  }

  render() {
    const {
      status,
      orderInfoDisabled,
      handleSubmit
    } = this.props;

    const { activeTab } = this.state;

    const grnTabDisabled = (status === 'Received');

    return (
      <Row className={ tabs }>
        <Col xs>
          <Tabs
            activeKey={ activeTab }
            onTabClick={ this.handleTabClick }
            animated={ false }
          >
            <TabPane
              key="order"
              tab="Order"
            >
              <ConnectedOrderTab
                status={ status }
                orderInfoDisabled={ orderInfoDisabled }
                handleSubmit={ handleSubmit }
              />
            </TabPane>
            { !hideGrnStatuses.includes(status) &&
              <TabPane
                key="grn"
                tab="GRN"
              >
                <ConnectedGRNTab
                  status={ status }
                  disabled={ grnTabDisabled }
                  handleSubmit={ handleSubmit }
                />
              </TabPane>
            }
            { showInvoiceStatuses.includes(status) &&
              <TabPane
                key="invoice"
                tab="Invoice"
              >
                <ConnectedInvoiceTab handleSubmit={ handleSubmit } />
              </TabPane>
            }
          </Tabs>
        </Col>
      </Row>
    );
  }
}

POTabs.propTypes = {
  // data
  orderId: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  orderInfoDisabled: PropTypes.bool.isRequired,
  // redux-base
  purchaseOrderGRNGetRequest: PropTypes.func.isRequired,
  purchaseOrderGetRequest: PropTypes.func.isRequired,
  purchaseOrderInvoiceGetRequest: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(POTabs);
