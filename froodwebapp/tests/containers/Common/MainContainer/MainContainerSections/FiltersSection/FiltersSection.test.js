import FilterTabs from 'containers/Common/MainContainer/MainContainerSections/FiltersSection/FiltersSection';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('FilterTabs', () => {
  const props = {
    visible: false,
    limit: 10,
    offset: 15,
    activeFilterId: '1',
    searchSectionFilters: [],
    filters: [],
    handleUpdateDefaultColumns: jest.fn(),
    columns: [{
      id: 1,
      order: 'first order',
      displayName: 'Inventory',
      isDefault: false
    }, {
      id: 2,
      order: 'second order',
      displayName: 'Price lists',
      isDefault: true
    }],
    updateSearchSectionFilters: jest.fn(),
    getWithFilterRequest: jest.fn(),
    saveFilterRequest: jest.fn(),
    updateFilterRequest: jest.fn(),
    deleteFilterRequest: jest.fn(),
    updateColumnsRequest: jest.fn(),
    getAllItemsRequest: jest.fn(),
    changeActiveFilterId: jest.fn()
  };

  it('renders the FilterTabs component', () => {
    const component = shallow(<FilterTabs { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of FilterTabs', () => {
    const component = shallow(<FilterTabs { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });

  it('calls handleToggleSearchSection and sets searchSectionVisible to state', () => {
    const component = shallow(<FilterTabs { ...props } />);
    component.instance().handleToggleSearchSection();

    expect(component.state('searchSectionVisible')).toEqual(true);
  });
});
