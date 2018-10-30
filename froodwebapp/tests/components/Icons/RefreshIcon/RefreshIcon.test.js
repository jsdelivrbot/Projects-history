import React from 'react';
import { RefreshIcon } from 'components/Icons';
import renderer from 'react-test-renderer';

const { describe, it, expect } = global;

describe('RefreshIcon', () => {
  it('captures snapshot of RefeshIcon', () => {
    const props = {
      onClick: jest.fn()
    };
    const snappedComponent = renderer.create(<RefreshIcon { ...props } />).toJSON();

    expect(snappedComponent).toMatchSnapshot();
  });
});
