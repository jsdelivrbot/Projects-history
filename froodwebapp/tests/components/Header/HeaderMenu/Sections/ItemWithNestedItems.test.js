import React from 'react';
import ItemWithNestedItems from 'components/Header/HeaderMenu/Sections/ItemWithNestedItems';
import renderer from 'react-test-renderer';

const { describe, it, expect } = global;

describe('ItemWithNestedItems', () => {
  it('captures snapshot of ItemWithNestedItems', () => {
    const props = {
      text: 'Inventory',
      url: '/v1/inventory/',
      plusIconVisible: true,
      plusIconUrl: '/icon/',
      activeUrl: '/v1/categories/4',
      nestedItems: [{
        text: 'first item',
        url: '/v1/categories/',
        plusIconVisible: true,
        plusIconUrl: '/v1/icons/'
      }, {
        text: 'second item',
        url: '/v1/inventory/',
        plusIconVisible: false,
        plusIconUrl: '/v1//icons/'
      }],
      handleRedirect: jest.fn()
    };

    const snappedComponent = renderer.create(<ItemWithNestedItems { ...props } />).toJSON();

    expect(snappedComponent).toMatchSnapshot();
  });
});
