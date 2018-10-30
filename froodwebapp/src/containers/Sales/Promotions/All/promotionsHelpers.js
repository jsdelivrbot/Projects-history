import { renderAutocompleteItem } from 'utils';

export const renderItem = renderAutocompleteItem(['id', 'code', 'name'], 'Promotion');

export const getRowClickRedirectLink = row => (
  `/sales/promotions/${row.id}/${row.code}`
);

