/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  channelsGetRequest,
  channelUpdateRequest
} from 'redux-base/actions';
import { mapValues, groupBy } from 'lodash';
import { Spin } from 'antd';
import { channelDescription } from 'styles/settings.scss';
import ConnectedChannelItem from './ChannelItem';

const mapStateToProps = state => ({
  loadingPage: state.channels.loadingPage,
  channels: state.channels.data
});

const mapDispatchToProps = {
  channelsGetRequest,
  channelUpdateRequest
};

export class Channels extends Component {

  componentWillMount = () => {
    this.props.channelsGetRequest();
  }

  handleChannelUpdate= (id, isActive) => {
    this.props.channelUpdateRequest({
      payload: {
        id,
        isActive
      }
    });
  }

  render() {
    const {
      loadingPage,
      channels
    } = this.props;

    const channelsByType = mapValues(groupBy(channels, 'typeDescription'));

    return (
      <Spin spinning={ loadingPage }>
        { Object.keys(channelsByType).map(type => (
          <div key={ type }>
            <Row>
              <Col xs className={ channelDescription }>
                { type }
              </Col>
            </Row>
            <Row>
              { channelsByType[type].map(channel => (
                <Col key={ channel.name }>
                  <ConnectedChannelItem
                    key={ channel.name }
                    channel={ channel }
                    onChannelUpdate={ this.handleChannelUpdate }
                  />
                </Col>
              )) }
            </Row>
          </div>
        )) }
      </Spin>
    );
  }
}

Channels.propTypes = {
  // triggers
  loadingPage: PropTypes.bool.isRequired,
  // data
  channels: PropTypes.array.isRequired,
  // redux-base
  channelsGetRequest: PropTypes.func.isRequired,
  channelUpdateRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
