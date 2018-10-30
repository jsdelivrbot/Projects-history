import { PriceList } from 'containers/Settings/System/PriceLists/Single/PriceList/PriceList';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('PriceList', () => {
  const props = {
    loadingPage: false,
    priceList: {},
    priceListSKUs: [],
    itemInfo: {},
    sku: {
      id: '1',
      name: 'name'
    },
    skuPrice: '1',
    currencyId: 1,
    currencies: [],
    priceListId: '1',
    isNewPriceList: false,
    priceListGetRequest: jest.fn(),
    priceListSkuSaveRequest: jest.fn(),
    priceListSkuUpdateRequest: jest.fn(),
    itemInfoGetRequest: jest.fn()
  };

  it('renders the PriceList component', () => {
    const component = shallow(<PriceList { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of PriceList', () => {
    const component = shallow(<PriceList { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
