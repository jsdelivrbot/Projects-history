import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Tabs } from 'antd';
import { connect } from 'react-redux';
import {
  uomGetRequest,
} from 'redux-base/actions';
import { ConnectedUOMTab, ConnectedConversionsTab } from './Tabs';

const mapDispatchToProps = {
  uomGetRequest,
};

const { TabPane } = Tabs;

export class UOM extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'uom',
    };
  }

  componentWillMount() {
    this.props.uomGetRequest();
  }

  handleTabClick = (activeTab) => {
    this.setState({
      activeTab
    }, () => {
      switch (activeTab) {
        case 'uom':
          this.props.uomGetRequest();
          break;
        case 'conversions':
          this.props.uomGetRequest();
          break;
        default:
      }
    });
  }

  render() {
    const {
      activeTab,
    } = this.state;

    return (
      <Row>
        <Col lg>
          <Tabs
            activeKey={ activeTab }
            onTabClick={ this.handleTabClick }
            animated={ false }
          >
            <TabPane
              key="uom"
              tab="UOM"
            >
              <ConnectedUOMTab />
            </TabPane>
            <TabPane
              key="conversions"
              tab="Conversions"
            >
              <ConnectedConversionsTab />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    );
  }
}

UOM.propTypes = {
  // redux-base
  uomGetRequest: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(UOM);
