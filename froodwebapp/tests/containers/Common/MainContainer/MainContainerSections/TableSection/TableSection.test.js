import TableSection from 'containers/Common/MainContainer/MainContainerSections/TableSection/TableSection';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('TableSection', () => {
  const props = {
    loadingTableData: false,
    data: [{
      id: 1
    }, {
      id: 2
    }],
    columns: [{
      isDefault: true,
    }, {
      isDefault: false,
    }],
    actionColumn: false,
    limit: 5,
    totalRows: 10,
    activeFilterId: 'All',
    searchSectionFilters: [],
    handleRowClick: jest.fn(),
    getAllItemsRequest: jest.fn(),
    getWithFilterRequest: jest.fn(),
    updateColumnsRequest: jest.fn(),
    downloadItemRequest: jest.fn()
  };

  it('renders the TableSection component', () => {
    const component = shallow(<TableSection { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of TableSection', () => {
    const component = shallow(<TableSection { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });

  it('calls getAllItemsRequest in handlePaginate with correct param', () => {
    const component = shallow(<TableSection { ...props } />);
    component.instance().handlePaginate(5, props.limit);

    expect(props.getAllItemsRequest.mock.calls.length).toBe(1);

    expect(props.getAllItemsRequest.mock.calls[0][0]).toEqual({ limit: 5, offset: 20 });
  });

  it('calls handleSelectRows and sets in state', () => {
    const component = shallow(<TableSection { ...props } />);
    component.instance().handleSelectRows('all', true);

    expect(component.state('selectedRows')).toEqual([1, 2]);
  });

  it('calls handleRowClick from props in handleRowClick with correct param', () => {
    const e = {
      target: {
        parentNode: {
          id: 'parentNode id'
        }
      }
    };
    const component = shallow(<TableSection { ...props } />);
    component.instance().handleRowClick(e);

    expect(props.handleRowClick.mock.calls.length).toBe(1);

    expect(props.handleRowClick.mock.calls[0][0]).toBe(e.target.parentNode.id);
  });

  it('calls downloadItemRequest in handleDownloadItem with correct param', () => {
    const e = {
      target: {
        id: 'target id'
      }
    };
    const component = shallow(<TableSection { ...props } />);
    component.instance().handleDownloadItem(e);

    expect(props.downloadItemRequest.mock.calls.length).toBe(1);

    expect(props.downloadItemRequest.mock.calls[0][0]).toEqual({ id: e.target.id });
  });
});
