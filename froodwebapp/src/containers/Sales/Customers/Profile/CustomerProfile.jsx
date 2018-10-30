import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Tabs } from 'antd';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import {
  customerProfileGetRequest,
  customerAddressGetRequest,
  customerOrdersGetRequest
} from 'redux-base/actions';
import {
  ConnectedAddressesTab,
  ConnectedProfileTab,
  ConnectedOrdersTab,
  ConnectedCreditsTab
} from './Tabs';

const { TabPane } = Tabs;

const mapDispatchToProps = {
  customerProfileGetRequest,
  customerAddressGetRequest,
  customerOrdersGetRequest
};

export class CustomerProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'profile',
      activeAddressId: null,
      customerId: this.props.match.params.id,
      customerName: this.props.match.params.name,
    };

    if (this.props.location.state) {
      this.state = Object.assign({}, this.state, props.location.state);
    }
  }

  componentDidMount() {
    this.handleTabClick(this.state.activeTab);
  }

  handleTabClick = (activeTab) => {
    this.setState({
      activeTab
    }, () => {
      switch (activeTab) {
        case 'profile':
          this.props.customerProfileGetRequest({
            id: this.state.customerId
          });
          break;
        case 'addresses':
          this.props.customerAddressGetRequest({
            id: this.state.customerId
          });
          break;
        case 'orders':
          this.props.customerOrdersGetRequest({
            id: this.state.customerId
          });
          break;
        default:
          break;
      }
    });
  }

  render() {
    const {
      customerId,
      customerName,
      activeAddressId,
      activeTab
    } = this.state;

    return (
      <Row>
        <Col xs md lg>
          <Tabs
            activeKey={ activeTab }
            onTabClick={ this.handleTabClick }
            animated={ false }
          >
            <TabPane
              key="profile"
              tab="Profile"
            >
              <ConnectedProfileTab
                customerId={ customerId }
              />
            </TabPane>
            <TabPane
              key="addresses"
              tab="Addresses"
            >
              <ConnectedAddressesTab
                activeAddressId={ activeAddressId }
                customerId={ customerId }
              />
            </TabPane>
            <TabPane
              key="orders"
              tab="Orders"
            >
              <ConnectedOrdersTab
                customerId={ customerId }
              />
            </TabPane>
            <TabPane
              key="credits"
              tab="Credits"
            >
              <ConnectedCreditsTab
                customerId={ customerId }
                customerName={ customerName }
              />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    );
  }
}

CustomerProfile.propTypes = {
  // redux-base
  customerProfileGetRequest: PropTypes.func.isRequired,
  customerAddressGetRequest: PropTypes.func.isRequired,
  customerOrdersGetRequest: PropTypes.func.isRequired,
  // router
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default withRouter(connect(null, mapDispatchToProps)(CustomerProfile));
