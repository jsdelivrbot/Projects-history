import { ItemsTab } from 'containers/Inventory/Bundles/Single/Tabs/ItemsTab/ItemsTab';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('ItemsTab', () => {
  const props = {
    loadingPage: true,
    needReloadItems: true,
    bundleId: '1',
    bundleItems: [],
    itemInfo: {},
    sku: {
      id: '1',
      name: 'first name'
    },
    bundleLocationId: 3,
    bundleItemsGetRequest: jest.fn(),
    bundleItemsSaveRequest: jest.fn(),
    bundleItemsUpdateRequest: jest.fn(),
    bundleItemsDeleteRequest: jest.fn(),
    itemInfoGetRequest: jest.fn(),
  };

  it('renders the ItemsTab component', () => {
    const component = shallow(<ItemsTab { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of ItemsTab', () => {
    const component = shallow(<ItemsTab { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });

  it('calls bundleItemsSaveRequest in handleSave when activeTab is assembly', () => {
    const modalData = {
      id: '1',
      qty: '10',
      sku: {
        id: 'sku id'
      }
    };
    const component = shallow(<ItemsTab { ...props } />);
    component.instance().handleSave(modalData);

    expect(props.bundleItemsSaveRequest.mock.calls.length).toBe(1);

    expect(props.bundleItemsSaveRequest.mock.calls[0][0]).toEqual({
      id: props.bundleId,
      payload: {
        sku: modalData.sku.id,
        qty: modalData.qty
      }
    });
  });

  it('calls bundleItemsDeleteRequest in handleDeactivate when activeTab is assembly', () => {
    const e = {
      target: {
        id: 'target id'
      }
    };
    const component = shallow(<ItemsTab { ...props } />);
    component.instance().handleDeactivate(e);

    expect(props.bundleItemsDeleteRequest.mock.calls.length).toBe(1);

    expect(props.bundleItemsDeleteRequest.mock.calls[0][0]).toEqual({
      id: props.bundleId,
      itemId: e.target.id
    });
  });
});
