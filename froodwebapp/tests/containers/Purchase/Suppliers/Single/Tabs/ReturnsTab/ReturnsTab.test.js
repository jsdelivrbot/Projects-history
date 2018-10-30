import { ReturnsTab } from 'containers/Purchase/Suppliers/Single/Tabs/ReturnsTab/ReturnsTab';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('ReturnsTab', () => {
  const props = {
    loadingPage: false,
    needReloadTaxCategories: false,
    taxCategories: [],
    taxCodes: [],
    taxCategoriesGetRequest: jest.fn()
  };

  it('renders the ReturnsTab component', () => {
    const component = shallow(<ReturnsTab { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of ReturnsTab', () => {
    const component = shallow(<ReturnsTab { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
