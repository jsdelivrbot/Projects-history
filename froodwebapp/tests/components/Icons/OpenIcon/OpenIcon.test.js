import React from 'react';
import { OpenIcon } from 'components/Icons';
import renderer from 'react-test-renderer';

const { describe, it, expect } = global;

describe('OpenIcon', () => {
  it('captures snapshot of OpenIcon', () => {
    const props = {
      onClick: jest.fn()
    };
    const snappedComponent = renderer.create(<OpenIcon { ...props } />).toJSON();

    expect(snappedComponent).toMatchSnapshot();
  });
});
