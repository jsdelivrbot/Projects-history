import { LocationsTab } from 'containers/Settings/System/Locations/Tabs/LocationsTab/LocationsTab';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('LocationsTab', () => {
  const props = {
    needReloadLocations: false,
    loadingPage: false,
    locations: [],
    cities: [],
    locationTypes: [],
    userCountryStates: [],
    activeCountryState: 'Active country state',
    locationsUpdateInfoRequest: jest.fn(),
    locationsGetRequest: jest.fn(),
    locationsSaveRequest: jest.fn(),
    locationsUpdateRequest: jest.fn(),
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

  it('calls locationsUpdateRequest in handleUpdateTableData when activeTab is locations', () => {
    const locations = [{
      id: 'id',
      isActive: false,
      isDefault: false,
      holdStock: jest.fn()
    }];
    const component = shallow(<LocationsTab { ...props } />);
    component.instance().handleUpdateTableData(locations, 0);
    expect(props.locationsUpdateRequest.mock.calls.length).toBe(1);

    expect(props.locationsUpdateRequest.mock.calls[0][0]).toEqual({
      payload: {
        id: locations[0].id,
        isActive: locations[0].isActive,
        isDefault: locations[0].isDefault,
        holdStock: locations[0].holdStock,
      }
    });
  });

  it('calls locationsSaveRequest in handleSave when activeTab is locations', () => {
    const location = {
      name: 'name',
      prefix: 'prefix',
      address1: 'address 1',
      address2: 'address 2',
      suburb: 'suburb',
      stateId: '1',
      cityId: '1',
      postalCode: '223',
      type: 'type'
    };
    const component = shallow(<LocationsTab { ...props } />);
    component.instance().handleSave(location);
    expect(props.locationsSaveRequest.mock.calls.length).toBe(1);

    expect(props.locationsSaveRequest.mock.calls[0][0]).toEqual({
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
  });
});
