import React from 'react';
import { FormSwitch } from 'components';
import renderer from 'react-test-renderer';

const { describe, it, expect } = global;

describe('FormSwitch', () => {
  it('captures snapshot of FormSwitch', () => {
    const props = {
      input: {
        value: true,
        onChange: jest.fn()
      },
      checkedText: 'checked text',
      unCheckedText: 'unchecked text',
      disbaled: true,
      isSwitch: false,
      size: 'small'
    };
    const snappedComponent = renderer.create(<FormSwitch { ...props } />).toJSON();

    expect(snappedComponent).toMatchSnapshot();
  });
});
