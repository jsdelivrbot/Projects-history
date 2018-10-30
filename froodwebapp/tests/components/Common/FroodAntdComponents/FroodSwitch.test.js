import React from 'react';
import { FroodSwitch } from 'components/Common/';
import renderer from 'react-test-renderer';

const { describe, it, expect } = global;

describe('FroodSwitch', () => {
  it('captures snapshot of FroodSwitch', () => {
    const props = {
      id: 1,
      disabled: true,
      checked: false,
      size: 'small',
      checkedText: 'tonight',
      unCheckedText: 'all night',
      onChange: jest.fn()
    };
    const snappedComponent = renderer.create(<FroodSwitch { ...props } />).toJSON();

    expect(snappedComponent).toMatchSnapshot();
  });
});
