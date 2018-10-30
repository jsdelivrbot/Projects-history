const colorsByStatus = [{
  code: '#34A5DA',
  status: 'Draft',
}, {
  code: '#f9f77a',
  status: 'Authorized'
}, {
  code: '#c9ff6d',
  status: 'Approved'
}, {
  code: '#7dba16',
  status: 'Released'
}, {
  code: '#1616ba',
  status: 'Amended'
}, {
  code: '#e29014',
  status: 'Received'
}, {
  code: '#ff0000',
  status: 'Cancelled'
}, {
  code: '#000000',
  status: 'Closed'
}];

export default (status) => {
  const color = colorsByStatus.find(item => item.status === status);

  return color ? color.code : 'black';
};
