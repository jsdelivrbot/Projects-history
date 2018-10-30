import React from 'react';
import { GridTable } from 'components';
import renderer from 'react-test-renderer';

const { describe, it, expect } = global;

describe('GridTable', () => {
  it('captures snapshot of GridTable', () => {
    const props = {
      rowKey: 'some key',
      updateTableData: jest.fn(),
      dataSource: [['some data']],
      columns: [{
        dataIndex: 1,
        title: 'Some title',
        width: 100,
        className: 'row',
        type: 'type'
      }]
    };
    const snappedComponent = renderer.create(<GridTable { ...props } />).toJSON();

    expect(snappedComponent).toMatchSnapshot();
  });
});
