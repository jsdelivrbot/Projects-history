import React from 'react';
import { GridCheckbox } from 'components';
import renderer from 'react-test-renderer';

const { describe, it, expect } = global;

describe('GridCheckbox', () => {
  it('captures snapshot of GridCheckbox', () => {
    const props = {
      handleChange: jest.fn(),
      propName: '',
      value: true,
      index: 2
    };
    const snappedComponent = renderer.create(<GridCheckbox { ...props } />).toJSON();

    expect(snappedComponent).toMatchSnapshot();
  });
});
