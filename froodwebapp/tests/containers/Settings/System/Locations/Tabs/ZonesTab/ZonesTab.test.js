import { ZonesTab } from 'containers/Settings/System/Locations/Tabs/ZonesTab/ZonesTab';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('ZonesTab', () => {
  const props = {
    loadingPage: false,
    needReloadLocationZones: false,
    locations: [],
    locationZones: [],
    zoneTypes: [],
    locationZonesGetRequest: jest.fn(),
    locationZonesSaveRequest: jest.fn(),
    locationZonesUpdateRequest: jest.fn()
  };

  it('renders the ZonesTab component', () => {
    const component = shallow(<ZonesTab { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of ZonesTab', () => {
    const component = shallow(<ZonesTab { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });

  it('calls locationZonesSaveRequest in handleSave when activeTab is locations', () => {
    const payload = {
      id: 'id',
      isActive: false,
      isDefault: false,
      holdStock: jest.fn()
    };
    const component = shallow(<ZonesTab { ...props } />);
    component.setState({ selectedLocationId: '1' });
    component.instance().handleSave(payload);
    expect(props.locationZonesSaveRequest.mock.calls.length).toBe(1);

    expect(props.locationZonesSaveRequest.mock.calls[0][0]).toEqual({
      id: '1',
      payload
    });
  });

  it('calls locationZonesGetRequest in handleLocationSelect when activeTab is locations', () => {
    const id = '1';
    const component = shallow(<ZonesTab { ...props } />);
    component.instance().handleLocationSelect(id);
    expect(props.locationZonesGetRequest.mock.calls.length).toBe(1);

    expect(props.locationZonesGetRequest.mock.calls[0][0]).toEqual({
      id
    });
  });
});
