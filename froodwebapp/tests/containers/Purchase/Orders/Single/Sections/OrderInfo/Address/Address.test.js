import { Address } from 'containers/Purchase/Orders/Single/Sections/OrderInfo/Address/Address';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('Address', () => {
  const props = {
    isNewOrder: false,
    vendorLocations: [],
    companyLocations: [],
    readonly: false,
    vendorId: 1,
    push: jest.fn(),
    supplierPurchaseGetRequest: jest.fn()
  };

  it('renders the Address component', () => {
    const component = shallow(<Address { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of Address', () => {
    const component = shallow(<Address { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });

  it('calls push in handleSupplierAddressRedirect with correct param', () => {
    const company = {
      id: 1,
      name: 'Company name',
      address: {
        id: 1,
        value: 'Some value'
      }
    };
    const component = shallow(<Address { ...props } />);
    component.instance().handleSupplierAddressRedirect(company);

    expect(props.push.mock.calls.length).toBe(1);

    expect(props.push.mock.calls[0][0]).toEqual({
      pathname: '/purchase/suppliers/1/Company name',
      state: {
        activeTab: 'locations',
        id: 1,
        modalData: {
          id: 1,
          locationId: 1,
          value: 'Some value'
        }
      }
    });
    props.push.mock.calls.length = 0;
  });

  it('calls push in handleRedirectToLocation with company as param', () => {
    const company = {
      id: '1',
      address: {
        stateId: '1'
      }
    };
    const addressType = 'shipping';
    const component = shallow(<Address { ...props } />);
    component.instance().handleRedirectToLocation(company, addressType);

    expect(props.push.mock.calls.length).toBe(1);

    expect(props.push.mock.calls[0][0]).toEqual({
      pathname: '/settings/system/locations',
      state: {
        companyId: company.id,
        addressStateId: company.address.stateId
      }
    });
    props.push.mock.calls.length = 0;
  });

  it('calls push in handleRedirectToLocation with shipping addressType', () => {
    const addressType = 'shipping';
    const component = shallow(<Address { ...props } />);
    component.instance().handleRedirectToLocation(undefined, addressType);

    expect(props.push.mock.calls.length).toBe(1);

    expect(props.push.mock.calls[0][0]).toEqual({
      pathname: '/settings/system/locations',
      state: {
        modalVisible: true,
        onlyWarehouse: true
      },
    });
    props.push.mock.calls.length = 0;
  });

  it('calls push in handleRedirectToLocation with billing addressType', () => {
    const addressType = 'billing';
    const component = shallow(<Address { ...props } />);
    component.instance().handleRedirectToLocation(undefined, addressType);

    expect(props.push.mock.calls.length).toBe(1);

    expect(props.push.mock.calls[0][0]).toEqual({
      pathname: '/settings/system/locations',
      state: {
        modalVisible: true
      },
    });
    props.push.mock.calls.length = 0;
  });
});
