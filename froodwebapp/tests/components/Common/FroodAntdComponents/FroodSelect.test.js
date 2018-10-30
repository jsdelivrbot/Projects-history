import React from 'react';
import { FroodSelect } from 'components/Common/';
import renderer from 'react-test-renderer';

const { describe, it, expect } = global;

describe('FroodSelect', () => {
  it('captures snapshot of FroodSelect', () => {
    const props = {
      id: 1,
      menuItems: [{
        id: '4',
        name: 'Inventory',
        key: '4'
      }],
      onChange: jest.fn(),
      value: 14
    };
    const snappedComponent = renderer.create(<FroodSelect { ...props } />).toJSON();

    expect(snappedComponent).toMatchSnapshot();
  });
});
