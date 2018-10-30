import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Tabs } from 'antd';
import {
  fulfilmentItemGetRequest
} from 'redux-base/actions';
import {
  ConnectedCalendarTab,
  ConnectedBlackoutTab,
  ConnectedCustomTab,
  ConnectedCutOffTab,
  ConnectedApiInfoTab
} from './Tabs';

const { TabPane } = Tabs;

const mapDispatchToProps = {
  fulfilmentItemGetRequest
};

export class FulfilmentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'calendar',
      fulfilmentId: this.props.match.params.item,
      readonly: this.props.location.state.readonly
    };
  }

  componentWillMount() {
    const id = this.state.fulfilmentId;
    this.props.fulfilmentItemGetRequest({
      params: [{ id }, { id }]
    });
  }

  handleTabChange = (activeTab) => {
    this.setState({
      activeTab
    });
  }

  render() {
    const {
      activeTab,
      fulfilmentId,
      readonly
    } = this.state;

    return (
      <Row>
        <Col xs md lg>
          <Tabs
            activeKey={ activeTab }
            onChange={ this.handleTabChange }
            animated={ false }
          >
            <TabPane
              key="calendar"
              tab="Calendar"
            >
              <ConnectedCalendarTab
                readonly={ readonly }
                fulfilmentId={ fulfilmentId }
              />
            </TabPane>
            <TabPane
              key="blackout"
              tab="Blackout Days"
            >
              <ConnectedBlackoutTab
                readonly={ readonly }
                fulfilmentId={ fulfilmentId }
              />
            </TabPane>
            <TabPane
              key="cutoff"
              tab="Cutoff"
            >
              <ConnectedCutOffTab
                readonly={ readonly }
                fulfilmentId={ fulfilmentId }
              />
            </TabPane>
            <TabPane
              key="customText"
              tab="Custom Text"
            >
              <ConnectedCustomTab
                readonly={ readonly }
                fulfilmentId={ fulfilmentId }
              />
            </TabPane>
            { !readonly &&
              <TabPane
                key="apiInfo"
                tab="API Info"
              >
                <ConnectedApiInfoTab fulfilmentId={ fulfilmentId } />
              </TabPane>
            }
          </Tabs>
        </Col>
      </Row>
    );
  }
}

FulfilmentItem.propTypes = {
  // router
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // redux-base
  fulfilmentItemGetRequest: PropTypes.func.isRequired,
};

export default withRouter(connect(null, mapDispatchToProps)(FulfilmentItem));
