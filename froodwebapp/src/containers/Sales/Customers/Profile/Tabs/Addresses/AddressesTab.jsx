import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  customerAddressGetRequest,
  customerAddressSaveRequest,
  customerAddressUpdateRequest,
  customerAddressDeleteRequest,
  citySearchRequest
} from 'redux-base/actions';
import { Spin } from 'antd';
import { formValueSelector } from 'redux-form';
import { GridTable, ConnectedTopFormModal, NewTableRow } from 'components';
import fields from './modalFields';
import columns from './columns';

const selector = formValueSelector('topFormModal');

const mapStateToProps = state => ({
  loadingPage: state.customerProfile.loadingPage,
  addresses: state.customerProfile.addresses,
  needReloadAddresses: state.customerProfile.needReloadAddresses,
  cities: state.commonData.cities,
  userCountryStates: state.commonData.userCountryStates,
  activeCountryState: selector(state, 'state')
});

const mapDispatchToProps = {
  customerAddressGetRequest,
  customerAddressSaveRequest,
  customerAddressUpdateRequest,
  customerAddressDeleteRequest,
  citySearchRequest
};

const newAdress = {
  label: '',
  state: '',
  city: '',
  isDefault: false,
  suburb: '',
  postalCode: '',
  address1: '',
  address2: ''
};

export class AddressesTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeAddressId: props.activeAddressId,
      modalVisible: !!props.activeAddressId,
      modalData: newAdress,
      modalTitle: 'New Address'
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      customerId,
      activeCountryState,
      addresses,
      needReloadAddresses
    } = nextProps;

    const {
      activeAddressId
    } = this.state;

    // when we add or delete address
    if (needReloadAddresses) {
      this.setState({
        modalVisible: false,
        modalData: undefined
      }, () => this.props.customerAddressGetRequest({
        id: customerId
      }));
    }

    // if we edit address from some page
    if (activeAddressId && addresses.length !== 0) {
      this.setState({
        activeAddressId: null,
        modalVisible: true,
        modalData: activeAddressId === 'new' ? newAdress : addresses.find(address => address.id === activeAddressId)
      });
    }

    // if we change state select inside modal
    if (activeCountryState && activeCountryState !== this.props.activeCountryState) {
      this.props.citySearchRequest({ id: activeCountryState });
    }
  }

  handleToggleModal = () => {
    this.setState({
      modalTitle: 'New Address',
      modalVisible: !this.state.modalVisible,
      modalData: newAdress,
    });
  }

  handleUpdateTableData = (data, rowIndex) => {
    this.props.customerAddressUpdateRequest({
      id: this.props.customerId,
      payload: data[rowIndex]
    });
  }

  handleEdit = (e) => {
    const address = this.props.addresses.find(item => item.id === Number(e.target.id));

    this.setState({
      modalTitle: 'Edit Address',
      modalVisible: true,
      modalData: address
    }, () => this.props.citySearchRequest({ id: address.state }));
  }

  handleSave = (address) => {
    this.setState({
      activeAddressId: null
    }, () => {
      if (address.id) {
        this.props.customerAddressUpdateRequest({
          id: this.props.customerId,
          payload: address
        });
      } else {
        this.props.customerAddressSaveRequest({
          id: this.props.customerId,
          payload: address
        });
      }
    });
  }

  handleDelete = (e) => {
    this.props.customerAddressDeleteRequest({
      id: this.props.customerId,
      addressId: e.target.id
    });
  }

  render() {
    const {
      addresses,
      loadingPage,
      userCountryStates,
      cities
    } = this.props;

    const {
      modalData,
      modalVisible,
      modalTitle
    } = this.state;

    return (
      <div>
        <ConnectedTopFormModal
          loading={ loadingPage }
          title={ modalTitle }
          buttonVisible={ false }
          handleSave={ this.handleSave }
          handleToggleModal={ this.handleToggleModal }
          visible={ modalVisible }
          initialValues={ modalData }
          fields={
            fields(
              this.handleStateSelect,
              userCountryStates,
              cities
            )
          }
        />
        <Spin spinning={ loadingPage }>
          <Row start="xs">
            <Col xs md lg>
              <GridTable
                rowKey="id"
                columns={ columns(this.handleEdit, this.handleDelete) }
                dataSource={ addresses }
                updateTableData={ this.handleUpdateTableData }
                size="small"
                pagination={ false }
              />
              <NewTableRow
                addOtherRowText="Add Another Address"
                addNewRowText="Add New Address"
                hasData={ addresses.length !== 0 }
                onClick={ this.handleToggleModal }
              />
            </Col>
          </Row>
        </Spin>
      </div>
    );
  }
}

AddressesTab.propTypes = {
  // triger
  loadingPage: PropTypes.bool.isRequired,
  needReloadAddresses: PropTypes.bool.isRequired,
  // data
  addresses: PropTypes.array.isRequired,
  cities: PropTypes.array.isRequired,
  userCountryStates: PropTypes.array.isRequired,
  customerId: PropTypes.string.isRequired,
  activeAddressId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  activeCountryState: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  // redux-base
  customerAddressGetRequest: PropTypes.func.isRequired,
  customerAddressSaveRequest: PropTypes.func.isRequired,
  customerAddressUpdateRequest: PropTypes.func.isRequired,
  customerAddressDeleteRequest: PropTypes.func.isRequired,
  citySearchRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressesTab);
