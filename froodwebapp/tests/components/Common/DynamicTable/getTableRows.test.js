import React from 'react';
import getTableRows from 'components/Common/DynamicTable/getTableRows';
import renderer from 'react-test-renderer';

const { describe, it, expect } = global;

describe('getTableRows', () => {
  it('captures snapshot of getTableRows', () => {
    const props = {
      selectedRows: ['first row', 'second row'],
      actionColumn: false,
      data: [{
        id: 'first row'
      }, {
        id: 'second row'
      }],
      headers: [{
        id: 2,
        value: 'some value',
        key: 2,
        moveHeader: jest.fn(),
        saveHeaderOrder: jest.fn(),
        isSortable: true,
        handleSort: jest.fn(),
        name: 'second header',
        dataType: 'number'
      }],
      handleSelectRows: jest.fn(),
      handleUpdateColumnsOrder: jest.fn(),
      handleSort: jest.fn(),
      handleRowClick: jest.fn(),
      handleDownloadItem: jest.fn()
    };
    const snappedComponent = renderer.create(<getTableRows { ...props } />).toJSON();

    expect(snappedComponent).toMatchSnapshot();
  });
});
