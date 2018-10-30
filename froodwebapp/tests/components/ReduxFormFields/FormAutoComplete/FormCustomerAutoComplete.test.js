import React from 'react';
import { FormCustomerAutoComplete } from 'components';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, it, expect } = global;

describe('FormCustomerAutoComplete', () => {
  it('captures snapshot of FormCustomerAutoComplete', () => {
    const props = {
      input: {
        value: 4,
        onChange: jest.fn()
      },
      alignRight: false,
      disabled: false
    };
    const snappedComponent = shallow(<FormCustomerAutoComplete { ...props } />);

    expect(toJson(snappedComponent)).toMatchSnapshot();
  });
});
