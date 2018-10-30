import { renderAutocompleteItem } from 'utils';

export const getStatisticsColumns = () => ([
  {
    value: 300,
    description: 'Purchases'
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

export const renderItem = renderAutocompleteItem(['code', 'startDate', 'endDate'], 'Stock Count');

export const getRowClickRedirectLink = row => (
  `/inventory/stock-count/${row.id}/${row.code}`
);
