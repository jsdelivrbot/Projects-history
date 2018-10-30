import React from 'react';
import { FormTelephoneInput } from 'components';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, it, expect } = global;

describe('FormTelephoneInput', () => {
  it('captures snapshot of FormTelephoneInput', () => {
    const props = {
      input: {
        value: false,
        onChange: jest.fn()
      },
      defaultCountry: 'default country',
      countryCode: '0'
    };
    const snappedComponent = shallow(<FormTelephoneInput { ...props } />);

    expect(toJson(snappedComponent)).toMatchSnapshot();
  });
});
