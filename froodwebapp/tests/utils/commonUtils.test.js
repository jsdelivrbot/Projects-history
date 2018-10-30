import {
  addParamsToURL,
  checkNegative,
  toFixed2,
  getRandomId
} from 'utils';

const { describe, it, expect } = global;

describe('addParamsToURL', () => {
  const filter = { orderNo: '25', id: 10 };

  it('returns url type of string ', () => {
    const urlBefore = 'sales/{orderNo}/{id}';
    const urlAfter = 'sales/25/10';

    expect(addParamsToURL(filter, urlBefore)).toBe(urlAfter);
  });

  it('returns url with query type of string', () => {
    const urlBeforeWithQuery = 'sales?orderNo={orderNo}&id={id}';
    const urlAfterWithQuery = 'sales?orderNo=25&id=10';

    expect(addParamsToURL(filter, urlBeforeWithQuery)).toBe(urlAfterWithQuery);
  });
});

describe('checkNegative', () => {
  it('returns 0, if input number is negative', () => {
    const negativeNumber = -4;
    const negativeNumberResult = 0;

    expect(checkNegative(negativeNumber)).toBe(negativeNumberResult);
  });

  it('returns true, if number is positive', () => {
    const positiveNumber = 8;
    const positiveNumberResult = 8;

    expect(checkNegative(positiveNumber)).toBe(positiveNumberResult);
  });
});

describe('toFixed2', () => {
  it('returns input type of number as string', () => {
    const numberBefore = 14;
    const result = '14.00';

    expect(toFixed2(numberBefore)).toBe(result);
  });
});

describe('getRandomId', () => {
  it('returns true value', () => {
    expect(getRandomId()).toBeTruthy();
  });
});
