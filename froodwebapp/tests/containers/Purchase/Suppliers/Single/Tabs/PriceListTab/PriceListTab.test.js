import { PriceListTab } from 'containers/Purchase/Suppliers/Single/Tabs/PriceListTab/PriceListTab';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('PriceListTab', () => {
  const props = {
    loadingPage: false,
    needReloadPriceLists: false,
    supplierId: '1',
    priceLists: [],
    priceListData: {},
    supplierPriceListGetRequest: jest.fn(),
    supplierPriceListUpdateRequest: jest.fn()
  };

  it('renders the PriceListTab component', () => {
    const component = shallow(<PriceListTab { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of PriceListTab', () => {
    const component = shallow(<PriceListTab { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });

  it('calls supplierPriceListUpdateRequest in handleAttach with correct param', () => {
    const component = shallow(<PriceListTab { ...props } />);
    component.setState({ selectedPriceListId: '1' });
    component.instance().handleAttach();

    expect(props.supplierPriceListUpdateRequest.mock.calls.length).toBe(1);

    expect(props.supplierPriceListUpdateRequest.mock.calls[0][0]).toEqual({
      id: props.supplierId,
      payload: {
        priceListId: '1'
      }
    });

    props.supplierPriceListUpdateRequest.mock.calls.length = 0;
  });
});
