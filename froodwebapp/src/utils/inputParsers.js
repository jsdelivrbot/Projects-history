/* eslint-disable import/prefer-default-export */

export const moneyParser = value => value.replace(/\$\s?|(,*)/g, '');

export const percentageParser = value => (value.replace('%', ''));
