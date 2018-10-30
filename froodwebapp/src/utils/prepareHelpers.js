/**
 * Used for Main Container Filter Section
 * @param {array} filters
 */

export const prepareFilterValue = filters => (
  filters.map(filter => ({
    relationalOpId: filter.relationalOpId,
    columnId: filter.columnId,
    logicalOpId: filter.logicalOpId,
    value: filter.value
  }))
);

/**
 * Used in Main Container Table Section
 * @param {array} columns
 */
export const prepareHeaders = columns => (
  columns.map(col => ({
    id: col.id,
    key: col.dataAlias,
    name: col.name,
    order: col.order,
    dataAlias: col.dataAlias,
    dataType: col.tableDataType,
    isEditable: col.isEditable,
    isSortable: col.isSortable
  }))
);
