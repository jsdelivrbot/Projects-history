import { OrdersTab } from 'containers/Sales/Customers/Profile/Tabs/Orders/OrdersTab';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('OrdersTab', () => {
  const props = {
    loadingPage: false,
    orders: [],
    customerId: '1',
    push: jest.fn(),
    customerOrdersGetRequest: jest.fn()
  };

  it('renders the OrdersTab component', () => {
    const component = shallow(<OrdersTab { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of OrdersTab', () => {
    const component = shallow(<OrdersTab { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
