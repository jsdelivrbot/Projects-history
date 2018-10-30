import _ from 'lodash'
import moment from 'moment'

function portfolioUID (properties, alternatives) {
  return function generateUID (_value, alternative = false) {
    let value = Utils.deepExtend({}, _value)
    try {
      let items = alternative ? alternatives : properties
      let result = value.PortfolioID
      items.forEach(property => {
        if (!value[property]) throw ('UID Error: ' + property)
        result += '_' + value[property]
      })
      return result
    } catch (error) {
      if (!alternative) {
        return generateUID(value, true)
      } else {
        window.console.log(properties, alternatives, value)
        throw error
      }
    }
  }
}

let Utils = {
  deepExtendMultable (destination, source) {
    for (let property in source) {
      if (_.isPlainObject(source[property])) {
        destination[property] =
          _.isPlainObject(destination[property])
            ? destination[property]
            : {}

        Utils.deepExtendMultable(destination[property], source[property])
      }
      else {
        destination[property] = source[property]
      }
    }

    return destination
  },

  deepExtend (destination, source) {
    return Utils.deepExtendMultable(
      Utils.deepExtendMultable({}, destination), source)
  },

  UID: {
    account: portfolioUID(['AccountID']),
    agent: portfolioUID(['AgentID'], ['ID']),
    chart: portfolioUID(['AgentID', 'Name']),
    position: portfolioUID(['AgentID', 'Symbol']),
    pendingOrder: portfolioUID(['AgentID', 'ID']),
    order: portfolioUID(['AccountID', 'ID'])
  },

  /**
   * opportunity to transform the values
   * of the given object before returned
   * @name ITransform
   * @function
   * @param { * } value - original value
   * @param { string } key - original key
   * @param { * } value - the object being transformed
   * @returns { * } transformed value
   */
  /**
   * select values from object using
   * an array to order the result.
   *
   * @param { Object | Array<Object> } values
   * @param { Array<string> } keys
   * @param { ITransform } [transform]
   * @example
   *   let values = [{ a : 1, b : 2, c : 3, d : 4 }]
   *   let selects = [ 'c', 'a', 'd' ]
   *   let result = valuesOrdered (selects, values)
   *   result == [[ 3, 1, 4 ]]
   *   valuesOrdered ([ 'd', 'a' ], values[ 0 ]) == [ 4, 1 ]
   */
  valuesOrdered (keys, values, transform = _=>_) {
    return _.reduce(values,
      (rows, value) => rows.concat([
        keys.map(key =>
          transform(value[key], key, value))]), [])
  },

  currencyMap: {
    USD: '$',
    EUR: '€',
    JPY: '¥',
    GBP: '£',
    CHF: 'Fr.',
    PLN: 'zł.',
    AUD: '$A',
  },

  /**
   * turns currency code into currency symbol
   * @example
   *   currencySymbol('USD') == '$'
   */
  currencySymbol (code) {
    return Utils.currencyMap[code] || Utils.currencyMap['USD']
  },

  resolveCurrencySymbol (AccountID, { livetrading }) {
    return livetrading.management.view.currencies[AccountID] || '$'
  },

  /**
   *  attempt to run _function and
   *  return its value, if error is
   *  thrown _default is returned
   */
  _try (_function, _default) {
    if (typeof _function !== 'function') {
      [_function, _default] = [_default, _function]
    }
    try {
      return _function()
    } catch (e) {
      return _default
    }
  },

  getDate (timestamp) {
    return new Date(timestamp.includes('/')
      ? Number(timestamp.match(/[0-9]/g).join(''))
      : timestamp)
  },

  formatTime (timestamp, format = 'DD/MM/YYYY HH:mm:ss') {
    return moment(Utils.getDate(timestamp)).format(format)
  },

  formatDay (value) {
    return Utils.formatTime(value, 'DD/MM/YYYY')
  },

  timeFromNow (timestamp) {
    return moment.utc(Utils.getDate(timestamp)).fromNow()
  },

  /**
   * Array<any> -> Object<string, any>
   * @param values
   * @param idFunction
   * @returns {{}}
   */
  toMap (values = [], idFunction) {
    if (values.length == 0) return {}
    let result = {}
    for (let value of values) result[idFunction(value)] = value
    return result
  },

  secondsToTimestamp (totalSeconds) {
    if (typeof totalSeconds !== 'number') {
      throw new Error('totalSeconds should be a number')
    }

    let _hours = Math.floor(totalSeconds / 3600)
    totalSeconds %= 3600
    let _minutes = Math.floor(totalSeconds / 60)
    let _seconds = totalSeconds % 60

    // 24:0:0 -> 24:00:00
    let [hours, minutes, seconds] = Array(_hours, _minutes, _seconds)
      .map((time) => (String(time).length == 1 ? '0' + time : time))

    return hours + ':' + minutes + ':' + seconds
  },

  /**
   * creates string with code files parameters
   * @param template
   * @returns {string}
   */
  templateTooltipText (template) {
    return template.CodeFiles.reduce((result, CodeFile) => {
      return result + CodeFile.Parameters.reduce((result, parameter) => {
          return result + parameter.Name + ': ' + parameter.Value + '; '
        }, '')
    }, '')
  },

  /**
   * returns SharpeRation value calculated
   * from algorithm's ResulStatistics
   * @param algorithm
   * @returns {string}
   */
  algorithmSharpeRatio (algorithm) {
    return [for (t of algorithm.ResulStatistics)
      if (t.Name == 'SharpeRatio') t.Value.toFixed(4)]
  },

  /**
   * 2000 -> 2K
   * 200 -> 200
   * @param { number } value
   * @returns { string|number }
   */
  formatK (value) {
    return (value >= 1000
      ? (value / 1000) + 'K'
      : value)
  },

  formatNumberDecimals (number, decimals) {
    let regex = new RegExp(
      '^([0-9]*)(\.[0-9]{1,' + decimals + '})?.*$', "")

    return (number + "").replace(regex, "$1$2")
  },

  outputResponse (response, xhr, status, message) {
    window.console.log('\n')
    if (message) window.console.log(message)
    window.console.log('Result: ', response)
    window.console.log('XHR: ', xhr)
    window.console.log('Status: ', status)
    window.console.log('')
  },

  replacer (key, value)
  {
    if (typeof value == 'function') {
      return value.toString()
    } else {
      return value
    }
  },

  print (value)
  {
    console.log(JSON.stringify(value, Utils.replacer, 2))
  },

  urlParameters (url)
  {
    let parsed = (/\?.+/).exec(url)

    if (!parsed) return {}

    let result = {}
    let query = parsed[0].replace('?', '')

    query.split("&").forEach(part => {
      if (!part) return

      // replace every + with space, regexp-free version
      part = part.split("+").join(" ");

      let eq = part.indexOf("=")
      let key = eq > -1 ? part.substr(0, eq) : part
      let val = eq > -1 ? decodeURIComponent(part.substr(eq + 1)) : ""
      let from = key.indexOf("[")

      if (from == -1) {
        result[decodeURIComponent(key)] = val
      }
      else {
        let to = key.indexOf("]")
        let index = decodeURIComponent(key.substring(from + 1, to))

        key = decodeURIComponent(key.substring(0, from))

        if (!result[key]) result[key] = []

        if (!index) {
          result[key].push(val)
        }
        else {
          result[key][index] = val
        }
      }
    })

    return result
  },
}

export default Utils
