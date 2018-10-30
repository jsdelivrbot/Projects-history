import { Customer } from 'containers/Sales/Customers/New/Customer';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('Customer', () => {
  const props = {
    newCustomer: {},
    customerNewRequest: jest.fn(),
    successSave: false,
    loadingPage: false,
    push: jest.fn(),
    handleSubmit: jest.fn()
  };

  it('renders the Customer component', () => {
    const component = shallow(<Customer { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of Customer', () => {
    const component = shallow(<Customer { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
