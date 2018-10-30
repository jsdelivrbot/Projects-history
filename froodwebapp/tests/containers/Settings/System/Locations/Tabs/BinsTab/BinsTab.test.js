import { BinsTab } from 'containers/Settings/System/Locations/Tabs/BinsTab/BinsTab';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('BinsTab', () => {
  const props = {
    loadingPage: false,
    needReloadLocationBins: false,
    locationBinsSaveSuccess: false,
    locations: [],
    locationZones: [],
    locationZoneBins: [],
    zoneTypes: [],
    locationZonesGetRequest: jest.fn(),
    locationZoneBinsSaveRequest: jest.fn(),
    locationZoneBinsUpdateRequest: jest.fn(),
    locationZoneBinsGetRequest: jest.fn()
  };

  it('renders the BinsTab component', () => {
    const component = shallow(<BinsTab { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of BinsTab', () => {
    const component = shallow(<BinsTab { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });

  it('calls locationZoneBinsSaveRequest in handleSave when activeTab is locations', () => {
    const payload = 'Some payload';
    const component = shallow(<BinsTab { ...props } />);
    component.setState({ selectedLocationId: '1' });
    component.instance().handleSave(payload);
    expect(props.locationZoneBinsSaveRequest.mock.calls.length).toBe(1);

    expect(props.locationZoneBinsSaveRequest.mock.calls[0][0]).toEqual({
      id: '1',
      payload
    });
  });

  it('calls locationZonesGetRequest in handleLocationSelect when activeTab is locations', () => {
    const id = '1';
    const component = shallow(<BinsTab { ...props } />);
    component.instance().handleLocationSelect(id);
    expect(props.locationZonesGetRequest.mock.calls.length).toBe(1);

    expect(props.locationZonesGetRequest.mock.calls[0][0]).toEqual({ id });
  });

  it('calls locationZoneBinsGetRequest in handleZoneSelect when activeTab is locations', () => {
    const id = '1';
    const selectedLocationId = '1';
    const component = shallow(<BinsTab { ...props } />);
    component.setState({ selectedLocationId });
    component.instance().handleZoneSelect(id);
    expect(props.locationZoneBinsGetRequest.mock.calls.length).toBe(1);

    expect(props.locationZoneBinsGetRequest.mock.calls[0][0]).toEqual({
      id: selectedLocationId,
      zoneId: id
    });
  });
});
