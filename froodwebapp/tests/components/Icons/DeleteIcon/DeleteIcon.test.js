import React from 'react';
import { DeleteIcon } from 'components/Icons';
import renderer from 'react-test-renderer';

const { describe, it, expect } = global;

describe('DeleteIcon', () => {
  it('captures snapshot of DeleteIcon', () => {
    const props = {
      onClick: jest.fn(),
      id: 14,
      type: 'post'
    };
    const snappedComponent = renderer.create(<DeleteIcon { ...props } />).toJSON();

    expect(snappedComponent).toMatchSnapshot();
  });
});
