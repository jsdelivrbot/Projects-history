import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  GridTable,
  ConnectedTopFormModal,
  FroodSearchInput
} from 'components';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import {
  locationsUpdateInfoRequest,
  locationsGetRequest,
  locationsSaveRequest,
  locationsUpdateRequest,
  citySearchRequest,
} from 'redux-base/actions';
import { table } from 'styles/common.scss';
import { Row, Col } from 'react-flexbox-grid';
import columns from './locationsTabHelpers';
import fields from './modalFields';

const selector = formValueSelector('topFormModal');

const mapStateToProps = state => ({
  needReloadLocations: state.locations.needReloadLocations,
  loadingPage: state.locations.loadingPage,
  locations: state.locations.locations,
  cities: state.commonData.cities,
  userCountryStates: state.commonData.userCountryStates,
  locationTypes: state.commonData.locationTypes,
  activeCountryState: selector(state, 'stateId')
});

const mapDispatchToProps = {
  locationsUpdateInfoRequest,
  locationsGetRequest,
  locationsSaveRequest,
  locationsUpdateRequest,
  citySearchRequest,
};

const newLocation = {
  name: '',
  prefix: '',
  stateId: '',
  cityId: '',
  suburb: '',
  postalCode: '',
  address1: '',
  address2: '',
  type: ''
};

export class LocationsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeAddress: props.activeAddress,
      modalVisible: false,
      modalData: newLocation,
      searchValue: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    // when we delete of update location
    if (nextProps.needReloadLocations) {
      this.setState({
        modalVisible: false,
        modalData: undefined
      }, () => this.props.locationsGetRequest());
    }

    // when we open modal from purchase order screen
    if (this.state.activeAddress && this.state.activeAddress.id && nextProps.locations.length !== 0) {
      const existingLocation = nextProps.locations.find(address => address.id === this.state.activeAddress.id);

      this.setState({
        activeAddress: undefined,
        modalVisible: true,
        modalData: this.state.activeAddress.id === 'new' ? newLocation : existingLocation
      });
    }

    // if we change state select inside modal
    if (nextProps.activeCountryState && nextProps.activeCountryState !== this.props.activeCountryState) {
      this.props.citySearchRequest({ id: nextProps.activeCountryState });
    }
  }

  handleToggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      modalData: newLocation
    });
  }

  handleUpdateTableData = (locations, rowId) => {
    this.props.locationsUpdateRequest({
      payload: {
        id: locations[rowId].id,
        isActive: locations[rowId].isActive,
        isDefault: locations[rowId].isDefault,
        holdStock: locations[rowId].holdStock,
      }
    });
  }

  handleSave = (location) => {
    if (this.state.modalData.id) {
      this.props.locationsUpdateInfoRequest({
        id: this.state.modalData.id,
        payload: {
          name: location.name,
          address1: location.address1,
          address2: location.address2,
          suburb: location.suburb,
          stateId: location.stateId,
          cityId: location.cityId,
          postalCode: location.postalCode,
        }
      });
    } else {
      this.props.locationsSaveRequest({
        payload: {
          name: location.name,
          prefix: location.prefix,
          address1: location.address1,
          address2: location.address2,
          suburb: location.suburb,
          stateId: location.stateId,
          cityId: location.cityId,
          postalCode: location.postalCode,
          type: location.type
        }
      });
    }
  }

  handleEdit = (rowIndex) => {
    const {
      id,
      name,
      prefix,
      stateId,
      cityId,
      suburb,
      postalCode,
      address1,
      address2,
      type
    } = this.props.locations[rowIndex];

    this.setState({
      modalVisible: true,
      modalData: {
        id,
        name,
        prefix,
        stateId,
        cityId,
        suburb,
        postalCode,
        address1,
        address2,
        type
      }
    }, () => this.props.citySearchRequest({ id: stateId }));
  }

  handleSearchChange = (value) => {
    this.setState({
      searchValue: value
    });
  }

  render() {
    const {
      activeAddress,
      modalVisible,
      modalData,
      searchValue
    } = this.state;

    const {
      cities,
      locations,
      loadingPage,
      userCountryStates,
    } = this.props;

    const data = locations.filter(item =>
      item && item.name && item.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    const locationTypes = activeAddress && activeAddress.warehouse
      ? this.props.locationTypes.filter(lt => lt.name === 'Warehouse')
      : this.props.locationTypes;

    return (
      <div>
        <ConnectedTopFormModal
          loading={ loadingPage }
          title="New Location"
          buttonText="New Location"
          handleSave={ this.handleSave }
          handleToggleModal={ this.handleToggleModal }
          visible={ modalVisible }
          initialValues={ modalData }
          fields={
            fields(
              userCountryStates,
              cities,
              locationTypes
            )
          }
        />
        <Row>
          <Col lg={ 4 }>
            <FroodSearchInput
              onChange={ this.handleSearchChange }
              placeholder="Type to search locations"
            />
          </Col>
        </Row>
        <GridTable
          loadingData={ loadingPage }
          className={ table }
          rowKey="id"
          isExpandable={ false }
          disabled={ false }
          columns={ columns }
          dataSource={ data }
          updateTableData={ this.handleUpdateTableData }
          handleModalButtonClick={ this.handleEdit }
        />
      </div>
    );
  }
}

LocationsTab.propTypes = {
  // triggers
  needReloadLocations: PropTypes.bool.isRequired,
  loadingPage: PropTypes.bool.isRequired,
  // data
  locations: PropTypes.array.isRequired,
  cities: PropTypes.array.isRequired,
  locationTypes: PropTypes.array.isRequired,
  userCountryStates: PropTypes.array.isRequired,
  activeCountryState: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  activeAddress: PropTypes.object,
  // redux-base
  locationsUpdateInfoRequest: PropTypes.func.isRequired,
  locationsGetRequest: PropTypes.func.isRequired,
  locationsSaveRequest: PropTypes.func.isRequired,
  locationsUpdateRequest: PropTypes.func.isRequired,
  citySearchRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationsTab);
