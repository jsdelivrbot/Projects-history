// Method to differentiate taskType
const taskType = (item) => {
  let bgColor;
  if (item === 'UNCONFIRMED') {
    bgColor = '#EA1F24';
  }
  else if (item === 'CONFIRMED') {
    bgColor = '#F8AD3A';
  }
  else if (item === 'FINISHED') {
    bgColor = '#8AC341';
  }
  return bgColor;
}

export default taskType;
