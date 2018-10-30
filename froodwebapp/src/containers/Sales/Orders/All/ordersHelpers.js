import { renderAutocompleteItem } from 'utils';

export const getStatisticsColumns = stats => ([
  {
    value: stats ? stats.new : 0,
    description: 'New Orders'
  }, {
    value: stats ? stats.newSinceYesterday : 0,
    description: 'Since Yesterday',
    isDynamic: true
  }, {
    value: stats ? stats.recurring : 0,
    description: 'Recurring'
  }, {
    value: stats ? stats.recurringSinceYesterday : 0,
    description: 'Since Yesterday',
    isDynamic: true
  }, {
    value: stats ? stats.revenue : 0,
    description: 'New Orders Revenue',
    dollarSign: true
  }]
);

export const renderItem = renderAutocompleteItem(['id', 'customer', 'deliveryDate'], 'Order');

export const getRowClickRedirectLink = row => (
  `/sales/orders/${row.id.replace(/\//g, '-')}`
);
