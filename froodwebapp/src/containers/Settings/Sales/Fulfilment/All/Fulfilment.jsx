/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import { push } from 'react-router-redux';
import { Checkbox, Spin } from 'antd';
import { Button } from 'components';
import {
  transportersGetRequest,
  transportersUpdateRequest
} from 'redux-base/actions';
import { channelItem } from 'styles/settings.scss';

const mapStateToProps = state => ({
  data: state.transporters.fulfilments,
  loadingPage: state.transporters.loadingPage,
  needReloadTransporters: state.transporters.needReloadTransporters
});

const mapDispatchToProps = {
  transportersGetRequest,
  transportersUpdateRequest,
  push
};

export class Fulfilment extends Component {
  componentWillMount() {
    this.props.transportersGetRequest();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.needReloadTransporters) {
      this.props.transportersGetRequest();
    }
  }

  handleUpdateFulfilmentStatus = (e) => {
    this.props.transportersUpdateRequest({
      payload: {
        id: e.target.id,
        isActive: e.target.checked
      }
    });
  }

  handleRedirectToConfigure = (e) => {
    const fulfilment = this.props.data.find(item => item.id === Number(e.target.id));
    this.props.push({
      pathname: `/settings/sales/fulfilment/${fulfilment.id}/${fulfilment.name}`,
      state: {
        readonly: !fulfilment.isDefault
      }
    });
  }

  render() {
    const {
      data,
      loadingPage
    } = this.props;

    return (
      <Spin spinning={ loadingPage }>
        <Row>
          { data.map(item => (
            <Col key={ item.id }>
              <div className={ channelItem }>
                <div>
                  <Checkbox
                    id={ item.id }
                    checked={ item.isActive }
                    onChange={ this.handleUpdateFulfilmentStatus }
                  >
                    Enabled
                  </Checkbox>
                </div>
                <div>
                  Image
                </div>
                <div>
                  <Button
                    id={ item.id }
                    disabled={ !item.isActive }
                    onClick={ this.handleRedirectToConfigure }
                  >
                    Configure
                  </Button>
                </div>
              </div>
            </Col>
          )) }
        </Row>
      </Spin>
    );
  }
}

Fulfilment.propTypes = {
  // data
  data: PropTypes.array.isRequired,
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  needReloadTransporters: PropTypes.bool.isRequired,
  // redux-base
  transportersGetRequest: PropTypes.func.isRequired,
  transportersUpdateRequest: PropTypes.func.isRequired,
  // router
  push: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Fulfilment);
