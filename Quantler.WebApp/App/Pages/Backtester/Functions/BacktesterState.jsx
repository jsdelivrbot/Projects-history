import {State} from '../../../State.jsx'

export function BacktesterState (content) {
  if (typeof content == 'undefined') {
    return State.getState().Backtester
  }

  State.setState({
    Backtester: content
  })
}

export let backtester = state => ({ state: { Backtester: state } })
