import { ContactsTab } from 'containers/Purchase/Suppliers/Single/Tabs/ContactsTab/ContactsTab';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('ContactsTab', () => {
  const props = {
    loadingPage: false,
    needReloadContacts: false,
    supplierId: '1',
    contacts: [],
    supplierContactsGetRequest: jest.fn(),
    supplierContactsSaveRequest: jest.fn(),
    supplierContactsUpdateRequest: jest.fn(),
    supplierContactsDeleteRequest: jest.fn()
  };

  it('renders the ContactsTab component', () => {
    const component = shallow(<ContactsTab { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of ContactsTab', () => {
    const component = shallow(<ContactsTab { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });

  it('calls supplierContactsSaveRequest in handleSave with correct param', () => {
    const formData = {
      isDefault: false,
      includeInEmails: false,
      email: 'testuser82@gmail.com',
      fax: '08831919234',
      firstName: 'Name',
      lastName: 'Last name',
      locationId: 13,
      phone: '9189231123',
      title: 'some title'
    };

    const component = shallow(<ContactsTab { ...props } />);
    component.setState({ selectedLocationId: 13 });
    component.instance().handleSave(formData);

    expect(props.supplierContactsSaveRequest.mock.calls.length).toBe(1);

    expect(props.supplierContactsSaveRequest.mock.calls[0][0]).toEqual({
      id: props.supplierId,
      payload: formData
    });
    props.supplierContactsSaveRequest.mock.calls.length = 0;
  });

  it('calls supplierContactsUpdateRequest in handleUpdateTableData with correct param', () => {
    const selectedContacts = [{
      id: 1,
      isDefault: false,
      includeInEmails: false,
      email: 'testuser82@gmail.com',
      fax: '08831919234',
      firstName: 'Name',
      lastName: 'Last name',
      selectedLocationId: 13,
      phone: '9189231123',
      title: 'some title'
    }];
    const rowId = 0;
    const component = shallow(<ContactsTab { ...props } />);
    component.setState({ selectedLocationId: 13 });
    component.instance().handleUpdateTableData(selectedContacts, rowId);

    expect(props.supplierContactsUpdateRequest.mock.calls.length).toBe(1);

    expect(props.supplierContactsUpdateRequest.mock.calls[0][0]).toEqual({
      id: props.supplierId,
      payload: {
        id: selectedContacts[0].id,
        isDefault: selectedContacts[0].isDefault,
        includeInEmails: selectedContacts[0].includeInEmails,
        email: selectedContacts[0].email,
        fax: selectedContacts[0].fax,
        firstName: selectedContacts[0].firstName,
        lastName: selectedContacts[0].lastName,
        locationId: selectedContacts[0].selectedLocationId,
        phone: selectedContacts[0].phone,
        title: selectedContacts[0].title
      }
    });
    props.supplierContactsUpdateRequest.mock.calls.length = 0;
  });

  it('calls supplierContactsUpdateRequest in handleUpdateTableData with correct param', () => {
    const e = {
      target: {
        id: 'some id'
      }
    };
    const component = shallow(<ContactsTab { ...props } />);
    component.instance().handleDeactivate(e);

    expect(props.supplierContactsDeleteRequest.mock.calls.length).toBe(1);

    expect(props.supplierContactsDeleteRequest.mock.calls[0][0]).toEqual({
      id: props.supplierId,
      contactId: e.target.id,
    });
    props.supplierContactsDeleteRequest.mock.calls.length = 0;
  });
});
