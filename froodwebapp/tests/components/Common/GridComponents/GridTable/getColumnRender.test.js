import React from 'react';
import { getColumnRender } from 'components';
import renderer from 'react-test-renderer';

const { describe, it, expect } = global;

describe('getColumnRender', () => {
  it('captures snapshot of getColumnRender', () => {
    const props = {
      expandable: true,
      type: 'type',
      column: 'default',
      firstColumn: 'first column',
      handleEditCell: jest.fn(),
      handleAddTag: jest.fn(),
      handleDeleteTag: jest.fn(),
      handleDeleteRow: jest.fn(),
      handleModalButtonClick: jest.fn()
    };
    const snappedComponent = renderer.create(<getColumnRender { ...props } />).toJSON();

    expect(snappedComponent).toMatchSnapshot();
  });
});
