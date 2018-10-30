import React from 'react';
import BulkMenuBodyItem from 'components/Common/DynamicTable/BulkMenu/BulkMenuBodyItem';
import renderer from 'react-test-renderer';

const { describe, it, expect } = global;

describe('BulkMenuBodyItem', () => {
  it('captures snapshot of BulkMenuBodyItem', () => {
    const props = {
      text: 'some text',
      icon: 'some icon',
      onClick: jest.fn()
    };
    const snappedComponent = renderer.create(<BulkMenuBodyItem { ...props } />).toJSON();

    expect(snappedComponent).toMatchSnapshot();
  });
});
