import {BacktesterState} from './BacktesterState'
import {State}           from '../../../State.jsx'

export let tabsId =
{
  StrategyDesign: 0,
  Code: 1,
  Backtest: 2
}

export let tabs =
  [
    { id: tabsId.StrategyDesign, title: 'Strategy Design' },
    { id: tabsId.Code, title: 'Code' },
    { id: tabsId.Backtest, title: 'Backtest' }
  ]

export function setTab (tabId) {
  BacktesterState({
    ui: {
      tabs: {
        activeTab: tabId
      }
    },
    startLiveTrading: {
      showButton: false
    }
  })
}

export function isActiveTab (tabId, classReturn) {
  let { activeTab } = State.getState()
    .Backtester
    .ui.tabs

  if (activeTab == tabId) {
    return classReturn || true
  }
  else {
    return false
  }
}
