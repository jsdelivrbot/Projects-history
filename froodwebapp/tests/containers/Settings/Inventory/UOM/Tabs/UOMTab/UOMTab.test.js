import { UOMTab } from 'containers/Settings/Inventory/UOM/Tabs/UOMTab/UOMTab';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('UOMTab', () => {
  const props = {
    loadingPage: false,
    needReloadUOM: false,
    uom: [],
    uomGetRequest: jest.fn(),
    uomSaveRequest: jest.fn(),
    uomUpdateRequest: jest.fn(),
    uomDeleteRequest: jest.fn()
  };

  it('renders the UOMTab component', () => {
    const component = shallow(<UOMTab { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of UOMTab', () => {
    const component = shallow(<UOMTab { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });

  it('calls uomSaveRequest in handleSave with correct param', () => {
    const data = 'Some data';
    const component = shallow(<UOMTab { ...props } />);
    component.instance().handleSave(data);

    expect(props.uomSaveRequest.mock.calls.length).toBe(1);

    expect(props.uomSaveRequest.mock.calls[0][0]).toEqual({ payload: data });
  });

  it('calls uomDeleteRequest in handleDeactivate with correct param', () => {
    const e = {
      target: {
        id: 1
      }
    };
    const component = shallow(<UOMTab { ...props } />);
    component.instance().handleDeactivate(e);

    expect(props.uomDeleteRequest.mock.calls.length).toBe(1);

    expect(props.uomDeleteRequest.mock.calls[0][0]).toEqual({
      id: e.target.id
    });
  });
});
