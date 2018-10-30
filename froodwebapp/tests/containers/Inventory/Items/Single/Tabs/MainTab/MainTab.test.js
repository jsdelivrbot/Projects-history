import { MainTab } from 'containers/Inventory/Items/Single/Tabs/MainTab/MainTab';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('MainTab', () => {
  const props = {
    loadingPage: false,
    loadingUoms: false,
    isNewSkuItem: false,
    hasInitialProductVariants: false,
    productKeyColumnDisabled: false,
    itemId: '1',
    defaultVariantColumnValues: {},
    countries: [],
    categories: [],
    taxCategories: [],
    defaultLocations: [],
    zoneTypes: [],
    skuStatusTypes: [],
    uoms: [],
    itemInfoSaveRequest: jest.fn(),
    itemInfoUpdateRequest: jest.fn(),
    uomGetRequest: jest.fn(),
    errorMessage: jest.fn(),
    initialValues: {
      id: '1',
      options: 'options',
      variants: 'variants'
    },
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

  it('calls itemInfoSaveRequest in handleSaveNewItem with correct param', () => {
    const formData = {
      name: 'name',
      sku: 'sku',
      brand: 'brand',
      categoryId: '1',
      taxCategoryId: '1',
      uomId: '1',
      defaultLocationId: '1',
      originCountryId: '1'
    };
    const component = shallow(<MainTab { ...props } />);
    component.instance().handleSaveNewItem(formData);

    expect(props.itemInfoSaveRequest.mock.calls.length).toBe(1);

    expect(props.itemInfoSaveRequest.mock.calls[0][0]).toEqual({
      payload: {
        name: formData.name,
        sku: formData.sku,
        brand: formData.brand,
        categoryId: formData.categoryId,
        taxCategoryId: formData.taxCategoryId,
        uomId: formData.uomId,
        defaultLocationId: formData.defaultLocationId,
        originCountryId: formData.originCountryId,
        options: [],
        variants: []
      }
    });
  });

  it('calls itemInfoUpdateRequest in handleSaveExistingItem with correct param', () => {
    const formData = {
      name: 'name',
      brand: 'brand',
      categoryId: '1',
      taxCategoryId: '1',
      uomId: '1',
      defaultLocationId: '1',
      originCountryId: '1',
      description: 'description',
      id: '1',
      statusId: '1',
      storageConditionId: '1'
    };
    const component = shallow(<MainTab { ...props } />);
    component.instance().handleSaveExistingItem(formData);

    expect(props.itemInfoUpdateRequest.mock.calls.length).toBe(1);

    expect(props.itemInfoUpdateRequest.mock.calls[0][0]).toEqual({
      payload: {
        name: formData.name,
        brand: formData.brand,
        categoryId: formData.categoryId,
        taxCategoryId: formData.taxCategoryId,
        uomId: formData.uomId,
        defaultLocationId: formData.defaultLocationId,
        originCountryId: formData.originCountryId,
        description: formData.description,
        id: formData.id,
        statusId: formData.statusId,
        storageConditionId: formData.storageConditionId,
        options: [],
        variants: []
      }
    });
  });

  it('calls errorMessage in handleUpdateProductOptionsValues if action is uniqError', () => {
    const uniqError = 'uniqError';
    const component = shallow(<MainTab { ...props } />);
    component.instance().handleUpdateProductOptionsValues(undefined, uniqError);

    expect(props.errorMessage.mock.calls.length).toBe(1);

    expect(props.errorMessage.mock.calls[0][0]).toEqual({ message: 'Option values must be unique' });
  });
});
