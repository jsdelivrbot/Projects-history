export const columns = disabled => [{
  title: 'SKU',
  dataIndex: 'sku'
}, {
  title: 'Supplier SKU',
  dataIndex: 'supplierSku'
}, {
  title: 'Ordered QTY',
  dataIndex: 'orderQty'
}, {
  title: 'UOM',
  dataIndex: 'uomName'
}, {
  title: 'Received QTY',
  dataIndex: 'receivedQty'
}, {
  title: 'PRICE',
  dataIndex: 'price',
  render: (text, record) => record.price && `${record.price} $`
}, {
  title: 'TAX',
  dataIndex: 'tax',
  render: (text, record) => record.tax && `${record.tax} $`
}, {
  title: 'TOTAL',
  dataIndex: 'total',
  render: (text, record) => record.total && `${record.total} $`
}, {
  title: 'Invoice Checked',
  type: 'checkbox',
  disabled,
  dataIndex: 'invoiceChecked'
}];

export const prepareInvoice = formValues => ({
  list: formValues.list.map(item => ({
    id: item.id,
    invoiceChecked: item.invoiceChecked
  })),
  grnNo: formValues.grnNo,
  invoiceAmount: formValues.invoiceAmount,
  invoiceDate: formValues.invoiceDate,
  invoiceNo: formValues.invoiceNo
});
