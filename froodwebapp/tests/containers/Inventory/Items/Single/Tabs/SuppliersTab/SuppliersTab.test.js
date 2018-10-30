import { SuppliersTab } from 'containers/Inventory/Items/Single/Tabs/SuppliersTab/SuppliersTab';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('SuppliersTab', () => {
  const props = {
    loadingPage: false,
    needReloadSuppliers: false,
    suppliers: [{
      sku: 'sku',
      id: '1'
    }],
    uoms: [],
    itemInfo: {
      variants: [{
        id: '1',
        sku: 'sku'
      }]
    },
    itemId: '1',
    itemSuppliersGetRequest: jest.fn(),
    itemSuppliersSaveRequest: jest.fn(),
    itemSuppliersUpdateRequest: jest.fn(),
  };

  it('renders the SuppliersTab component', () => {
    const component = shallow(<SuppliersTab { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of SuppliersTab', () => {
    const component = shallow(<SuppliersTab { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
