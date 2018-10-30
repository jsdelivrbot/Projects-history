import TabsSection from 'containers/Common/MainContainer/MainContainerSections/FiltersSection/TabsSection/TabsSection';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('TabsSection', () => {
  const props = {
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
    tabs: [{
      filterId: '1',
      filterName: 'name',
      userDefined: false
    }],
    activeTabId: '1',
    limit: 1,
    offset: 1,
    getAllItemsRequest: jest.fn(),
    getWithFilterRequest: jest.fn(),
    updateColumnsRequest: jest.fn(),
    changeActiveFilterId: jest.fn(),
    handleToggleSearchSection: jest.fn(),
  };

  it('renders the TabsSection component', () => {
    const component = shallow(<TabsSection { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of TabsSection', () => {
    const component = shallow(<TabsSection { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
