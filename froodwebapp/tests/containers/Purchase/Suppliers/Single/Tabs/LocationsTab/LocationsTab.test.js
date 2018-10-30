import { LocationsTab } from 'containers/Purchase/Suppliers/Single/Tabs/LocationsTab/LocationsTab';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('LocationsTab', () => {
  const props = {
    loadingPage: false,
    needReloadLocations: false,
    activeCountryState: 1,
    supplierId: '1',
    userCountryStates: [],
    cities: [],
    locationTypes: [],
    locations: [],
    supplierLocationsGetRequest: jest.fn(),
    supplierLocationsSaveRequest: jest.fn(),
    supplierLocationsUpdateRequest: jest.fn(),
    supplierLocationsDeleteRequest: jest.fn(),
    citySearchRequest: jest.fn(),
    location: {}
  };

  it('renders the LocationsTab component', () => {
    const component = shallow(<LocationsTab { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of LocationsTab', () => {
    const component = shallow(<LocationsTab { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });

  it('calls supplierLocationsSaveRequest in handleSupplierAddressRedirect with correct param', () => {
    const formData = 'Some form data';
    const component = shallow(<LocationsTab { ...props } />);
    component.instance().handleSave(formData);

    expect(props.supplierLocationsSaveRequest.mock.calls.length).toBe(1);

    expect(props.supplierLocationsSaveRequest.mock.calls[0][0]).toEqual({
      id: props.supplierId,
      payload: formData
    });
    props.supplierLocationsSaveRequest.mock.calls.length = 0;
  });

  it('calls supplierLocationsDeleteRequest in handleDeactivate with correct param', () => {
    const e = {
      target: {
        id: 'Some id'
      }
    };
    const component = shallow(<LocationsTab { ...props } />);
    component.instance().handleDeactivate(e);

    expect(props.supplierLocationsDeleteRequest.mock.calls.length).toBe(1);

    expect(props.supplierLocationsDeleteRequest.mock.calls[0][0]).toEqual({
      id: props.supplierId,
      locationId: e.target.id,
    });
    props.supplierLocationsDeleteRequest.mock.calls.length = 0;
  });
});
