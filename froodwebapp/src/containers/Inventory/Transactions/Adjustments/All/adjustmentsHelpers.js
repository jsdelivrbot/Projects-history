import { renderAutocompleteItem } from 'utils';

export const getStatisticsColumns = () => ([
  {
    value: 300,
    description: 'Adjustments'
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

export const renderItem = renderAutocompleteItem(['bin', 'sku', 'warehouse'], 'Adjustment');
