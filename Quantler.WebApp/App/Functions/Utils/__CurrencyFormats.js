import {asCurrency} from './CurrencyFormats.jsx'

describe('Currency formatting', () => {
  it('formats integers and decimals', () => {
    let tests = [
      [['USD', 12], '$12.00'],
      [['USD', 12.00], '$12.00'],
      [['USD', -12.00], '-$12.00'],
      [['USD', -12], '-$12.00'],
      [['USD', 120000.00], '$120,000.00'],
      [['EUR', 12.00], '€12,00'],
      [['EUR', 12], '€12,00'],
      [['JPY', 12], '¥12'],
      [['JPY', 12.01], '¥12'],
      [['JPY', -12], '-¥12'],
      [['JPY', 12000000], '¥12,000,000'],
      [['JPY', -12000000000], '-¥12000,000,000'],
      [['AUD', 5000015.44], 'AU$5,000,015.44'],
    ]
    tests.forEach(test =>
      expect(asCurrency.apply({}, test[0])).toEqual(test[1]))
  })
})
