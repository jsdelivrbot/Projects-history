import _ from 'lodash'
import Utils from '../../../Functions/Utils/Utils.jsx'
import {keyframes} from 'radium'
import {asCurrency} from'../../../Functions/Utils/CurrencyFormats.jsx'
import {Colors} from '../../Utils/GlobalStyles.jsx'

let Shared = {
  formatCurrency (value, account) {
    return asCurrency(account.AccountCurrency || account.Currency, value)
  },

  formatPercentage (value) {
    return value + '%'
  },

  cell (value, item, key) {
    return (
      <span item={ item } key={ key }>
        { value }
      </span>
    )
  },

  fades: {
    'positive': keyframes({
      '0%': { background: 'transparent' },
      '25%': { background: 'rgba(160, 211, 104, 0.8)' },
      '75%': { background: 'rgba(160, 211, 104, 0.8)' },
      '100%': { background: 'transparent' },
    }, 'fadepositive'),
    'negative': keyframes({
      '0%': { background: 'transparent' },
      '25%': { background: 'rgba(241, 90, 107, 0.8)' },
      '75%': { background: 'rgba(241, 90, 107, 0.8)' },
      '100%': { background: 'transparent' },
    }, 'fadenegative'),
    'neutral': ''
  },

  cellClass: _.uniqueId('_'),

  cellColorTransform (cell, item, items) {
    let change = _.get(items[0].props.item, `changes[${item.key}]`, false)

    if (change) {
      return cell({
        className: Shared.cellClass + change,
        style: {
          animation: 'fadeGreen 2s',
          animationName: Shared.fades[change]
        }
      })
    } else {
      return cell()
    }
  },

  transformer (matcher, defaultFunction) {
    return (value, key, item) => {
      return Utils._try(_=> matcher[key](value, item, key),
        defaultFunction ? defaultFunction(value, item, key) : value)
    }
  },

  formatCurrencyCell (value, account, key) {
    return Shared.cell(Shared.formatCurrency(value, account), account, key)
  },

  formatPercentageCell (value, account, key) {
    return Shared.cell(Shared.formatPercentage(value), account, key)
  },

  Quotation ({ data }) {
    let quotationPositive = false

    let quotation = Utils._try(() => {
      let length = data.length

      quotationPositive = (data[length - 1][1] > data[length - 2][1])

      return (data[length - 1][1] - data[length - 2][1]).toFixed(2)
    }, _.last(data)[1] || 0)

    let quotationColor = quotationPositive ? Colors.green : Colors.guava
    let quotationValue = (quotationPositive
      ? '+' + quotation
      : '-' + quotation)

    return (
      <span
        style={{
          color: quotationColor,
          fontSize: 12
        }}>
        {'(' + quotationValue + ')'}
      </span>
    )
  }
}

export default Shared
