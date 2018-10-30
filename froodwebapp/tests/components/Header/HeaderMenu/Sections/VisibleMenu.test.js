import React from 'react';
import VisibleMenu from 'components/Header/HeaderMenu/Sections/VisibleMenu';
import renderer from 'react-test-renderer';

const { describe, it, expect } = global;

describe('VisibleMenu', () => {
  it('captures snapshot of VisibleMenu', () => {
    const props = {
      badgeVisible: false,
      icon: 'deleted',
      activeTitle: 'CATEGORY',
      title: 'INVENTORY'
    };
    const snappedComponent = renderer.create(<VisibleMenu { ...props } />).toJSON();

    expect(snappedComponent).toMatchSnapshot();
  });
});
