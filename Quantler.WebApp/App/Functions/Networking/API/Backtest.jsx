import {API, CodeGen} from './Main.jsx'

export let BacktestAPI =
{
  get: url => API.get('backtest/' + url),
  post: (url, data) => API.post('backtest/' + url, data),
  put: (url, data) => API.put('backtest/' + url, data)
}

export function getTemplates ({ backtestId }) {
  return BacktestAPI.get(backtestId + '/templates')
}

export function getSamples ({ backtestId }) {
  return BacktestAPI.get(backtestId + '/samples')
}

export function getPerformance ({ backtestId }) {
  return BacktestAPI
    .get(backtestId + '/result/statistics/?DataType=Performance')
}

export function getTrades ({ backtestId, page }) {
  return BacktestAPI
    .get(backtestId
      + '/result/trades/'
      + '?page=' + (page || 1)
      + '&pagesize=10'
      + '&sorting=id'
      + '&sortdirection=asc')
}

export function getChartData ({ backtestId, chartType }) {
  return BacktestAPI
    .get(backtestId + '/result/chartdata/?ChartType=' + chartType)
}

export function getSettings ({ backtestId }) {
  return BacktestAPI.get(backtestId)
}
