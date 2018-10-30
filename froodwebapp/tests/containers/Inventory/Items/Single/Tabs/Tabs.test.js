import { ItemsTabs } from 'containers/Inventory/Items/Single/Tabs/Tabs';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('ItemsTabs', () => {
  const props = {
    loadingPage: false,
    itemId: '1',
    isNewSkuItem: false,
    itemInfoGetParallelRequest: jest.fn(),
    itemBinsGetRequest: jest.fn(),
    itemSuppliersGetRequest: jest.fn(),
    itemUOMGetRequest: jest.fn(),
    initialValues: {
      options: ['first option']
    }
  };
  it('renders the ItemsTabs component', () => {
    const component = shallow(<ItemsTabs { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of ItemsTabs', () => {
    const component = shallow(<ItemsTabs { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });

  it('calls itemInfoGetParallelRequest in handleTabClick when activeTab is main', () => {
    const activeTab = 'main';
    const component = shallow(<ItemsTabs { ...props } />);
    component.instance().handleTabClick(activeTab);

    expect(props.itemInfoGetParallelRequest.mock.calls.length).toBe(4);

    expect(props.itemInfoGetParallelRequest.mock.calls[0][0]).toEqual({
      params: [{ id: props.itemId }]
    });
  });

  it('calls itemBinsGetRequest in handleTabClick when activeTab is bins', () => {
    const activeTab = 'bins';
    const component = shallow(<ItemsTabs { ...props } />);
    component.instance().handleTabClick(activeTab);

    expect(props.itemBinsGetRequest.mock.calls.length).toBe(1);

    expect(props.itemBinsGetRequest.mock.calls[0][0]).toEqual({ id: props.itemId });
  });

  it('calls itemSuppliersGetRequest in handleTabClick when activeTab is suppliers', () => {
    const activeTab = 'suppliers';
    const component = shallow(<ItemsTabs { ...props } />);
    component.instance().handleTabClick(activeTab);

    expect(props.itemSuppliersGetRequest.mock.calls.length).toBe(1);

    expect(props.itemSuppliersGetRequest.mock.calls[0][0]).toEqual({ id: props.itemId });
  });

  it('calls itemUOMGetRequest in handleTabClick when activeTab is uom', () => {
    const activeTab = 'uom';
    const component = shallow(<ItemsTabs { ...props } />);
    component.instance().handleTabClick(activeTab);

    expect(props.itemUOMGetRequest.mock.calls.length).toBe(1);

    expect(props.itemUOMGetRequest.mock.calls[0][0]).toEqual({ id: props.itemId });
  });
});
