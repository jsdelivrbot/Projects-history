// Method to differentiate taskType
const taskType = (item) => {
  let bgColor;
  if (item === 'UNCONFIRMED') {
    bgColor = '#C1272D';
  }
  else if (item === 'CONFIRMED') {
    bgColor = '#EFC700';
  }
  else if (item === 'FINISHED') {
    bgColor = '#7AB600';
  }
  return bgColor;
}

export default taskType;
