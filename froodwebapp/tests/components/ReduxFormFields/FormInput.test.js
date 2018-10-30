import React from 'react';
import { FormInput } from 'components';
import renderer from 'react-test-renderer';

const { describe, it, expect } = global;

describe('FormInput', () => {
  it('captures snapshot of FormInput', () => {
    const props = {
      input: {
        value: 4,
        onChange: jest.fn()
      },
      disabled: true
    };
    const snappedComponent = renderer.create(<FormInput { ...props } />).toJSON();

    expect(snappedComponent).toMatchSnapshot();
  });
});
