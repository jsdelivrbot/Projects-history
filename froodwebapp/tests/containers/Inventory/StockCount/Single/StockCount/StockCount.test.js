import { StockCount } from 'containers/Inventory/StockCount/Single/StockCount/StockCount';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('StockCount', () => {
  const props = {
    isNewStockCount: false,
    stockCountId: 1,
    loadingPage: false,
    needReload: false,
    scWarehousesUsersGetRequest: jest.fn(),
    stockCountGetRequest: jest.fn(),
    stockCountStartUpdateRequest: jest.fn(),
    stockCountFinalizeUpdateRequest: jest.fn(),
    stockCountDetailConfirmUpdateRequest: jest.fn(),
    initialValues: {
      details: [{
        sku: 'some sku' }]
    },
    stockCount: { id: '1' },
    match: {}
  };

  it('renders the StockCount component', () => {
    const component = shallow(<StockCount { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of StockCount', () => {
    const component = shallow(<StockCount { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });

  it('calls stockCountGetRequest in getStockCount with correct param', () => {
    const component = shallow(<StockCount { ...props } />);
    component.instance().getStockCount();

    expect(props.stockCountGetRequest.mock.calls.length).toBe(4);

    expect(props.stockCountGetRequest.mock.calls[0][0]).toEqual({ id: props.stockCountId });
  });

  it('calls stockCountDetailConfirmUpdateRequest in handleConfirm with correct param', () => {
    const e = {
      target: {
        id: '1'
      }
    };
    const component = shallow(<StockCount { ...props } />);
    component.setState({ tableData: [{
      id: 1,
      newQty: 'newQty'
    }] });
    component.instance().handleConfirm(e);

    expect(props.stockCountDetailConfirmUpdateRequest.mock.calls.length).toBe(1);

    expect(props.stockCountDetailConfirmUpdateRequest.mock.calls[0][0]).toEqual({
      id: props.stockCount.id,
      detailId: e.target.id,
      payload: {
        newQty: 'newQty'
      }
    });
  });
});
