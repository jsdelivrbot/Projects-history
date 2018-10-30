import React from 'react';
import { CustomerAutoComplete } from 'components/Common/AutoComplete/CustomerAutoComplete';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, it, expect } = global;

describe('CustomerAutoComplete', () => {
  it('captures snapshot of CustomerAutoComplete', () => {
    const props = {
      loadingAutoComplete: false,
      value: 'value',
      customers: [],
      alignRight: false,
      disabled: false,
      customerSearchRequest: jest.fn(),
      onChange: jest.fn(),
      onSelect: jest.fn()
    };

    const snappedComponent = shallow(<CustomerAutoComplete { ...props } />);

    expect(toJson(snappedComponent)).toMatchSnapshot();
  });
});
