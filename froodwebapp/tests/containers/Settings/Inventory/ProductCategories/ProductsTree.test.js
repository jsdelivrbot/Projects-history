import { ProductsTree } from 'containers/Settings/Inventory/ProductCategories/ProductsTree';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('ProductsTree', () => {
  const props = {
    loadingPage: false,
    needReloadProductCategories: false,
    productCategories: [],
    prodCatGetRequest: jest.fn(),
    prodCatDeleteRequest: jest.fn(),
    prodCatSaveRequest: jest.fn()
  };

  it('renders the ProductsTree component', () => {
    const component = shallow(<ProductsTree { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of ProductsTree', () => {
    const component = shallow(<ProductsTree { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
