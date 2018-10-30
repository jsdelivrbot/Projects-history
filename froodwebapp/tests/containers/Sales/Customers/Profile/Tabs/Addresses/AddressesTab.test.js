import { AddressesTab } from 'containers/Sales/Customers/Profile/Tabs/Addresses/AddressesTab';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('AddressesTab', () => {
  const props = {
    loadingPage: false,
    needReloadAddresses: false,
    addresses: [],
    cities: [],
    userCountryStates: [],
    customerId: '1',
    activeCountryState: 1,
    customerAddressesGetRequest: jest.fn(),
    customerAddressSaveRequest: jest.fn(),
    customerAddressUpdateRequest: jest.fn(),
    customerAddressDeleteRequest: jest.fn(),
    citySearchRequest: jest.fn()
  };

  it('renders the AddressesTab component', () => {
    const component = shallow(<AddressesTab { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of AddressesTab', () => {
    const component = shallow(<AddressesTab { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });

  it('calls customerAddressSaveRequest in handleSave with correct param', () => {
    const address = {
      isDefault: true,
      label: 'label',
      state: 'state',
      city: 'city',
      suburb: 'suburb',
      postalCode: 'postal code',
      address1: 'first address',
      address2: 'second address'
    };
    const component = shallow(<AddressesTab { ...props } />);
    component.instance().handleSave(address);

    expect(props.customerAddressSaveRequest.mock.calls.length).toBe(1);

    expect(props.customerAddressSaveRequest.mock.calls[0][0]).toEqual({
      id: props.customerId,
      payload: {
        label: address.label,
        state: address.state,
        city: address.city,
        isDefault: address.isDefault,
        suburb: address.suburb,
        postalCode: address.postalCode,
        address1: address.address1,
        address2: address.address2
      }
    });
  });

  it('calls customerAddressDeleteRequest in handleDelete with correct param', () => {
    const e = {
      target: {
        id: '1'
      }
    };
    const component = shallow(<AddressesTab { ...props } />);
    component.instance().handleDelete(e);

    expect(props.customerAddressDeleteRequest.mock.calls.length).toBe(1);

    expect(props.customerAddressDeleteRequest.mock.calls[0][0]).toEqual({
      id: props.customerId,
      addressId: e.target.id
    });
  });
});
