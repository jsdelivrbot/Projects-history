import { BinsTab } from 'containers/Inventory/Items/Single/Tabs/BinsTab/BinsTab';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('BinsTab', () => {
  const props = {
    loadingPage: false,
    needReloadBins: false,
    itemId: '1',
    bins: [],
    availableBins: [],
    itemInfo: {},
    selectedSkuId: '1',
    itemBinsGetRequest: jest.fn(),
    itemBinsSaveRequest: jest.fn(),
    itemBinsUpdateRequest: jest.fn()
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

  it('calls itemBinsSaveRequest in handleSave with correct param', () => {
    const formData = {
      skuId: '1',
      id: '1',
      binId: '1',
      reorderQty: 10,
      reorderThreshold: 'reorder'
    };
    const component = shallow(<BinsTab { ...props } />);
    component.instance().handleSave(formData);

    expect(props.itemBinsSaveRequest.mock.calls.length).toBe(1);

    expect(props.itemBinsSaveRequest.mock.calls[0][0]).toEqual({
      id: formData.skuId,
      payload: {
        binId: formData.binId,
        reorderQty: formData.reorderQty,
        reorderThreshold: formData.reorderThreshold,
      }
    });
  });
});
