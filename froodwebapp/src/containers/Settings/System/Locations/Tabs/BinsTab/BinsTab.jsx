import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import {
  locationZonesGetRequest,
  locationZoneBinsSaveRequest,
  locationZoneBinsUpdateRequest,
  locationZoneBinsGetRequest
} from 'redux-base/actions';
import { Table, Spin, Select } from 'antd';
import { ConnectedTopFormModal, ActionButton } from 'components';
import { table, select } from 'styles/common.scss';
import columns from './binsTabHelpers';
import fields from './modalFields';

const mapStateToProps = state => ({
  locations: state.locations.locations,
  locationZones: state.locations.locationZones,
  locationZoneBins: state.locations.locationZoneBins,
  loadingPage: state.locations.loadingPage,
  needReloadLocationBins: state.locations.needReloadLocationBins,
  zoneTypes: state.commonData.zoneTypes,
});

const mapDispatchToProps = {
  locationZonesGetRequest,
  locationZoneBinsSaveRequest,
  locationZoneBinsUpdateRequest,
  locationZoneBinsGetRequest
};

const newZone = {
  zoneId: '',
  name: '',
  description: ''
};

export class BinsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalData: newZone,
      selectedLocationId: '',
      selectedZoneId: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    // when we delete of update conversion
    if (nextProps.needReloadLocationBins) {
      this.setState({
        modalVisible: false,
        modalData: undefined
      }, () => this.props.locationZoneBinsGetRequest({
        id: this.state.selectedLocationId,
        zoneId: this.state.selectedZoneId,
      }));
    }
  }

  handleToggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      modalData: newZone
    });
  }

  handleSave = (payload) => {
    if (this.state.modalData.id) {
      this.props.locationZoneBinsUpdateRequest({
        id: this.state.selectedLocationId,
        payload: {
          id: payload.id,
          description: payload.description,
        }
      });
    } else {
      this.props.locationZoneBinsSaveRequest({
        id: this.state.selectedLocationId,
        payload
      });
    }
  }

  handleLocationSelect = (id) => {
    this.setState({
      selectedLocationId: id,
      selectedZoneId: null
    }, () => {
      this.props.locationZonesGetRequest({
        id
      });
    });
  }

  handleZoneSelect = (id) => {
    this.setState({
      selectedZoneId: id
    }, () => {
      this.props.locationZoneBinsGetRequest({
        id: this.state.selectedLocationId,
        zoneId: id
      });
    });
  }

  handleEdit = (e) => {
    this.setState({
      modalVisible: true,
      modalData: this.props.locationZoneBins.find(item => item.id === Number(e.target.id))
    });
  }

  render() {
    const {
      modalData,
      modalVisible,
      selectedLocationId,
      selectedZoneId
    } = this.state;

    const {
      locations,
      locationZones,
      locationZoneBins,
      loadingPage
    } = this.props;
    return (
      <div>
        <ConnectedTopFormModal
          loading={ loadingPage }
          title="New Zone"
          buttonVisible={ false }
          handleSave={ this.handleSave }
          handleToggleModal={ this.handleToggleModal }
          visible={ modalVisible }
          initialValues={ modalData }
          fields={ fields(locationZones) }
        />
        <Spin spinning={ loadingPage }>
          <Row style={ { marginBottom: '1rem' } } between="xs" middle="xs">
            <Col xs md={ 6 } lg={ 4 }>
              <Select
                className={ select }
                placeholder="Location"
                onChange={ this.handleLocationSelect }
              >
                { locations.map(item => (
                  <Select.Option
                    key={ item.id }
                    value={ item.id.toString() }
                  >
                    { item.name }
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col xs md={ 6 } lg={ 4 }>
              <Select
                className={ select }
                placeholder="Zone"
                onChange={ this.handleZoneSelect }
              >
                { locationZones.map(item => (
                  <Select.Option
                    key={ item.id }
                    value={ item.id.toString() }
                  >
                    { item.name }
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col xs={ 1 } >
              <ActionButton
                style={ { float: 'right' } }
                disabled={ !selectedLocationId || !selectedZoneId }
                onClick={ this.handleToggleModal }
              >
                New Bin
              </ActionButton>
            </Col>
          </Row>
          <Table
            className={ table }
            rowKey="id"
            size="small"
            columns={ columns(this.handleEdit, this.handleDeactivate) }
            dataSource={ locationZoneBins }
          />
        </Spin>
      </div>
    );
  }
}

BinsTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  needReloadLocationBins: PropTypes.bool.isRequired,
  // data
  locations: PropTypes.array.isRequired,
  locationZones: PropTypes.array.isRequired,
  locationZoneBins: PropTypes.array.isRequired,
  // redux-base
  locationZonesGetRequest: PropTypes.func.isRequired,
  locationZoneBinsSaveRequest: PropTypes.func.isRequired,
  locationZoneBinsUpdateRequest: PropTypes.func.isRequired,
  locationZoneBinsGetRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BinsTab);
