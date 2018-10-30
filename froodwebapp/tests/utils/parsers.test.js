import { percentageParser } from 'utils';

const { describe, it, expect } = global;

describe('inputNumberParser', () => {
  it('returns input without % character type of string', () => {
    const value = '17%';
    const result = '17';

    expect(percentageParser(value)).toBe(result);
  });
});
