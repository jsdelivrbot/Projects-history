import { OrdersTab } from 'containers/Purchase/Suppliers/Single/Tabs/OrdersTab/OrdersTab';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('OrdersTab', () => {
  const props = {
    loadingPage: false,
    supplierId: '1',
    orders: [],
    supplierOrdersGetRequest: jest.fn()
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

  it('calls supplierOrdersGetRequest in onSearchChange with correct param', () => {
    const e = {
      target: {
        value: 'Search text'
      }
    };
    const component = shallow(<OrdersTab { ...props } />);
    component.setState({ searchText: 'Search text' });
    component.instance().onSearchChange(e);

    expect(props.supplierOrdersGetRequest.mock.calls.length).toBe(1);

    expect(props.supplierOrdersGetRequest.mock.calls[0][0]).toEqual({
      id: props.supplierId,
      orderNo: 'Search text'
    });

    props.supplierOrdersGetRequest.mock.calls.length = 0;
  });
});
