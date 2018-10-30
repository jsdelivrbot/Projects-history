export const handleFormatterHelper = (value, type) => {
  let newValue = value;
  if (type === 3) {
    newValue = `${value}%`;
  } else if (type === 4) {
    newValue = `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return newValue;
};

export const handleParserHelper = (value, type) => {
  let newValue = value;
  if (type === 3) {
    newValue = value.replace('%', '');
  } else if (type === 4) {
    newValue = value.replace(/\$\s?|(,*)/g, '');
  }
  return newValue;
};

export const constants = {
  freeItem: 2,
  valueOff: 4,
  percentOff: 3,
  freeShipping: 8,
  itemBundle: 2,
  itemSku: 3,
  productCat: 5,
};
