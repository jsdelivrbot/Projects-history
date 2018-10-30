import {API} from './Main.jsx'

export default
{
  getHistory ({ pageSize, page, sorting, sortingDirection, excludeManual, excludeAutoDiscovery }) {
    let sortingQuery = ''
      + (!sorting ? '' : `&sorting=${sorting}`)
      + (!sortingDirection ? '' : `&direction=${sortingDirection}`)

    return API.get(
      'backtest/history/?'
      + 'pagesize=' + (pageSize || 10)
      + '&page=' + (page || 1)
      + '&excludemanual=' + (excludeManual)
      + '&excludeautodiscovery=' + (excludeAutoDiscovery)
      + sortingQuery)
  },
}
