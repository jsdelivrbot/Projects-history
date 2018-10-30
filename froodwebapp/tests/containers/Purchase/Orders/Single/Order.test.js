import { Order } from 'containers/Purchase/Orders/Single/Order';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('Order', () => {
  const props = {
    loadingPage: false,
    purchaseOrderGetRequest: jest.fn(),
    purchaseOrderSaveRequest: jest.fn(),
    purchaseOrderUpdateRequest: jest.fn(),
    purchaseOrderFieldsGetRequest: jest.fn(),
    push: jest.fn(),
    match: {
      params: {
        id: '1'
      }
    },
    change: jest.fn(),
    handleSubmit: jest.fn(),
    initialValues: {},
    status: 'status',
    onUpdate: jest.fn()
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
