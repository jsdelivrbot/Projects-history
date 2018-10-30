import * as API from '../../Functions/Networking/API/API.jsx'
import {handlers} from '../../Pages/Backtester/Functions/Backtest'

export let Backtester = {
  state (value) {
    return {
      state: { Backtester: value }
    }
  },

  Events: {
    'Backtest.Progress' (data) {
      handlers.progressUpdate(JSON.parse(data))
      return {}
    },

    'Backtest.Exception' (data) {
      handlers.exceptionUpdate(JSON.parse(data))
      return {}
    },

    'Backtest.ChartData' (data) {
      handlers.chartDataUpdate(JSON.parse(data))
      return {}
    },

    'Backtest.Logging' (data) {
      handlers.loggingUpdate(JSON.parse(data))
      return {}
    }
  },

  StartLiveTrading: {
    load () {
      return {
        ...Backtester.state({
          startLiveTrading: {
            messages: [],
            value: {
              AgentName: '',
              AccountID: '',
              PortfolioID: '',
              Start: false,
            },
            selects: {
              accounts: []
            }
          }
        }),
        ajax: [[
          API.LiveTrading.Accounts.brokerAccounts, {},
          Backtester.StartLiveTrading._load
        ]]
      }
    },

    _load: {
      success (accounts) {
        return {
          ...Backtester.state({
            startLiveTrading: {
              selects: { accounts }
            }
          })
        }
      },
      error () {
        console.log('Start Live Trading: Fetching accounts error')
        return {}
      }
    }
  }
}
