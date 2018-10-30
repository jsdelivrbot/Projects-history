import { ItemBundlesTabs } from 'containers/Inventory/Bundles/Single/Tabs/Tabs';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('ItemBundlesTabs', () => {
  const props = {
    bundleId: '1',
    isNewBundle: false,
    bundleInfoGetParallelRequest: jest.fn(),
    bundleAssembliesGetRequest: jest.fn(),
    bundleItemsGetRequest: jest.fn(),
    match: {
      params: {
        id: 'some id'
      }
    }
  };

  it('renders the ItemBundlesTabs component', () => {
    const component = shallow(<ItemBundlesTabs { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of ItemBundlesTabs', () => {
    const component = shallow(<ItemBundlesTabs { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });

  it('calls bundleInfoGetParallelRequest in handleTabClick when activeTab is main', () => {
    const activeTab = 'main';
    const component = shallow(<ItemBundlesTabs { ...props } />);
    component.instance().handleTabClick(activeTab);

    expect(props.bundleInfoGetParallelRequest.mock.calls.length).toBe(4);

    expect(props.bundleInfoGetParallelRequest.mock.calls[0][0]).toEqual({
      params: [{ id: props.bundleId }]
    });
  });

  it('calls bundleItemsGetRequest in handleTabClick when activeTab is items', () => {
    const activeTab = 'items';
    const component = shallow(<ItemBundlesTabs { ...props } />);
    component.instance().handleTabClick(activeTab);

    expect(props.bundleItemsGetRequest.mock.calls.length).toBe(1);

    expect(props.bundleItemsGetRequest.mock.calls[0][0]).toEqual({ id: props.bundleId });
  });

  it('calls bundleAssembliesGetRequest in handleTabClick when activeTab is assembly', () => {
    const activeTab = 'assembly';
    const component = shallow(<ItemBundlesTabs { ...props } />);
    component.instance().handleTabClick(activeTab);

    expect(props.bundleAssembliesGetRequest.mock.calls.length).toBe(1);

    expect(props.bundleAssembliesGetRequest.mock.calls[0][0]).toEqual({ id: props.bundleId });
  });
});
