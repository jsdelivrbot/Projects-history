import React from 'react';
import { FormDatePicker } from 'components';
import renderer from 'react-test-renderer';
import MockDate from 'mockdate';

const { describe, it, expect } = global;

describe('FormDatePicker', () => {
  it('captures snapshot of FormDatePicker', () => {
    MockDate.set(1434319925275);
    const props = {
      input: {
        value: 4,
        onChange: jest.fn()
      },
      disabled: true
    };
    const snappedComponent = renderer.create(<FormDatePicker { ...props } />).toJSON();

    expect(snappedComponent).toMatchSnapshot();
    MockDate.reset();
  });
});
