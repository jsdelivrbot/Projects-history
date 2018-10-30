import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import {
  supplierLocationsGetParallelRequest,
  supplierLocationsSaveRequest,
  supplierLocationsUpdateRequest,
  supplierLocationsDeleteRequest,
  citySearchRequest
} from 'redux-base/actions';
import { Table, Spin } from 'antd';
import { ConnectedTopFormModal } from 'components';
import { table } from 'styles/common.scss';
import fields from './modalFields';
import columns from './locationTabHelpers';

const selector = formValueSelector('topFormModal');

const mapStateToProps = state => ({
  loadingPage: state.supplier.loadingPage,
  locations: state.supplier.locations,
  needReloadLocations: state.supplier.needReloadLocations,
  supplierCountryStates: state.supplier.supplierCountryStates,
  cities: state.commonData.cities,
  locationTypes: state.commonData.locationTypes,
  activeCountryState: selector(state, 'stateId')
});

const mapDispatchToProps = {
  supplierLocationsGetParallelRequest,
  supplierLocationsSaveRequest,
  supplierLocationsUpdateRequest,
  supplierLocationsDeleteRequest,
  citySearchRequest
};

const newLocation = {
  name: '',
  prefix: '',
  suburb: '',
  address1: '',
  address2: '',
  cityId: '',
  type: '',
  postalCode: '',
  stateId: ''
};

export class LocationsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeAddressId: props.activeAddressId,
      modalVisible: !!props.activeAddressId,
      modalData: newLocation
    };
  }

  componentWillReceiveProps(nextProps) {
    // When editing or updating location
    if (nextProps.needReloadLocations) {
      this.setState({
        modalVisible: false,
        modalData: undefined
      }, () => this.props.supplierLocationsGetParallelRequest({
        params: [
          { id: this.props.supplierId },
          { countryId: this.props.countryId }
        ]
      }));
    } else if (nextProps.activeCountryState
            && nextProps.activeCountryState !== this.props.activeCountryState) {
    // if we change state select inside modal
      this.props.citySearchRequest({ id: nextProps.activeCountryState });
    } else if (this.state.activeAddressId) {
    // when we open modal from purchase order screen
      const existingLocation = nextProps.locations.find(address => address.id === this.state.activeAddressId);

      this.setState({
        activeAddressId: null,
        modalVisible: true,
        modalData: this.state.activeAddressId === 'new' ? newLocation : existingLocation
      });
    }
  }

  handleToggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      modalData: newLocation
    });
  }

  handleSave = (formData) => {
    if (this.state.modalData.id) {
      this.props.supplierLocationsUpdateRequest({
        id: this.props.supplierId,
        payload: {
          locationId: formData.id,
          address1: formData.address1,
          address2: formData.address2,
          cityId: formData.cityId,
          postalCode: formData.postalCode,
          stateId: formData.stateId
        }
      });
    } else {
      this.props.supplierLocationsSaveRequest({
        id: this.props.supplierId,
        payload: formData
      });
    }
  }

  handleDeactivate = (e) => {
    this.props.supplierLocationsDeleteRequest({
      id: this.props.supplierId,
      locationId: e.target.id,
    });
  }

  handleEdit = (e) => {
    const locationId = e.target.id;
    const {
      id,
      name,
      prefix,
      suburb,
      type,
      address1,
      address2,
      cityId,
      postalCode,
      stateId
    } = this.props.locations.find(location => location.id === Number(locationId));

    this.setState({
      modalVisible: true,
      modalData: {
        id,
        name,
        prefix,
        suburb,
        address1,
        address2,
        cityId,
        type,
        postalCode,
        stateId
      }
    }, () => this.props.citySearchRequest({ id: stateId }));
  }

  render() {
    const {
      modalData,
      modalVisible
    } = this.state;

    const {
      loadingPage,
      locations,
      supplierCountryStates,
      cities,
      locationTypes
    } = this.props;

    return (
      <div>
        <ConnectedTopFormModal
          loading={ loadingPage }
          title="New location"
          buttonText="New location"
          handleSave={ this.handleSave }
          handleToggleModal={ this.handleToggleModal }
          visible={ modalVisible }
          initialValues={ modalData }
          fields={ fields(supplierCountryStates, cities, locationTypes) }
        />
        <Spin spinning={ loadingPage }>
          <Table
            className={ table }
            rowKey="id"
            size="small"
            columns={ columns(this.handleEdit, this.handleDeactivate) }
            dataSource={ locations }
          />
        </Spin>
      </div>
    );
  }
}

LocationsTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  needReloadLocations: PropTypes.bool.isRequired,
  // data
  activeCountryState: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  supplierId: PropTypes.string.isRequired,
  countryId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  supplierCountryStates: PropTypes.array.isRequired,
  cities: PropTypes.array.isRequired,
  locationTypes: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
  activeAddressId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  // redux-base
  supplierLocationsGetParallelRequest: PropTypes.func.isRequired,
  supplierLocationsSaveRequest: PropTypes.func.isRequired,
  supplierLocationsUpdateRequest: PropTypes.func.isRequired,
  supplierLocationsDeleteRequest: PropTypes.func.isRequired,
  citySearchRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationsTab);
