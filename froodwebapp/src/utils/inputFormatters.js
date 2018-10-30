/* eslint-disable import/prefer-default-export */
export const percentageFormatter = value => `${value}%`;

const usdFormatter = value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const getFormatterByCurrency = (currency) => {
  switch (currency) {
    case 'USD':
      return usdFormatter;
    default:
      return usdFormatter;
  }
};
