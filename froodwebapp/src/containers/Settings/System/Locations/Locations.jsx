/* eslint-disable class-methods-use-this, react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import {
  locationsGetRequest
} from 'redux-base/actions';
import { Tabs } from 'antd';
import { PageHeader } from 'components';
import {
  ConnectedLocationsTab,
  ConnectedZonesTab,
  ConnectedBinsTab
} from './Tabs';

const mapDispatchToProps = {
  locationsGetRequest
};

const { TabPane } = Tabs;

export class Locations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'locations'
    };

    if (this.props.location.state) {
      this.state = Object.assign({}, this.state, props.location.state);
    }
  }

  componentWillMount() {
    this.props.locationsGetRequest();
  }

  handleTabClick = (activeTab) => {
    this.setState({
      activeTab
    }, () => {
      switch (activeTab) {
        case 'locations':
          this.props.locationsGetRequest();
          break;
        default:
      }
    });
  }

  render() {
    const {
      activeTab,
      activeAddress
    } = this.state;

    return (
      <div>
        <PageHeader
          bigText="Company Locations"
          smallText="Manage company locations"
        />
        <Row>
          <Col lg>
            <Tabs
              activeKey={ activeTab }
              onTabClick={ this.handleTabClick }
              animated={ false }
            >
              <TabPane
                key="locations"
                tab="Locations"
              >
                <ConnectedLocationsTab activeAddress={ activeAddress } />
              </TabPane>
              <TabPane
                key="zones"
                tab="Zones"
              >
                <ConnectedZonesTab />
              </TabPane>
              <TabPane
                key="bins"
                tab="Bins"
              >
                <ConnectedBinsTab />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}

Locations.propTypes = {
  // redux-base
  locationsGetRequest: PropTypes.func.isRequired,
  // router
  location: PropTypes.object.isRequired
};

export default withRouter(connect(null, mapDispatchToProps)(Locations));
