import React from 'react';
import { FormCustomerOrderAutoComplete } from 'components';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, it, expect } = global;

describe('FormCustomerOrderAutoComplete', () => {
  it('captures snapshot of FormCustomerOrderAutoComplete', () => {
    const props = {
      input: {
        value: 4,
        onChange: jest.fn()
      },
      alignRight: false,
      disabled: false
    };
    const snappedComponent = shallow(<FormCustomerOrderAutoComplete { ...props } />);

    expect(toJson(snappedComponent)).toMatchSnapshot();
  });
});
