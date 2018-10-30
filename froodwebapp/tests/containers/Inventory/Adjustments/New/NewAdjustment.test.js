import { NewAdjustment } from 'containers/Inventory/Adjustments/New/NewAdjustment';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('NewAdjustment', () => {
  const props = {
    loadingPage: false,
    warehouses: [],
    bins: [],
    batches: [],
    activeWarehouse: 1,
    activeBin: 1,
    activeSku: {
      id: '1',
      name: 'Inventory'
    },
    adjustmentReasons: [],
    skuWarehouseBinGetRequest: jest.fn(),
    skuBatchesGetWithFilterRequest: jest.fn(),
    adjustmentSaveRequest: jest.fn(),
    handleSubmit: jest.fn(),
  };

  it('renders the NewAdjustment component', () => {
    const component = shallow(<NewAdjustment { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of NewAdjustment', () => {
    const component = shallow(<NewAdjustment { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });

  it('calls skuBatchesGetWithFilterRequest in getSkuBatches with correct param', () => {
    const component = shallow(<NewAdjustment { ...props } />);
    component.setState({ warehouseId: 'warehouse', binId: 'bin' });
    component.instance().getSkuBatches();

    expect(props.skuBatchesGetWithFilterRequest.mock.calls.length).toBe(1);

    expect(props.skuBatchesGetWithFilterRequest.mock.calls[0][0]).toEqual({
      id: '1',
      payload: {
        binId: 'bin',
        warehouseId: 'warehouse'
      }
    });
  });

  it('calls adjustmentSaveRequest in handleSave with correct param', () => {
    const component = shallow(<NewAdjustment { ...props } />);
    component.setState({
      batchesModified: [{
        lotId: 1,
        reasonId: 1,
        adjustment: 15
      }],
      binId: '2',
      warehouseId: '2'
    });
    component.instance().handleSave();

    expect(props.adjustmentSaveRequest.mock.calls.length).toBe(1);

    expect(props.adjustmentSaveRequest.mock.calls[0][0]).toEqual({
      payload: {
        details: [{
          lotId: 1,
          reasonId: 1,
          qty: 15
        }],
        binId: '2',
        warehouseId: '2',
        sku: props.activeSku.id,
      }
    });
  });
});
