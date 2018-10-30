import React from 'react';
import SingleMenuItem from 'components/Header/HeaderMenu/Sections/SingleMenuItem';
import renderer from 'react-test-renderer';

const { describe, it, expect } = global;

describe('SingleMenuItem', () => {
  it('captures snapshot of SingleMenuItem', () => {
    const props = {
      text: 'Inventory',
      url: '/v1/inventory/',
      plusIconVisible: true,
      plusIconUrl: '/icon/',
      activeUrl: '/v1/categories/4',
      handleRedirect: jest.fn()
    };
    const snappedComponent = renderer.create(<SingleMenuItem { ...props } />).toJSON();

    expect(snappedComponent).toMatchSnapshot();
  });
});
