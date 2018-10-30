import TabsExtraContent from 'containers/Common/MainContainer/MainContainerSections/FiltersSection/TabsSection/TabsExtraContent/TabsExtraContent';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('TabsExtraContent', () => {
  const props = {
    activeFilterId: 'All',
    limit: 5,
    offset: 10,
    columns: [{
      id: 1,
      order: 'first order',
      displayName: 'Inventory',
      isDefault: false,
      tableDataType: 'Table data of first column',
    }, {
      id: 2,
      order: 'second order',
      displayName: 'Price lists',
      isDefault: true,
      tableDataType: 'Table data of second column'
    }],
    updateColumnsRequest: jest.fn(),
    getWithFilterRequest: jest.fn(),
    getAllItemsRequest: jest.fn(),
    activeTabId: '1',
  };

  it('renders the TabsExtraContent component', () => {
    const component = shallow(<TabsExtraContent { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of TabsExtraContent', () => {
    const component = shallow(<TabsExtraContent { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });

  it('calls handleToggleColumnsModal and sets columnsModalVisible in state', () => {
    const component = shallow(<TabsExtraContent { ...props } />);
    component.instance().handleToggleColumnsModal();

    expect(component.state('columnsModalVisible')).toBeTruthy();
  });
});
