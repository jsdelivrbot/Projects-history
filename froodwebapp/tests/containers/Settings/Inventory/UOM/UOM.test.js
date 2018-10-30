import { UOM } from 'containers/Settings/Inventory/UOM/UOM';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('UOM', () => {
  const props = {
    loadingPage: false,
    needReloadUOM: false,
    uom: [],
    uomGetRequest: jest.fn()
  };

  it('renders the UOM component', () => {
    const component = shallow(<UOM { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of UOM', () => {
    const component = shallow(<UOM { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });

  it('calls uomGetRequest in handleTabClick', () => {
    const activeTab = 'uom';
    const component = shallow(<UOM { ...props } />);
    props.uomGetRequest.mock.calls.length = 0;
    component.instance().handleTabClick(activeTab);

    expect(props.uomGetRequest.mock.calls.length).toBe(1);
  });
});
