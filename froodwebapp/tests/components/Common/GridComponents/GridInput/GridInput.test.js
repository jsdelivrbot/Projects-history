import React from 'react';
import { GridInput } from 'components';
import renderer from 'react-test-renderer';

const { describe, it, expect } = global;

describe('GridInput', () => {
  it('captures snapshot of GridInput', () => {
    const props = {
      value: 1,
      index: 1,
      onChange: jest.fn(),
      propName: 'name',
      disabled: false,
      autoFocus: false
    };
    const snappedComponent = renderer.create(<GridInput { ...props } />).toJSON();

    expect(snappedComponent).toMatchSnapshot();
  });
});
