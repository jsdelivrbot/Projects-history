import { MainContainer } from 'containers/Common/MainContainer/MainContainer';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('MainContainer', () => {
  const props = {
    user: {},
    push: jest.fn(),
    updateSearchSectionFilters: jest.fn(),
    updateColumnsRequest: jest.fn(),
    searchRequest: jest.fn(),
    updateFilterRequest: jest.fn(),
    deleteFilterRequest: jest.fn(),
    saveFilterRequest: jest.fn(),
    getWithFilterRequest: jest.fn(),
    getAllItemsRequest: jest.fn(),
    renderAutocompleteItem: jest.fn(),
    getStatisticsColumns: jest.fn(),
    getRowClickRedirectLink: jest.fn(),
    actionColumn: false,
    autocompletePlaceholder: 'autocomplete',
    autocomplete: [],
    filterDeleted: false,
    searchSectionFilters: [],
    filters: [],
    columns: [],
    data: [{
      id: 2,
      pathname: '/inventory/'
    }],
    offset: 14,
    limit: 21,
    keyword: 'keyword',
    totalRows: 1,
    loadingAutoComplete: false,
    loadingPage: false,
    loadingTableData: false,
    activeFilterId: '3',
    changeActiveFilterId: jest.fn()
  };

  it('render the MainContainer component', () => {
    const component = shallow(<MainContainer { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of MainContainer', () => {
    const component = shallow(<MainContainer { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });

  it('calls handleToggleStats function and sets stateVisible in state ', () => {
    const component = shallow(<MainContainer { ...props } />);
    component.instance().handleToggleStats();

    expect(component.state('statsVisible')).toBeTruthy();

    component.instance().handleToggleStats();

    expect(component.state('statsVisible')).toBeFalsy();
  });

  it('calls loginRequest function in handleRowClick function with correct param', () => {
    const component = shallow(<MainContainer { ...props } />);
    component.instance().handleRowClick('2');

    expect(props.getRowClickRedirectLink.mock.calls.length).toBe(1);

    expect(props.getRowClickRedirectLink.mock.calls[0][0]).toEqual({
      id: props.data[0].id,
      pathname: props.data[0].pathname
    });
  });
});
