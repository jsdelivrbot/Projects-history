import React from 'react';
import { FormSupplierAutoComplete } from 'components';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, it, expect } = global;

describe('FormSupplierAutoComplete', () => {
  it('captures snapshot of FormSupplierAutoComplete', () => {
    const props = {
      input: {
        value: 4,
        onChange: jest.fn()
      },
      alignRight: false,
      disabled: false
    };
    const snappedComponent = shallow(<FormSupplierAutoComplete { ...props } />);

    expect(toJson(snappedComponent)).toMatchSnapshot();
  });
});
