import { MainTab } from 'containers/Inventory/Bundles/Single/Tabs/MainTab/MainTab';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('MainTab', () => {
  const props = {
    loadingPage: false,
    isNewBundle: false,
    initialValues: {
      id: '1'
    },
    uoms: [],
    locations: [],
    allocationTypes: [],
    taxCategories: [],
    productCategories: [],
    skuStatusTypes: [],
    bundleInfoSaveRequest: jest.fn(),
    bundleInfoUpdateRequest: jest.fn(),
    bundleUomLocationsGetParallelRequest: jest.fn(),
    handleSubmit: jest.fn(),
    push: jest.fn()
  };

  it('renders the MainTab component', () => {
    const component = shallow(<MainTab { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of MainTab', () => {
    const component = shallow(<MainTab { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });

  it('calls bundleInfoUpdateRequest in handleSave with correct param', () => {
    const payload = {
      id: '1',
      allocTypeId: '1',
      categoryId: '1',
      description: 'Some description',
      name: 'name',
      statusId: '1',
      taxCategoryId: '1'
    };
    const component = shallow(<MainTab { ...props } />);
    component.instance().handleSave(payload);

    expect(props.bundleInfoUpdateRequest.mock.calls.length).toBe(1);

    expect(props.bundleInfoUpdateRequest.mock.calls[0][0]).toEqual({
      payload: {
        id: payload.id,
        allocTypeId: payload.allocTypeId,
        categoryId: payload.categoryId,
        description: payload.description,
        name: payload.name,
        statusId: payload.statusId,
        taxCategoryId: payload.taxCategoryId
      }
    });
  });
});
