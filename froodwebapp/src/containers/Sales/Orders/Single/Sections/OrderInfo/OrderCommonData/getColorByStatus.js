const colorsByStatus = [{
  color: '#34A5DA',
  status: 'Draft',
}, {
  color: '#4C8945',
  status: 'Confirmed'
}, {
  color: '#838787',
  status: 'Backorder'
}, {
  color: '#F96928',
  status: 'Allocated'
}, {
  color: '#FF9300',
  status: 'PartialAllocated'
}, {
  color: '#0096FF',
  status: 'PickProgress'
}, {
  color: '#0433FF',
  status: 'Picked'
}, {
  color: '#9437FF',
  status: 'PackProgress'
}, {
  color: '#FF2F92',
  status: 'Packed'
}, {
  color: '#FF7E79',
  status: 'Shipped'
}, {
  color: '#000000',
  status: 'Delivered'
}, {
  color: '#C0C0C0',
  status: 'Invoiced'
}, {
  color: '#929292',
  status: 'PaymentProgress'
}, {
  color: '#5E5E5E',
  status: 'Paid'
}, {
  color: '#FF2600',
  status: 'FailedPayment'
}];

export default (status) => {
  const colorItem = colorsByStatus.find(item => item.status.toLowerCase() === status.toLowerCase());

  return colorItem ? colorItem.color : 'black';
};
