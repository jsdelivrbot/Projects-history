import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Tabs } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  bundleInfoGetParallelRequest,
  bundleItemsGetRequest,
  bundleAssembliesGetRequest
} from 'redux-base/actions';
import {
  ConnectedMainTab,
  ConnectedItemsTab,
  ConnectedAssemblyTab
} from './index';

const mapDispatchToProps = {
  bundleInfoGetParallelRequest,
  bundleItemsGetRequest,
  bundleAssembliesGetRequest
};

const { TabPane } = Tabs;

export class ItemBundlesTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'main'
    };
  }

  componentWillMount() {
    this.props.bundleInfoGetParallelRequest({
      params: [{ id: this.props.bundleId }]
    });
  }

  handleTabClick = (activeTab) => {
    const { bundleId } = this.props;
    this.setState({
      activeTab
    }, () => {
      switch (activeTab) {
        case 'main':
          this.props.bundleInfoGetParallelRequest({
            params: [{ id: this.props.bundleId }]
          });
          break;
        case 'items':
          this.props.bundleItemsGetRequest({
            id: bundleId
          });
          break;
        case 'assembly':
          this.props.bundleAssembliesGetRequest({
            id: bundleId
          });
          break;
        default:
      }
    });
  }

  render() {
    const {
      activeTab,
    } = this.state;

    const {
      bundleId
    } = this.props;

    const { isNewBundle } = this.props;

    return (
      <Row>
        <Col lg>
          <Tabs
            activeKey={ activeTab }
            onTabClick={ this.handleTabClick }
            animated={ false }
          >
            <TabPane
              key="main"
              tab="Main"
            >
              <ConnectedMainTab
                isNewBundle={ isNewBundle }
              />
            </TabPane>
            <TabPane
              key="items"
              tab="Items"
            >
              <ConnectedItemsTab
                bundleId={ bundleId }
              />
            </TabPane>
            <TabPane
              key="assembly"
              tab="Assembly"
            >
              <ConnectedAssemblyTab
                bundleId={ bundleId }
              />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    );
  }
}

ItemBundlesTabs.propTypes = {
  // props
  bundleId: PropTypes.string.isRequired,
  isNewBundle: PropTypes.bool.isRequired,
  // redux-base
  bundleInfoGetParallelRequest: PropTypes.func.isRequired,
  bundleItemsGetRequest: PropTypes.func.isRequired,
  bundleAssembliesGetRequest: PropTypes.func.isRequired,
};

export default withRouter(connect(null, mapDispatchToProps)(ItemBundlesTabs));
