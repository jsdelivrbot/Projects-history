import {BacktesterState}  from './BacktesterState.jsx'
import {pusher}           from '../../../Functions/Networking/Pusher.jsx'
import {CodeGen}          from '../../../Functions/Networking/API/Main.jsx'
import * as API             from '../../../Functions/Networking/API/API.jsx'
import {BacktesterObject} from '../../../State/Backtester.jsx'
import * as Notification    from '../../../Functions/UI/Notification.jsx'
import * as BacktestAPI     from '../../../Functions/Networking/API/Backtest.jsx'
import * as Utils           from './Utils.jsx'
import _                    from 'lodash'
import moment               from 'moment'
import {handler}          from '../../../Functions/Interface/Interface.jsx'
import {State} from '../../../State.jsx'
import {secondsToTimestamp} from '../../../Functions/Utils/Utils.jsx'

//                                                       Configs

let statisticGroups = {
  // Here type  = the name from the API
  // Here pText = the name as public text (shown in the ui)
  // Order = the order in which these values will be presented
  summary: [
    { Name: 'InitialCapital', pText: 'Initial Balance', Order: 1, pType: '$' },
    { Name: 'Balance', pText: 'Ending Balance', Order: 2, pType: '$' },
    { Name: 'GrossPL', pText: 'Gross PL', Order: 3, pType: '$' },
    { Name: 'NetPL', pText: 'Net PL', Order: 4, pType: '$' },
    { Name: 'ROI', pText: 'ROI', Order: 5, pType: '%' },
    { Name: 'Commissions', pText: 'Commissions', Order: 6, pType: '$' },
    { Name: 'MaxDDPortfolio', pText: 'Max Drawdown', Order: 7, pType: '%' },
    { Name: 'SharpeRatio', pText: 'Sharpe Ratio', Order: 8, pType: '' },
    { Name: 'SortinoRatio', pText: 'Sortino Ratio', Order: 9, pType: '' }
  ],
  tradingPeriod: [
    { Name: 'DaysTraded', pText: 'Days Traded', Order: 1, pType: '' },
    { Name: 'MaxPL', pText: 'Highest PnL (Trade)', Order: 2, pType: '$' },
    { Name: 'MinPL', pText: 'Lowest PnL (Trade)', Order: 3, pType: '$' },
    { Name: 'SymbolCount', pText: 'Symbols Traded', Order: 4, pType: '' },
    { Name: 'RoundTurns', pText: 'Trades', Order: 5, pType: '' },
    { Name: 'Trades', pText: 'Fills', Order: 6, pType: '' },
    { Name: 'RoundWinners', pText: 'Winning Trades', Order: 7, pType: '' },
    { Name: 'RoundLosers', pText: 'Losing Trades', Order: 8, pType: '' },
    { Name: 'ConsecWin', pText: 'Consecutive Wins', Order: 9, pType: '' },
    { Name: 'ConsecLose', pText: 'Consecutive Loses', Order: 10, pType: '' }
  ],
  trades: [
    { Name: 'BuyPL', pText: 'Buy PnL', Order: 1, pType: '$' },
    { Name: 'SellPL', pText: 'Sell PnL', Order: 2, pType: '$' },
    { Name: 'BuyWins', pText: 'Buy Wins', Order: 3, pType: '' },
    { Name: 'BuyLosers', pText: 'Buy Losers', Order: 4, pType: '' },
    { Name: 'SellWins', pText: 'Sell Wins', Order: 5, pType: '' },
    { Name: 'SellLosers', pText: 'Sell Losers', Order: 6, pType: '' },
    { Name: 'WLRatio', pText: 'WinLoss Ratio', Order: 7, pType: '' },
    { Name: 'ComPerShare', pText: 'Commission per share', Order: 8, pType: '$' },
    { Name: 'AvgPerTrade', pText: 'Avg. Per Trade', Order: 9, pType: '$' },
    { Name: 'AvgWin', pText: 'Avg. Winning Trade', Order: 10, pType: '$' },
    { Name: 'AvgLoser', pText: 'Avg. Losing Trade', Order: 11, pType: '$' }
  ]
}

//                                                         Utils

// for parsing JSON data sent from Pusher events
let jsonParseTo = _.memoize(function (toFunc) {
  return function (data) {
    return toFunc(JSON.parse(data))
  }
})

function formattedRounding ({ value, type }) {
  switch (type) {
    case '$':
      return value.toFixed(2)
      break;
    case '%':
      return (value * 100).toFixed(2)
      break;
    default:
      return value
      break;
  }
}

function filterTestPerformance ({ test, statistic }) {
  let item = _.find(test.data.performance, { Name: statistic.Name })

  if (!item) {
    return 0
  } else {
    return item.Value
  }
}

function handleLoadError () {
  Notification.error({ title: 'Error loading previous test' })
}

function calculateDifference (current, previous, type) {
  switch (type) {
    case '%':
      return ((current  * 100) - (previous * 100))
    default:
      return (current - previous)
  }
}

function reducePerformance ({ reducedObject, statistic }) {
  // reducedObject:
  //     summary       : []
  //     tradingPeriod : []
  //     trades        : []
  // .deepExtend for immutability of the reducedObject
  let updatedReducedObject = Object.deepExtend({}, reducedObject)
  let previousTest = Utils.previousTest()

  // Check if there is a prev. value
  let previousValue = (previousTest
    ? filterTestPerformance({ test: previousTest, statistic })
    : 0 )

  // Calculate percentage difference
  let percentage = (previousValue != 0 || previousValue != statistic.Value
    ? Number((( Math.abs(statistic.Value - previousValue) / statistic.Value ) * 100 ).toFixed(2))
    : 0 )

  // Format Initial result object
  let formattedStatistic = {
    name: statistic.Name,
    currentTest: statistic.Value,
    pText: statistic.Name,
    pType: statistic.pType,
    isMaximization: statistic.IsMaximization,
    Order: 1,
    previousTest: previousValue,
    difference: {
      percentage: Math.abs(percentage)
    }
  }

  // Loop through all statistic groups
  _.forEach(statisticGroups, (statistics, group) => {
    let _statistic = _.find(statistics, { Name: statistic.Name })

    // Find out if our statistic item is present in this group
    if (!!_statistic) {
      let pType = formattedStatistic.pType || _statistic.pType
      formattedStatistic = Object.deepExtend(formattedStatistic,
        {
          pText: _statistic.pText,
          pType: _statistic.pType,
          Order: _statistic.Order,
          difference: {
            value: calculateDifference(statistic.Value, previousValue, pType).toFixed(2),
          },
          currentTest: formattedRounding({
            value: formattedStatistic.currentTest,
            type: pType
          }),
          previousTest: formattedRounding({
            value: formattedStatistic.previousTest,
            type: pType
          })
        })

      updatedReducedObject[group].push(formattedStatistic)

      // Stop searching
      return false
    }
  })

  return updatedReducedObject
}

function compareTests () {
  let { performance } = BacktesterState().backtest.currentTest.data

  let reducedObject = {
    summary: [],
    tradingPeriod: [],
    trades: []
  }

  if (performance) {
    reducedObject = performance.reduce(
      (reducedObject, statistic) =>
        reducePerformance({ reducedObject, statistic }),
      reducedObject)
  }

  BacktesterState({
    backtest: {
      comparedData: {
        performance: reducedObject
      }
    }
  })
}

function backupCurrentTest () {
  let { previousTests, currentTest } = BacktesterState().backtest

  if (currentTest.id && currentTest.exceptions.length == 0) {
    BacktesterState({
      backtest: {
        previousTests: previousTests.concat(currentTest)
      }
    })
  }
}

function updateCurrentTest (content) {
  BacktesterState({
    backtest: {
      currentTest: content
    }
  })
}

function clearCurrentTest () {
  BacktesterState({
    backtest: {
      currentTest: BacktesterObject.backtest.currentTest,
      comparedData: BacktesterObject.backtest.comparedData,
      runningBacktest: BacktesterObject.backtest.runningBacktest,
    }
  })
}

function clearRunningBacktest () {
  BacktesterState({
    backtest: {
      runningBacktest: BacktesterObject.backtest.runningBacktest
    }
  })
}

function updatedTemplateTypes ({ templates }) {
  return templates.reduce(
    (templateTypes, template) => Object.deepExtend(templateTypes, {

      [template.Type]: {
        current: templateTypes[template.Type].current + 1
      }

    }), BacktesterObject.strategy.templateTypes)
}

//                                              Backtest Loading

export function loadPreviousTest () {
  Notification.success({ title: 'Loading Previous Test' })

  let { previousTests } = BacktesterState().backtest

  if (previousTests.length > 0) {
    clearCurrentTest()

    let previousTest = _.last(previousTests)

    let updatedTypes = updatedTemplateTypes({ templates: previousTest.templates })

    BacktesterState({
      strategy: {
        templateTypes: updatedTypes,
        templateIds: [],
        globalSettings: previousTest.globalSettings,
        templateIdsCurrentTest: previousTest.strategy.templateIds,
        templatesCurrentTest: previousTest.templates
      },
      backtest: {
        currentTest: previousTest,
        // update previousTests without last element
        previousTests: previousTests.slice(0, -1)
      }
    })

    afterLoadingTest()
  }
}

function afterLoadingTest () {
  let { id } = BacktesterState().backtest.currentTest

  window.location.replace(
    // remove any previous id from url and set previous test id
    window.location.hash.replace(/[0-9]/g, '') + id)

  compareTests()
}

export function loadTest ({ backtestId, dontClear }) {
  if (!dontClear) {
    backupCurrentTest()
    clearCurrentTest()
    updateCurrentTest({ id: Number(backtestId) })
  }

  let ajaxCount = 1

  function afterAjax () {
    if (ajaxCount++ == ajaxActions.length) {
      compareTests()
    }
  }

  Notification.success({ title: "Loading Backtest : " + backtestId })

  let ajaxActions =
    [
      BacktestAPI
        .getTemplates({ backtestId })
        .done(templates => {
          let templateIds = templates.map(template => template.ID)

          let updatedTypes = updatedTemplateTypes({ templates: templates })

          BacktesterState({
            strategy: {
              templateTypes: updatedTypes,
              templateIds: [],
              templateIdsCurrentTest: templateIds,
              templatesCurrentTest: templates
            },
            backtest: {
              currentTest: {
                templates: templates,
                strategy: {
                  templateIds: templateIds
                }
              }
            }
          })
        })
        .then(afterAjax)
        .fail(handleLoadError),

      BacktestAPI
        .getSamples({ backtestId })
        .done(samples => {
          updateCurrentTest({
            samples: samples
          })

          BacktesterState({
            strategy: {
              globalSettings: {
                Samples: samples[0]
              }
            },
            backtest: {
              currentTest: {
                globalSettings: {
                  Samples: samples[0]
                }
              }
            }
          })
        })
        .then(afterAjax)
        .fail(handleLoadError),

      BacktestAPI
        .getPerformance({ backtestId })
        .done(performance => {
          updateCurrentTest({
            data: {
              performance: performance
            }
          })
        })
        .then(afterAjax)
        .fail(handleLoadError),

      BacktestAPI
        .getTrades({ backtestId })
        .done(trades => {
          updateCurrentTest({
            data: {
              trades: trades
            }
          })
        })
        .then(afterAjax)
        .fail(handleLoadError),

      BacktestAPI
        .getChartData({ backtestId, chartType: 'equity' })
        .done(equity => {
          BacktestAPI
            .getChartData({ backtestId, chartType: 'drawdown' })
            .done(drawdown => {
              updateCurrentTest({
                data: {
                  chartData: {
                    equity, drawdown
                  }
                }
              })
            })
            .then(afterAjax)
            .fail(handleLoadError)
        })
        .then(afterAjax)
        .fail(handleLoadError),

      BacktestAPI
        .getSettings({ backtestId })
        .done((settings) => {
          updateCurrentTest({ settings })

          // to update timeframe and other
          // selected global settings
          let Settings = Object.assign({}, settings, {
            DefaultTimeframe: secondsToTimestamp(settings.Settings.DefaultTimeframe)
          })

          BacktesterState({
            strategy: {
              globalSettings: { Settings }
            },
            startLiveTrading: {
              showButton: true
            }
          })
        })
        .then(afterAjax)
        .fail(handleLoadError),
    ]
}

export function loadTrades ({ page }) {
  let { currentTest } = BacktesterState().backtest

  if (!currentTest.id) return undefined

  BacktestAPI
    .getTrades({
      backtestId: currentTest.id,
      page: page
    })
    .done(trades => {
      BacktesterState({
        backtest: {
          currentTest: {
            data: {
              trades: trades
            }
          }
        }
      })
    })
    .fail(handleLoadError)
}

//                                              Backtest Running

function prepareForBacktest () {
  let { UserID } = State.get().User.details
  let { templates, strategy, backtest } = BacktesterState()
  let { currentTest } = backtest
  let {
    templateIds,
    globalSettings,
    templateIdsCurrentTest,
    templatesCurrentTest
  } = strategy

  let templatesToRun = Utils.resolveViewTemplates()

  // if there are any templates from the previous
  // loaded/run backtest, check if it is not in the
  // current strategy, if not then add to templatesToRun
  if (templateIdsCurrentTest.length > 0) {
    templateIdsCurrentTest.forEach(templateId => {
      // if the template is already in the current
      // strategy then don't add it, because we want
      // to use the latest version of the template
      if (!_.find(templatesToRun, { ID: templateId })) {
        let template = _.find(templatesCurrentTest, { ID: templateId })

        if (template) templatesToRun.push(template)
      }
    })
  }

  if (currentTest.id != undefined) backupCurrentTest()

  clearCurrentTest()

  // that a backtest API request has been sent
  BacktesterState({
    backtest: {
      backtestRequested: true,
      runBacktest: false
    }
  })

  let DefaultTimeframe = (globalSettings.Settings.DefaultTimeframe
    ? moment.duration(globalSettings.Settings.DefaultTimeframe).asSeconds()
    : 3600)

  return {
    Templates: templatesToRun,
    Samples: globalSettings.Samples,
    Settings: Object.deepExtend(globalSettings.Settings, {
      DefaultTimeframe
    })
  }
}

export function runBacktest () {
  let postData = prepareForBacktest()

  clearRunningBacktest()

  CodeGen
    .post('Compiler/Compile/Run', postData)
    .fail(runFailCallback)
    .done(runBacktestCallback(postData))
}

let runFailCallback = () => {
  Notification.error({ title: 'Something went wrong running backtest' })

  BacktesterState({
    backtest: {
      runningBacktest: {
        active: false
      },
      backtestRequested: false
    }
  })
}

function runBacktestCallback (postData) {
  return function (backtestRunResult) {
    if (!!backtestRunResult.Exceptions.length || !backtestRunResult.IsSuccess) {
      if (backtestRunResult.Exceptions.length > 0) {
        Notification.error({ title: 'Error Running Backtest' })
      } else {
        Notification.error({ title: 'Internal Error Running Backtest' })
      }

      window.console.log('backtestRunResult: ', backtestRunResult)

      BacktesterState({
        backtest: {
          runningBacktest: {
            returnData: backtestRunResult,
            active: false
          },
          backtestRequested: false
        }
      })
    }
    else {
      let { strategy, backtest } = BacktesterState()

      BacktesterState({
        backtest: {
          currentTest: {
            id: backtestRunResult.SystemID,
            strategy: strategy,
            templates: postData.Templates,
            exceptions: [],
            globalSettings: strategy.globalSettings
          },
          runningBacktest: {
            active: true,
            returnData: backtestRunResult
          },
          backtestRequested: false,
        },
        ui: {
          progressBar: {
            active: true,
            value: 0,
            text: ""
          }
        }
      })

      Notification.success({ title: "Running Backtest" })

      // deprecated: new pusher setup
      /*subscribeTest({
       activetyStreamId : backtestRunResult.Activitystreamid
       })*/
    }
  }
}

// used in App/Functions/Backtester/Backtester.jsx
export let handlers = {
  progressUpdate (data)
  {
    // {
    //     "StartDTUTC"         : 20120101,
    //     "EndDTUTC"           : 20121231,
    //     "CurrentDTUTC"       : 20121213,
    //     "ProgressPercentage" : 95
    // }

    let { runningBacktest } = BacktesterState().backtest

    if (runningBacktest.active) {
      BacktesterState({
        ui: {
          progressBar: {
            active: true,
            value: Number(data.ProgressPercentage)
          }
        }
      })
    }
  },

  loggingUpdate (data)
  {
    let { runningBacktest, currentTest } = BacktesterState().backtest

    if (runningBacktest.active) {
      BacktesterState({
        ui: {
          progressBar: {
            active: true,
            text: data.Message
          }
        }
      })

      if (data.Message == "Finished!") {
        BacktesterState({
          ui: {
            progressBar: {
              active: false
            }
          },
          backtest: {
            runningBacktest: {
              active: false
            }
          }
        })

        loadTest({
          backtestId: currentTest.id,
          dontClear: true
        })
      }
    }
  },

  chartDataUpdate (data)
  {
    let { runningBacktest, currentTest } = BacktesterState().backtest

    if (runningBacktest.active) {
      let equity = currentTest.data.chartData.equity || {
          Datapoints: [],
          Datatype: 'equity'
        }

      let drawdown = currentTest.data.chartData.drawdown || {
          Datapoints: [],
          Datatype: 'drawdown'
        }

      equity.Datapoints = equity.Datapoints.concat(data.equity)
      drawdown.Datapoints = drawdown.Datapoints.concat(data.drawdown)

      BacktesterState({
        backtest: {
          currentTest: {
            data: {
              chartData: { equity, drawdown }
            }
          }
        }
      })
    }
  },

  exceptionUpdate (data)
  {
    let { runningBacktest } = BacktesterState().backtest

    // unsubscribePreviousTests()

    window.console.log('Backtest Exception', data.Exception, '\n')

    if (runningBacktest.active) {
      Notification.error({ title: 'Backtest Exception' })

      BacktesterState({
        backtest: {
          runningBacktest: {
            active: false,
          },
          currentTest: {
            exceptions: BacktesterState()
              .backtest.currentTest.exceptions.concat(data.Exception)
          }
        },
        ui: {
          progressBar: {
            active: false
          }
        }
      })
    }
  }
}

//                                            Start Live Trading

// modal state value update
export function startLiveTradingValue (property, value) {

  window.console.log('\nUPDATING FORM VALUE')
  window.console.log(property, value)

  BacktesterState({
    startLiveTrading: {
      value: { [property]: value }
    }
  })
}

//
// if backtest is successful than it may be
// added as an agent to a live trading account
//
export function startLiveTrading (AgentID) {
  let { backtest, startLiveTrading } = BacktesterState()
  let { currentTest } = backtest

  let agent = Object
    .deepExtend(startLiveTrading, { AccountID: currentTest.ID })

  API.LiveTrading.Management
    .addAgent(agent)
    .then(addAgentCallback)
}

function addAgentCallback (agent) {
  if (!agent) {
    // error
  } else {
    // success
    BacktesterState({})
  }
}
