import React from 'react';
import { GridButton } from 'components';
import renderer from 'react-test-renderer';

const { describe, it, expect } = global;

describe('GridButton', () => {
  it('captures snapshot of GridButton', () => {
    const props = {
      text: 'some text',
      index: 1,
      propName: 'name',
      handleClick: jest.fn()
    };
    const snappedComponent = renderer.create(<GridButton { ...props } />).toJSON();

    expect(snappedComponent).toMatchSnapshot();
  });
});
