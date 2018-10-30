import { Order } from 'containers/Sales/Orders/Single/Order';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('Order', () => {
  const props = {
    loadingPage: false,
    orderGetRequest: jest.fn(),
    orderSaveRequest: jest.fn(),
    orderUpdateRequest: jest.fn(),
    push: jest.fn(),
    match: {
      params: {
        id: '1'
      }
    },
    handleSubmit: jest.fn(),
    initialValues: {
      id: 1,
      status: 'status'
    },
    status: 'status'
  };

  it('renders the Order component', () => {
    const component = shallow(<Order { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of Order', () => {
    const component = shallow(<Order { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
