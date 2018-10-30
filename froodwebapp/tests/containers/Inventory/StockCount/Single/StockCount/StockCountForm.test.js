import { StockCountForm } from 'containers/Inventory/StockCount/Single//StockCount/StockCountForm';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('StockCountForm', () => {
  const props = {
    needRedirect: false,
    isNewStockCount: false,
    started: false,
    users: [],
    warehouses: [],
    activeWarehouseId: 1,
    stockCount: { status: 'Assigned' },
    handleSubmit: jest.fn(),
    handleSearchChange: jest.fn(),
    stockCountStartUpdateRequest: jest.fn(),
    stockCountFinalizeUpdateRequest: jest.fn(),
    stockCountSaveRequest: jest.fn(),
    push: jest.fn(),
    tableData: [{
      status: 'status'
    }]
  };

  it('renders the StockCountForm component', () => {
    const component = shallow(<StockCountForm { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of StockCountForm', () => {
    const component = shallow(<StockCountForm { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });

  it('calls stockCountStartUpdateRequest in handleSave with correct param', () => {
    const payload = {
      status: 'Assigned',
      id: 1
    };
    const component = shallow(<StockCountForm { ...props } />);
    component.instance().handleSave(payload);

    expect(props.stockCountStartUpdateRequest.mock.calls.length).toBe(1);

    expect(props.stockCountStartUpdateRequest.mock.calls[0][0]).toEqual({ id: payload.id });
  });
});
