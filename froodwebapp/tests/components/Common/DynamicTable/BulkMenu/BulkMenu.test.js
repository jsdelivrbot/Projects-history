import React from 'react';
import BulkMenu from 'components/Common/DynamicTable/BulkMenu/BulkMenu';
import renderer from 'react-test-renderer';

const { describe, it, expect } = global;

describe('BulkMenu', () => {
  it('captures snapshot of BulkMenu', () => {
    const props = {
      selectedRowsNumber: 3
    };
    const snappedComponent = renderer.create(<BulkMenu { ...props } />).toJSON();

    expect(snappedComponent).toMatchSnapshot();
  });
});
