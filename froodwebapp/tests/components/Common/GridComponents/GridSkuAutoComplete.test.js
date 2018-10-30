import React from 'react';
import { GridSkuAutoComplete } from 'components/Common/GridComponents/GridSkuAutoComplete';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, it, expect } = global;

describe('GridSkuAutoComplete', () => {
  it('captures snapshot of GridSkuAutoComplete', () => {
    const props = {
      value: 'value',
      vendorId: 1,
      index: 1,
      onChange: jest.fn(),
      propName: 'name',
      disabled: false,
      handleFillSkuData: jest.fn(),
      gridRowId: 1,
      skuWarehouseInfo: {},
      skuWarehouseInfoRequest: jest.fn()
    };
    const snappedComponent = shallow(<GridSkuAutoComplete { ...props } />);

    expect(toJson(snappedComponent)).toMatchSnapshot();
  });
});
