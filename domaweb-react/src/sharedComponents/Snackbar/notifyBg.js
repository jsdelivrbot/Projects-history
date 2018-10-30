// Method to differentiate notification type
const notifyBg = (notificationtype) => {
  let bgColor;
  if (notificationtype === 'error') {
    bgColor = '#E85742';
  }
  else if (notificationtype === 'info') {
    bgColor = '#4990E2';
  }
  else if (notificationtype === 'success') {
    bgColor = '#55CA92';
  }
  else if (notificationtype === 'warning') {
    bgColor = '#F5E273';
  }
  return bgColor;
}

export default notifyBg;
