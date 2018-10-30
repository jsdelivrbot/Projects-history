import { OrderTabs } from 'containers/Sales/Orders/Single/Sections/Tabs/Tabs';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('OrderTabs', () => {
  const props = {
    orderId: '1',
    disabled: false,
    isNewOrder: false,
    orderGetRequest: jest.fn(),
    orderGetAllocationDataRequest: jest.fn(),
    orderGetPickDataRequest: jest.fn(),
    orderGetPackDataRequest: jest.fn(),
    orderGetShipDataRequest: jest.fn(),
    orderGetInvoiceDataRequest: jest.fn(),
    handleSubmit: jest.fn(),
  };

  it('renders the OrderTabs component', () => {
    const component = shallow(<OrderTabs { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of OrderTabs', () => {
    const component = shallow(<OrderTabs { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
