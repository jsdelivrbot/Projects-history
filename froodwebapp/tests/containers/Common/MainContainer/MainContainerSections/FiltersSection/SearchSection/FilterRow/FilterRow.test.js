import FilterRow from 'containers/Common/MainContainer/MainContainerSections/FiltersSection/SearchSection/FilterRow/FilterRow';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('FilterRow', () => {
  const props = {
    filterColumns: [{
      id: 1,
      order: 'first order',
      displayName: 'Inventory',
      isDefault: false,
      tableDataType: 'Table data of first column'
    }, {
      id: 2,
      order: 'second order',
      displayName: 'Price lists',
      isDefault: true,
      tableDataType: 'Table data of second column'
    }],
    rowIndex: 1,
    rowData: {
      id: 1,
      value: 'Some value',
      columnId: 1,
      logicalOpId: 1,
      relationalOpId: 1
    },
    handleFilterChange: jest.fn(),
    handleFilterInputChange: jest.fn(),
    handleFilterNameChange: jest.fn(),
    handleDatePickerChange: jest.fn(),
    handleAddFilterRow: jest.fn(),
    handleDeleteFilterRow: jest.fn(),
    handleSaveFilter: jest.fn(),
    handleDeleteFilter: jest.fn(),
    handleChangeColumn: jest.fn(),
    handleChangeColumnAvailableValue: jest.fn(),
    handleChangeLogicalOperator: jest.fn(),
    handleChangeRelationalOperator: jest.fn(),
  };

  it('renders the FilterRow component', () => {
    const component = shallow(<FilterRow { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of FilterRow', () => {
    const component = shallow(<FilterRow { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
