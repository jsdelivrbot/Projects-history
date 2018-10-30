import moment from 'moment';

export const columns = disabled => [{
  title: 'SKU',
  width: '11%',
  dataIndex: 'sku'
}, {
  title: 'Supplier SKU',
  width: '11%',
  dataIndex: 'supplierSku'
}, {
  title: 'UOM',
  width: '5%',
  dataIndex: 'uomName'
}, {
  title: 'Batch',
  type: 'text',
  disabled,
  dataIndex: 'batch'
}, {
  title: 'Production Date',
  type: 'date',
  activeBeforeToday: true,
  disabled,
  dataIndex: 'productionDate'
}, {
  title: 'Expiry Date',
  type: 'date',
  disabled,
  dataIndex: 'expiryDate'
}, {
  title: 'Received QTY',
  type: 'number',
  width: '10%',
  disabled,
  dataIndex: 'receivedQty'
}, {
  title: 'Rejected QTY',
  type: 'number',
  width: '10%',
  disabled,
  dataIndex: 'rejectedQty'
}, {
  title: 'Remarks',
  type: 'text',
  disabled,
  dataIndex: 'remarks'
}];

export const prepareGRN = (formValues, operation) => ({
  operation,
  id: formValues.id && formValues.id,
  internalNotes: formValues.internalNotes,
  list: formValues.list.map(item => ({
    batch: item.batch,
    // if no date choosen, set date to default in format DD-MMMM-YYYY
    expiryDate: item.expiryDate || moment().format('DD-MMMM-YYYY'),
    productionDate: item.productionDate || moment().subtract(1, 'days').format('DD-MMMM-YYYY'),
    receivedQty: Number(item.receivedQty),
    rejectedQty: Number(item.rejectedQty),
    remarks: item.remarks,
    sku: item.sku,
    id: item.id && item.id
  }))
});

export const getButtonsByStatus = (status, saveHandler, updateHandler, newGrn) => {
  switch (status.toLowerCase()) {
    case 'released':
    case 'partial received':
      return {
        saveButtonVisible: true,
        saveButtonText: 'Receive',
        saveButtonHandler: formData => (newGrn.id ? updateHandler(formData, 'receive') : saveHandler(formData, 'receive')),
        updateButtonVisible: true,
        updateButtonText: 'Save as Draft',
        updateButtonHandler: formData => (newGrn.id ? updateHandler(formData, 'draft') : saveHandler(formData, 'draft')),
      };
    default:
      return {
        saveButtonVisible: false,
        updateButtonVisible: false,
        cancelButtonVisible: false
      };
  }
};
