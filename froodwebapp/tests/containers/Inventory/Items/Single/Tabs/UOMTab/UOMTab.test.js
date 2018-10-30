import { UOMTab } from 'containers/Inventory/Items/Single/Tabs/UOMTab/UOMTab';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('UOMTab', () => {
  const props = {
    loadingPage: false,
    needReloadUOM: false,
    uoms: [{
      id: '1',
      fromId: '2',
      fromQty: 10,
      toId: '7',
      toQty: 25,
      type: 'some type'
    }],
    availableUoms: [],
    itemInfo: {},
    skuId: '1',
    itemId: '1',
    itemUOMGetRequest: jest.fn(),
    itemUOMSaveRequest: jest.fn(),
    itemUOMUpdateRequest: jest.fn(),
    itemUOMDeleteRequest: jest.fn()
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

  it('calls itemUOMDeleteRequest in handleDeactivate with correct param', () => {
    const e = {
      target: {
        id: '1'
      }
    };
    const component = shallow(<UOMTab { ...props } />);
    component.instance().handleDeactivate(e);

    expect(props.itemUOMDeleteRequest.mock.calls.length).toBe(1);

    expect(props.itemUOMDeleteRequest.mock.calls[0][0]).toEqual({
      id: props.itemId,
      mappingId: Number(e.target.id),
    });
  });

  it('calls itemUOMSaveRequest in handleSave with correct param', () => {
    const formData = {
      skuId: '1',
      fromId: '1',
      fromQty: 10,
      toId: '1',
      toQty: 5
    };
    const component = shallow(<UOMTab { ...props } />);
    component.instance().handleSave(formData);

    expect(props.itemUOMSaveRequest.mock.calls.length).toBe(1);

    expect(props.itemUOMSaveRequest.mock.calls[0][0]).toEqual({
      id: props.itemId,
      payload: {
        sku: formData.skuId,
        fromId: formData.fromId,
        fromQty: formData.fromQty,
        toId: formData.toId,
        toQty: formData.toQty
      }
    });
  });
});
