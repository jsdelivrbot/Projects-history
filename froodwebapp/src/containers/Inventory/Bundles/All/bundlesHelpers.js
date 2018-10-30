import { renderAutocompleteItem } from 'utils';

export const getStatisticsColumns = () => ([
  {
    value: 300,
    description: 'Item Bundles'
  }, {
    value: 20,
    description: 'Since Yesterday',
    isDynamic: true
  }, {
    value: 290,
    description: 'Active'
  }, {
    value: 20,
    description: 'Since Yesterday',
    isDynamic: true
  }, {
    value: 290,
    description: 'Recurring'
  }, {
    value: 15,
    description: 'Since Yesterday',
    isDynamic: true
  }]
);

export const renderItem = renderAutocompleteItem(['id', 'name', 'skuCode'], 'Item Bundle');

export const getRowClickRedirectLink = row => (
  `/inventory/item-bundles/${row.id}`
);
