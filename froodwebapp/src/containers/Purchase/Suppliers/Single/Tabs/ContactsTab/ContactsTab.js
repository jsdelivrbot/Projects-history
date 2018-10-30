import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import {
  supplierContactsGetRequest,
  supplierContactsSaveRequest,
  supplierContactsUpdateRequest,
  supplierContactsDeleteRequest
} from 'redux-base/actions';
import {
  ConnectedTopFormModal,
  GridTable,
  FroodSelect
} from 'components';
import { getMenuItems } from 'utils';
import { table, row } from 'styles/common.scss';
import fields from './modalFields';
import columns from './contactsTabHelpers';

const mapStateToProps = state => ({
  loadingPage: state.supplier.loadingPage,
  needReloadContacts: state.supplier.needReloadContacts,
  contacts: state.supplier.contacts,
});

const mapDispatchToProps = {
  supplierContactsGetRequest,
  supplierContactsSaveRequest,
  supplierContactsUpdateRequest,
  supplierContactsDeleteRequest
};

const newContact = {
  isDefault: '',
  includeInEmails: '',
  email: '',
  fax: '',
  firstName: '',
  lastName: '',
  locationId: '',
  phone: '',
  title: '',
};

export class ContactsTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      modalData: newContact,
      selectedLocationId: null
    };
  }

  componentWillReceiveProps(nextProps) {
    // when we create contact
    if (nextProps.needReloadContacts) {
      this.setState({
        modalVisible: false,
        modalData: undefined
      }, () => this.props.supplierContactsGetRequest({
        id: this.props.supplierId
      }));
    } else if (!this.state.selectedLocationId && nextProps.contacts.length !== 0) {
      this.setState({
        selectedLocationId: nextProps.contacts[0].id
      });
    }
  }

  handleToggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      modalData: newContact
    });
  }

  handleLocationSelect = (id, selectedLocationId) => {
    this.setState({
      selectedLocationId
    });
  }

  handleSave = (formData) => {
    // make default when first contact added
    const {
      selectedLocationId
    } = this.state;

    const locations = this.props.contacts;

    const selectedLocation = locations.find(location => location.id === Number(selectedLocationId));
    const isFirstContact = selectedLocation.contacts.length === 0;

    const payload = {
      isDefault: isFirstContact || formData.isDefault,
      includeInEmails: formData.includeInEmails,
      email: formData.email,
      fax: formData.fax,
      firstName: formData.firstName,
      lastName: formData.lastName,
      locationId: this.state.selectedLocationId,
      phone: formData.phone,
      title: formData.title
    };

    if (this.state.modalData.id) {
      this.props.supplierContactsUpdateRequest({
        id: this.props.supplierId,
        payload: {
          ...payload,
          id: formData.id
        }
      });
    } else {
      this.props.supplierContactsSaveRequest({
        id: this.props.supplierId,
        payload
      });
    }
  }

  handleUpdateTableData = (selectedContacts, rowId) => {
    const contact = selectedContacts[rowId];

    this.props.supplierContactsUpdateRequest({
      id: this.props.supplierId,
      payload: {
        id: contact.id,
        email: contact.email,
        fax: contact.fax,
        includeInEmails: contact.includeInEmails,
        isDefault: contact.isDefault,
        firstName: contact.firstName,
        lastName: contact.lastName,
        phone: contact.phone,
        title: contact.title,
        locationId: this.state.selectedLocationId,
      }
    });
  }

  handleDeactivate = (e) => {
    this.props.supplierContactsDeleteRequest({
      id: this.props.supplierId,
      contactId: e.target.id
    });
  }

  handleEdit = (e) => {
    const {
      selectedLocationId
    } = this.state;

    const {
      contacts
    } = this.props;

    const modalData = contacts
      .find(contact => contact.id === Number(selectedLocationId)).contacts
      .find(cde => cde.id === Number(e.target.id));

    modalData.locationId = this.state.selectedLocationId;
    this.setState({
      modalVisible: true,
      modalData: {
        ...modalData,
        locationId: this.state.selectedLocationId
      }
    });
  }

  render() {
    const {
      modalData,
      modalVisible,
      selectedLocationId
    } = this.state;

    const {
      loadingPage,
      contacts
    } = this.props;

    const selectedContacts = contacts.find(contact => contact.id === Number(selectedLocationId));

    return (
      <div>
        <ConnectedTopFormModal
          loading={ loadingPage }
          title="New Contact"
          buttonText="New Contact"
          handleSave={ this.handleSave }
          handleToggleModal={ this.handleToggleModal }
          visible={ modalVisible }
          initialValues={ modalData }
          fields={ fields(contacts) }
        />
        <Row end="xs" middle="xs" className={ row }>
          <Col xs md={ 2 } lg={ 1 }>
            Locations
          </Col>
          <Col xs sm={ 6 } md={ 6 } lg={ 4 }>
            <FroodSelect
              id={ 1 }
              menuItems={ getMenuItems(contacts) }
              value={ selectedLocationId }
              onChange={ this.handleLocationSelect }
            />
          </Col>
        </Row>
        <Row className={ row }>
          <Col xs>
            <GridTable
              loadingData={ loadingPage }
              className={ table }
              rowKey="id"
              isExpandable={ false }
              readonly={ false }
              columns={ columns(this.handleEdit, this.handleDeactivate) }
              dataSource={ selectedContacts && selectedContacts.contacts }
              updateTableData={ this.handleUpdateTableData }
            />
          </Col>
        </Row>
      </div>
    );
  }
}

ContactsTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  needReloadContacts: PropTypes.bool.isRequired,
  // data
  supplierId: PropTypes.string.isRequired,
  contacts: PropTypes.array.isRequired,
  // redux-base
  supplierContactsGetRequest: PropTypes.func.isRequired,
  supplierContactsSaveRequest: PropTypes.func.isRequired,
  supplierContactsUpdateRequest: PropTypes.func.isRequired,
  supplierContactsDeleteRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsTab);
