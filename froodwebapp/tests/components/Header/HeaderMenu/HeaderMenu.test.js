import React from 'react';
import HeaderMenu from 'components/Header/HeaderMenu/HeaderMenu';
import renderer from 'react-test-renderer';

const { describe, it, expect } = global;

describe('HeaderMenu', () => {
  it('captures snapshot of HeaderMenu', () => {
    const props = {
      icon: 'deleted',
      activeTitle: 'INVENTORY',
      title: 'CATEGORY'
    };
    const snappedComponent = renderer.create(<HeaderMenu { ...props } />).toJSON();

    expect(snappedComponent).toMatchSnapshot();
  });
});
