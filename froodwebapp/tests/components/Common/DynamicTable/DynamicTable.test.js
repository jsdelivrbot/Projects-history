import React from 'react';
import { DynamicTable } from 'components/Common/DynamicTable/DynamicTable';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, it, expect } = global;

describe('DynamicTable', () => {
  it('captures snapshot of DynamicTable with state.tableRows.length=0', () => {
    const props = {
      selectedRows: ['first row', 'second row'],
      loadingTableData: false,
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
    const snappedComponent = shallow(<DynamicTable { ...props } />);

    expect(toJson(snappedComponent)).toMatchSnapshot();
  });

  it('captures snapshot of DynamicTable with state.tableRows.length=1 and loadingTableData=false', () => {
    const props = {
      selectedRows: ['first row', 'second row'],
      loadingTableData: false,
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
    const snappedComponent = shallow(<DynamicTable { ...props } />);
    snappedComponent.setState({ tableRows: ['1 row'] });

    expect(toJson(snappedComponent)).toMatchSnapshot();
  });
});
