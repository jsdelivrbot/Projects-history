import moment from 'moment';
import { percentageFormatter, percentageParser } from 'utils';

export const columns = disabled => [{
  title: 'SKU',
  type: 'skuAutoComplete',
  disabled,
  dataIndex: 'sku',
}, {
  title: 'ITEM NAME',
  dataIndex: 'name',
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
  disabled,
  dataIndex: 'qty',
}, {
  title: 'DISCOUNT',
  type: 'number',
  disabled,
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
        saveButtonText: 'Confirm',
        saveButtonHandler: formData => saveHandler(formData, 'confirm'),
        updateButtonVisible: true,
        updateButtonText: 'Save as Draft',
        updateButtonHandler: formData => saveHandler(formData, 'draft'),
        cancelButtonVisible: false,
      };
    case 'draft':
      return {
        saveButtonVisible: true,
        saveButtonText: 'Confirm',
        saveButtonHandler: formData => updateHandler(formData, 'confirm'),
        updateButtonVisible: true,
        updateButtonText: 'Save',
        updateButtonHandler: formData => updateHandler(formData, 'draft'),
        cancelButtonVisible: false,
      };
    case 'confirmed':
    case 'backorder':
    case 'partialallocated':
    case 'allocated':
      return {
        saveButtonVisible: true,
        saveButtonText: 'Amend',
        saveButtonHandler: formData => updateHandler(formData, 'amend'),
        updateButtonVisible: false,
        cancelButtonVisible: true,
        cancelButtonText: 'Cancel',
        cancelButtonHandler: formData => updateHandler(formData, 'cancel'),
      };
    case 'shipped':
      return {
        saveButtonVisible: false,
        updateButtonVisible: true,
        updateButtonText: 'Return',
        updateButtonHandler: formData => saveHandler(formData, 'return'),
        cancelButtonVisible: false,
      };
    default:
      return {
        saveButtonVisible: false,
        updateButtonVisible: false,
        cancelButtonVisible: false,
      };
  }
};

export const prepareOrder = (formData, operation) => ({
  id: formData.id,
  addresses: {
    billingAddressId: formData.billingAddress.id,
    shippingAddressId: formData.shippingAddress.id
  },
  channelId: formData.channel.id,
  customerId: formData.customer.id,
  customerNotes: formData.customerNotes,
  deliveryDate: moment(formData.deliveryDate).format('DD-MMMM-YYYY'),
  deliveryMethodId: formData.deliveryMethodId,
  deliverySlotId: formData.deliverySlotId,
  operation,
  paymentTermsId: Number(formData.paymentTerms.id),
  promotionId: formData.promotion && formData.promotion.id,
  skuDetails: formData.skuDetails.map(skuDetail => ({
    id: skuDetail.id,
    sku: skuDetail.sku,
    qty: skuDetail.qty,
    discount: skuDetail.discount,
    deleted: skuDetail.deleted
  }))
});
