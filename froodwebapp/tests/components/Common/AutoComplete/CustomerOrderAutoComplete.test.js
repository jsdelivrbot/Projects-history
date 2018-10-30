import React from 'react';
import { CustomerOrderAutoComplete } from 'components/Common/AutoComplete/CustomerOrderAutoComplete';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, it, expect } = global;

describe('CustomerOrderAutoComplete', () => {
  it('captures snapshot of CustomerOrderAutoComplete', () => {
    const props = {
      loadingAutoComplete: false,
      customerId: 1,
      value: 'value',
      customerOrders: [],
      alignRight: false,
      disabled: false,
      customerOrderSearchRequest: jest.fn(),
      onChange: jest.fn(),
      onSelect: jest.fn()
    };

    const snappedComponent = shallow(<CustomerOrderAutoComplete { ...props } />);

    expect(toJson(snappedComponent)).toMatchSnapshot();
  });
});
