import { optionValues } from './MainTab.scss';

export const productOptionsColumns = productKeyColumnDisabled => [{
  title: 'Product Option',
  type: 'text',
  dataIndex: 'key',
  width: '30%',
  disabled: productKeyColumnDisabled,
  autoFocus: true
}, {
  title: 'Values',
  dataIndex: 'values',
  type: 'tags',
  className: optionValues
}, {
  type: 'deleteIconColumn',
  allRowsCanBeDeleted: !productKeyColumnDisabled
}];

export const productVariantsNewColumns = [{
  title: 'Product Variant',
  dataIndex: 'name',
  width: '30%'
}, {
  title: 'SKU',
  type: 'text',
  dataIndex: 'sku',
  className: optionValues
}, {
  type: 'deleteIconColumn',
  allRowsCanBeDeleted: true
}];

export const productVariantsEditColumns = (
  productOptions,
  countries,
  taxCategories,
  defaultLocations,
  zoneTypes,
  skuStatusTypes
) => {

  const columns = [{
    title: 'SKU/Variants',
    dataIndex: 'sku',
    type: 'text'
  }, {
    title: 'Country of Origin',
    dataIndex: 'originCountryId',
    type: 'select',
    menuItems: countries
  }];

  // dynamically get number of columns for product options
  productOptions.forEach((po) => {
    if (po.values.length >= 1) {
      columns.push({
        title: po.key,
        dataIndex: po.key.toLowerCase()
      });
    }
  });

  return columns.concat([{
    title: 'Tax Category',
    dataIndex: 'taxCategoryId',
    type: 'select',
    menuItems: taxCategories
  }, {
    title: 'Default Location',
    dataIndex: 'defaultLocationId',
    type: 'select',
    menuItems: defaultLocations
  }, {
    title: 'Storage Conditions',
    dataIndex: 'storageConditionId',
    type: 'select',
    menuItems: zoneTypes
  }, {
    title: 'Status',
    dataIndex: 'statusId',
    type: 'select',
    menuItems: skuStatusTypes
  }, {
    type: 'deleteIconColumn',
    onlyNewRowsCanBeDeleted: true
  }]);
};
