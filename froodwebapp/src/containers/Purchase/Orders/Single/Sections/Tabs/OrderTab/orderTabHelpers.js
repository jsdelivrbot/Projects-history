import { percentageFormatter, percentageParser } from 'utils';

export const columns = (disabled, vendorId) => [{
  title: 'SKU',
  type: 'skuAutoComplete',
  disabled: disabled || !vendorId,
  vendorId,
  dataIndex: 'sku',
}, {
  title: 'ITEM NAME',
  dataIndex: 'name',
}, {
  title: 'SUPPLIER SKU',
  dataIndex: 'supplierSku',
}, {
  title: 'UOM',
  dataIndex: 'uomName',
}, {
  title: 'AVAILABLE QTY',
  dataIndex: 'availableQty',
}, {
  title: 'PRICE',
  dataIndex: 'price',
  render: (text, record) => record.price && `$${record.price}`
}, {
  title: 'ORDER QTY',
  type: 'number',
  disabled: disabled || !vendorId,
  dataIndex: 'qty',
}, {
  title: 'DISCOUNT',
  type: 'number',
  disabled: disabled || !vendorId,
  formatter: percentageFormatter,
  parser: percentageParser,
  dataIndex: 'discount',
}, {
  title: 'TAX',
  dataIndex: 'tax',
  render: (text, record) => record.tax && `$${record.tax}`
}, {
  title: 'TOTAL',
  dataIndex: 'total',
  render: (text, record) => record.price && (`$${(((record.qty * record.price) - ((record.qty * record.price) * (record.discount / 100))) + record.tax).toFixed(2)}`)
}, {
  type: 'deleteIconColumn',
  allRowsCanBeDeleted: !disabled
}];

export const getButtonsByStatus = (status, saveHandler, updateHandler) => {
  switch (status.toLowerCase()) {
    case 'not saved':
      return {
        saveButtonVisible: true,
        saveButtonText: 'Authorize',
        saveButtonHandler: formData => saveHandler(formData, 'authorize'),
        updateButtonVisible: true,
        updateButtonText: 'Save as Draft',
        updateButtonHandler: formData => saveHandler(formData, 'draft'),
        cancelButtonVisible: false
      };
    case 'draft':
      return {
        saveButtonVisible: true,
        saveButtonText: 'Authorize',
        saveButtonHandler: formData => updateHandler(formData, 'authorize'),
        updateButtonVisible: true,
        updateButtonText: 'Save',
        updateButtonHandler: formData => updateHandler(formData, 'draft'),
        cancelButtonVisible: false
      };
    case 'authorized':
      return {
        saveButtonVisible: true,
        saveButtonText: 'Approve',
        saveButtonHandler: formData => updateHandler(formData, 'approve'),
        updateButtonVisible: false,
        cancelButtonVisible: true,
        cancelButtonText: 'Reject',
        cancelButtonHandler: formData => updateHandler(formData, 'reject')
      };
    case 'approved':
      return {
        saveButtonVisible: true,
        saveButtonText: 'Release',
        saveButtonHandler: formData => updateHandler(formData, 'release'),
        updateButtonVisible: false,
        cancelButtonVisible: false
      };
    case 'released':
    case 'partial received':
      return {
        saveButtonVisible: false,
        updateButtonVisible: false,
        cancelButtonVisible: true,
        cancelButtonText: 'Cancel',
        cancelButtonHandler: formData => updateHandler(formData, 'cancel')
      };
    default:
      return {
        saveButtonVisible: false,
        updateButtonVisible: false,
        cancelButtonVisible: false
      };
  }
};

export const prepareOrder = (formData, operation) => ({
  billToCompany: {
    id: formData.billToCompany.id,
    addressId: formData.billToCompany.address && formData.billToCompany.address.id,
  },
  shipToCompany: {
    id: formData.shipToCompany.id,
    addressId: formData.shipToCompany.address && formData.shipToCompany.address.id,
  },
  vendor: {
    id: formData.vendor.id,
    locationId: formData.vendor.address && formData.vendor.address.id
  },
  id: formData.id && formData.id,
  deliveryDate: formData.deliveryDate,
  operation,
  contactUserId: Number(formData.contactUser.id),
  shippingMethodId: Number(formData.deliveryMethod.id),
  paymentTermsId: Number(formData.paymentTerms.id),
  details: formData.details.map(skuDetail => ({
    sku: skuDetail.sku,
    qty: Number(skuDetail.qty),
    discount: Number(skuDetail.discount),
  })),
  vendorNotes: formData.vendorNotes,
  internalNotes: formData.internalNotes,
  shipping: Number(formData.shipping),
  adjustment: Number(formData.adjustment)
});

export const prepareOrderForRelease = values => ({
  id: values.id,
  email: values.email,
  subject: values.subject,
  message: values.message,
  operation: 'release'
});
