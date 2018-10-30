import { ProductCategories } from 'containers/Settings/Inventory/ProductCategories/ProductCategories';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('ProductCategories', () => {
  const props = {
    loadingPage: false,
    needReloadProductCategories: false,
    productCategories: [],
    prodCatGetRequest: jest.fn()
  };

  it('renders the ProductCategories component', () => {
    const component = shallow(<ProductCategories { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of ProductCategories', () => {
    const component = shallow(<ProductCategories { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
