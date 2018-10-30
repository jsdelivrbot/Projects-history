import React from 'react';
import { CloseIcon } from 'components/Icons';
import renderer from 'react-test-renderer';

const { describe, it, expect } = global;

describe('CloseIcon', () => {
  it('captures snapshot of CloseIcon', () => {
    const props = {
      onClick: jest.fn()
    };
    const snappedComponent = renderer.create(<CloseIcon { ...props } />).toJSON();
    expect(snappedComponent).toMatchSnapshot();
  });
});
