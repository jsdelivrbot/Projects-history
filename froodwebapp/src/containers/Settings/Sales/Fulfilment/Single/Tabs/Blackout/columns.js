import React from 'react';
import { TableActionButtons } from 'components';

export default (handleDeleteRow, readonly) => {
  const columns = [{
    title: 'From',
    dataIndex: 'startDate',
    render: text => text
  }, {
    title: 'To',
    dataIndex: 'endDate',
    render: text => text
  }, {
    title: 'Name',
    dataIndex: 'name',
    render: text => text
  }];
  if (!readonly) {
    columns.push({
      title: 'Actions',
      dataIndex: 'total',
      render: (text, record) => (
        <TableActionButtons
          record={ record }
          editButtonVisible={ false }
          deleteButtonVisible
          handleDeactivate={ handleDeleteRow }
          deleteButtonDisabled={ readonly }
        />
      )
    });
    return columns;
  }
  return columns;
};
