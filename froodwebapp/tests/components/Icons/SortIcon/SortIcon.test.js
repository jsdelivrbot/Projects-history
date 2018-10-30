import React from 'react';
import { SortIcon } from 'components/Icons';
import renderer from 'react-test-renderer';

const { describe, it, expect } = global;

describe('SortIcon', () => {
  it('captures snapshot of SortIcon', () => {
    const props = {
      onClick: jest.fn()
    };
    const snappedComponent = renderer.create(<SortIcon { ...props } />).toJSON();

    expect(snappedComponent).toMatchSnapshot();
  });
});
