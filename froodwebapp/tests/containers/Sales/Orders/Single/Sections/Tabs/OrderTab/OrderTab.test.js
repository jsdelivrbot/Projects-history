import { OrderTab } from 'containers/Sales/Orders/Single/Sections/Tabs/OrderTab/OrderTab';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('OrderTab', () => {
  const props = {
    status: 'status',
    disabled: false,
    isNewOrder: false,
    orderSaveRequest: jest.fn(),
    orderUpdateRequest: jest.fn(),
    onFieldChange: jest.fn(),
    handleSubmit: jest.fn()
  };

  it('renders the OrderTab component', () => {
    const component = shallow(<OrderTab { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of OrderTab', () => {
    const component = shallow(<OrderTab { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
