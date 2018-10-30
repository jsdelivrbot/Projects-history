import React from 'react';
import { FormInputNumber } from 'components';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, it, expect } = global;

describe('FormInputNumber', () => {
  it('captures snapshot of FormInputNumber', () => {
    const props = {
      input: {
        value: 4,
        onChange: jest.fn()
      },
      style: {},
      className: 'btn',
      formatter: jest.fn(),
      parser: jest.fn(),
      placeholder: 'placeholder',
      disabled: false,
      min: 4,
      max: 14,
      step: 1
    };
    const snappedComponent = shallow(<FormInputNumber { ...props } />);

    expect(toJson(snappedComponent)).toMatchSnapshot();
  });
});
