import _ from 'lodash'

let Backtester =
{
  // used for Global
  // Settings selectors
  // not the strategy!
  assetTypes: [],
  symbols: [],
  samples: [],
  // used for knowing which
  // template to show settings
  activeTemplateId: null,
  // for code editor
  activeCodeFileName: null,
  // used for Strategy Design
  templates: [],
  templatesOriginal: [],
  strategy: {
    templateTypes: {
      'Entry': {
        max: 3,
        current: 0
      },
      'Money Management': {
        max: 1,
        current: 0
      },
      'Risk Management': {
        max: 1,
        current: 0
      },
      'Exit': {
        max: 3,
        current: 0
      }
    },
    templateIds: [],
    globalSettings: {
      Samples: {},
      Settings: {
        DefaultTimeframe: '01:00:00',
        UseTickData: false,
        Slippage: 0.1,
        Spread: 0.0,
        LatencyMS: 2,
        Commission: 4.00,
        IsCustom: true,
        InitialBalance: 10000,
        Leverage: 100,
      }
    },

    // previous loaded/run backtest
    templateIdsCurrentTest: [],
    templatesCurrentTest: []
  },
  backtest: {
    previousTests: [],
    currentTest: {
      id: null,
      data: {
        chartData: {
          equity: null,
          drawdown: null
        },
        performance: null,
        trades: null
      },
      strategy: null,
      templates: null,
      exceptions: [],
      settings: {}
    },
    comparedData: {
      performance: {
        summary: null,
        tradingPeriod: null,
        trades: null
      }
    },
    runningBacktest: {
      // if a backtest is running
      active: false,
      // returned from runBacktest()
      returnData: {
        IsSuccess: null, // boolean
        Exceptions: [],   // any[]
        Activitystreamid: null, // string
        SystemID: null, // number
        Streamauth: null  // any
      }
    },
    // if a beacktest API request
    // has been sent, used eg: for
    // disabling Run Backtest btn
    backtestRequested: false,
    // the Backtest tab to know if it
    // should run a backtest or not.
    // used eg: for rendering social
    // paument timer before running.
    runBacktest: false,
    // configurations for alert
    // messages shown at top
    alerts: {
      runBacktestTimer: {
        active: false,
        time: 0,
        totalTime: 0,
        callback: () => {}
      }
    }
  },
  // deprecated: new pusher setup
  // pusherData :
  // {
  //     subscriptions :
  //     {
  //         backtest : []
  //     }
  // },
  ui: {
    tabs: {
      activeTab: 0
    },
    progressBar: {
      active: false,
      text: '',
      value: 0
    },
    rightSidebarView: "globalSettings"
  },
  startLiveTrading: {
    processing: false,
    showButton: true,
    //
    // type: 'info' | 'error'
    // { type: '', message: '' }
    messages: [],
    selects: {
      accounts: []
    },
    value: {
      AgentName: '',
      AccountID: '',
      PortfolioID: '',
      Start: false,
    }
  },
}

module.exports = {
  get BacktesterObject () {
    return Object.deepExtend({}, Backtester)
  }
}
