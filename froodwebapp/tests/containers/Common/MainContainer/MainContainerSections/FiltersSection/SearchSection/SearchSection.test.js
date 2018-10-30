import SearchSection from 'containers/Common/MainContainer/MainContainerSections/FiltersSection/SearchSection/SearchSection';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { prepareFilterValue } from 'utils';

const { describe, expect, it } = global;

describe('SearchSection', () => {
  const props = {
    activeFilter: {
      filterId: null,
      filterName: 'Name',
      value: [{
        logicalOpId: null,
        relationalOpId: 1,
        columnId: null,
        value: 'Some value',
      }],
      userDefined: false
    },
    filterColumns: [{
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
    deleteFilterRequest: jest.fn(),
    saveFilterRequest: jest.fn(),
    updateFilterRequest: jest.fn(),
  };

  it('renders the SearchSection component', () => {
    const component = shallow(<SearchSection { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of SearchSection', () => {
    const component = shallow(<SearchSection { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
