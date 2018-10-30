import { Promotion } from 'containers/Sales/Promotions/Single/Promotion';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('Promotion', () => {
  const props = {
    promotionGetRequest: jest.fn(),
    promotionSaveRequest: jest.fn(),
    promotionUpdateRequest: jest.fn(),
    itemInfoGetRequest: jest.fn(),
    bundleInfoGetRequest: jest.fn(),
    loadingPage: false,
    skusAutocomplete: [],
    bundleAutocomplete: [],
    categories: [],
    selectValues: [],
    successSave: false,
    condition: 1,
    skuData: {},
    bundleInfo: {},
    sku: {},
    bundleId: '1',
    type: 1,
    isLimited: false,
    promotionData: {},
    handleSubmit: jest.fn(),
    initialValues: {},
    push: jest.fn(),
    match: {
      params: {
        id: '1'
      }
    },
    dispatch: 1,
    change: 1
  };

  it('renders the Promotion component', () => {
    const component = shallow(<Promotion { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of Promotion', () => {
    const component = shallow(<Promotion { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
