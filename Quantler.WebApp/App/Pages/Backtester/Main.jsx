import {}                   from './dashboard.scss'
import {Component}        from 'react'
import {Content}          from './Content/Content.jsx'
import {BacktesterState}  from './Functions/BacktesterState.jsx'
import {BacktesterObject} from '../../State/Backtester.jsx'
import {connect}          from '../../State.jsx'
import * as Notification    from '../../Functions/UI/Notification.jsx'
import * as TabsFn          from './Functions/Tabs.jsx'
import * as BacktestFn      from './Functions/Backtest.jsx'
import * as StrategyFn      from './Functions/Strategy.jsx'
import * as Loaders         from './Functions/Loaders.jsx'
import _                    from 'lodash'
import Functions from '../../Functions/Functions.jsx'
import {CodeGen} from '../../Functions/Networking/API/Main.jsx'
import VideoButton from '../../Components/Utils/VideoButton.jsx'
import { MainButton } from '../../Components/Buttons/MainButton.jsx'

export function handleRunBacktest () {
  Functions.Shell.hitFeature('Run Backtest')

  let currentStrategy = BacktesterState().strategy

  BacktesterState({
    ui: { rightSidebarView: "globalSettings" }
  })

  if (currentStrategy.templateIds.length > 0
    || currentStrategy.templateIdsCurrentTest.length > 0) {
    if (currentStrategy.globalSettings.Samples.ID) {
      TabsFn.setTab(TabsFn.tabsId.Backtest)

      BacktesterState({
        backtest: { runBacktest: true },
        startLiveTrading: { showButton: false }
      })
    } else {
      Notification.error({ title: 'No Sample Selected' })
    }
  } else {
    Notification.error({ title: 'No strategy template selected' })
  }
}

@connect(state => ({
  runningBacktest: state.Backtester.backtest.runningBacktest,
  backtestRequested: state.Backtester.backtest.backtestRequested
}))
class Header extends Component {
  generateAlgorithm () {
    $('.loadingbar').removeClass('hide')

    Notification.success({ title: 'Generating Algorithm' })

    Functions.Shell.hitFeature('Generate Algorithm')

    CodeGen.get('random/generate').then(templates => {
      let groupedTemplates = _.groupBy(templates, 'Type')

      let templateTypes = _.reduce(
        groupedTemplates,
        (templateTypes, templates, type) => {
          templateTypes[type].current = _.size(templates)
          return templateTypes
        }
        , BacktesterObject.strategy.templateTypes)

      StrategyFn.setStrategy({
        strategy: {
          templateIdsCurrentTest: [],
          templatesCurrentTest: [],
          templateIds: templates.map(template => template.ID),
          templateTypes: templateTypes
        }
      })

      TabsFn.setTab(TabsFn.tabsId.StrategyDesign)

      $('.loadingbar').addClass('hide')
    })

  }

  generateAlgoBtn () {
    return (
      <button onClick={() => this.generateAlgorithm()}
              type="button"
              className="btn btn-labeled btn-default">

        <span>Generate Algorithm</span>

                <span>
                    &nbsp;&nbsp;&nbsp;<i className="fa fa-chevron-circle-right fa-align-right"/>
                </span>

      </button>
    )
  }

  runBacktestBtn () {
    let { runningBacktest, backtestRequested } = this.props

    return (
      <MainButton onClick={ handleRunBacktest }
                  value="RUN BACKTEST"
                  icon='fa fa-chevron-circle-right'
                  disabled={ runningBacktest.active || backtestRequested }/>
    )
  }

  render () {
    return (
      <div style={{ marginBottom: 10 }}>

        { this.runBacktestBtn() }

        <VideoButton videoSrc="Mp6Lpymu1iQ" />

      </div>
    );
  }

}

export class Backtester extends Component {
  setHeights () {
    let height = $(window).height() - 170;
    $('.box-lrmenu').css('height', height)
  }

  componentDidMount () {
    Loaders.loadTemplates()
    Loaders.loadSymbols()
    Loaders.loadSamples()

    // console.log (this.props.params)

    // Check if url contains id parameter and load
    // previous backtest from API, set tab to Backtest
    if (this.props.params && this.props.params.id) {
      TabsFn.setTab(TabsFn.tabsId.Backtest)

      BacktestFn.loadTest({
        backtestId: this.props.params.id
      })
    }

    $(() => {
      this.setHeights()
      $(window).resize(() => this.setHeights())
    })
  }

  render () {
    return (
      <section>
        <div className="content-wrapper">
          <div className="dashboard">
            <Header/>
            <Content/>
          </div>
        </div>
      </section>
    );
  }

}
