import {connect}         from '../../../State.jsx'
import {BacktesterState} from '../Functions/BacktesterState.jsx'

function RunBacktestTimerComponent ({ runBacktestTimer }) {
  let { active, time, totalTime, callback } = runBacktestTimer

  if (active) {
    if (time < totalTime) {
      setTimeout(() => {
          BacktesterState({
            backtest: {
              alerts: {
                runBacktestTimer: {
                  time: time + 1000
                }
              }
            }
          })
        }
        , 1000)
    }
    else {
      callback()

      BacktesterState({
        backtest: {
          alerts: {
            runBacktestTimer: {
              active: false,
              time: 0
            }
          }
        }
      })
    }
  }

  return <div></div>
}

export let RunBacktestTimer = connect(state =>
  ({
    runBacktestTimer: state.Backtester.backtest.alerts.runBacktestTimer
  })
)(RunBacktestTimerComponent)
