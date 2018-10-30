import { PriceListForm } from 'containers/Settings/System/PriceLists/Single/PriceList/PriceListForm';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('PriceListForm', () => {
  const props = {
    loadingPage: false,
    handleSubmit: jest.fn(),
    initialValues: {},
    isNewPriceList: false,
    priceList: {},
    currencies: [],
    priceListUpdateRequest: jest.fn(),
    priceListSaveRequest: jest.fn(),
    push:jest.fn()
  };

  it('renders the PriceListForm component', () => {
    const component = shallow(<PriceListForm { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of PriceListForm', () => {
    const component = shallow(<PriceListForm { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
