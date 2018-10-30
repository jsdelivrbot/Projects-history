import Radium from 'radium'
import {Component}             from 'react';
import {StrategyDesignContent} from './MiddleContents/StrategyDesign.jsx';
import {CodeContent}           from './MiddleContents/Code.jsx';
import {BacktestContent}       from './MiddleContents/Backtest.jsx';
import {connect}               from '../../../State.jsx'
import * as TabsFn               from '../Functions/Tabs.jsx'
import _                         from 'lodash';
import {StartLiveTradingModal} from '../Components/StartLiveTrading.jsx'
import {handleRunBacktest} from '../Main.jsx'
import {Routes} from '../../../Routes.jsx'
import Functions from '../../../Functions/Functions.jsx'

@connect(state => ({
  showButton: state.Backtester.startLiveTrading.showButton,
  currentTest: state.Backtester.backtest.currentTest,
  runningBacktest: state.Backtester.backtest.runningBacktest,
  UserSubscription: state.User.details.Subscription
}))
@Radium
class StartLiveTrading extends Component {
  style = {
    width: 171,
    height: 30,
    borderRadius: 5,
    backgroundColor: '#ee4415',
    boxShadow: 'inset 0 1px 2px 0 rgba(255, 255, 255, 0.5)',
    border: 'solid 1px #c2371f',
    color: '#FFF',
    fontWeight: 'bold'
  }

  state = {
    modalIsOpen: false
  }

  openModal = () => {
    Functions.Backtester.StartLiveTrading.load()
    this.setState({ modalIsOpen: true })
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }

  render () {
    let { props, style, state, closeModal, openModal } = this
    let { modalIsOpen } = state
    let { UserSubscription, currentTest, showButton } = props
    let { exceptions, settings, } = currentTest

    let text = 'START LIVE TRADING'

    let Button = ({ onClick }) => <button
      style={ style }
      onClick={ onClick }>
      { text }
    </button>

    if (exceptions.length || !settings.BacktestedVersion ||
      props.runningBacktest.active || !showButton
    ) {
      return null
    } else if (!UserSubscription.IsPremium && !UserSubscription.IsSponsored) {
      return <div>
        <a href={"#" + Routes.Accounts}>
          <Button/>
        </a>
      </div>
    } else {
      let readyForTrading = (settings.BacktestedVersion.Total === settings.CurrentVersion.Total)

      if (!readyForTrading) {
        text = 'BACKTEST AGAIN FOR LIVE TRADING'
      }

      let onClick = (readyForTrading ? openModal : handleRunBacktest)

      if (!readyForTrading) {
        Object.assign(style, {
          height: '40px',
          position: 'relative',
          top: '-8px'
        })
      }

      return (
        <div>
          <StartLiveTradingModal
            closeModal={ closeModal }
            modalIsOpen={ modalIsOpen }/>
          <Button onClick={onClick}/>
        </div>
      )
    }
  }
}

@connect(state => ({
  progressBar: state.Backtester.ui.progressBar,
  activeTab: state.Backtester.ui.tabs.activeTab
}))
class Tabs extends Component {
  render () {
    let { progressBar, tabs, isActiveTab, selectTab } = this.props

    let tabsMap = tabs.map(tab =>
      <button
        className={"btn btn-primary " + isActiveTab(tab.id, 'active')}
        key={ tab.id }
        onClick={() => selectTab(tab.id)}>
        <span>{ tab.title }</span>
      </button>
    )

    let generatingProgressBar = (!progressBar.active) ? null : (
      <div>
        <span className="text">
        { progressBar.text }
        </span>

        <div className="progress">
          <div className="progress-bar"
               role="progressbar"
               style={{ width: progressBar.value + '%' }}>
               { progressBar.value }%
          </div>
        </div>
      </div>
    )

    return (
      <div className="col-sm-12 box-tab-menu">
           { tabsMap }
             <div className="loadingbar pull-right">
                  { generatingProgressBar }
                    <StartLiveTrading/>
             </div>
      </div>
    )
  }
}

@connect(state => ({
  activeTab: state.Backtester.ui.tabs.activeTab
}))
export class MiddleContainer extends Component {

  tabs = {
    [TabsFn.tabsId.Backtest]: <BacktestContent id={_.uniqueId()}/>,
    [TabsFn.tabsId.Code]: <CodeContent id={_.uniqueId()}/>,
    [TabsFn.tabsId.StrategyDesign]: <StrategyDesignContent id={_.uniqueId()}/>
  }

  state = {
    boxHeight: this.calcBoxHeight()
  }

  calcBoxHeight () {
    return ($(window).height() - 170)
  }

  constructor () {
    super()

    $(() => $(window).resize(() =>
      this.setState({ boxHeight: this.calcBoxHeight() })
    ))
  }

  isActiveTab = (id, cn) => TabsFn.isActiveTab(id, cn)
  selectTab = (id) => TabsFn.setTab(id)

  render () {
    let { activeTab } = this.props

    return (
      <div className="box-mmenu"
           style={{
             minHeight: this.state.boxHeight,
             backgroundColor: this.isActiveTab(TabsFn.tabsId.Code, '#3E3F4B')
           }}>
        <Tabs tabs={ TabsFn.tabs }
              isActiveTab={ this.isActiveTab }
              selectTab={ this.selectTab }/>

           {this.tabs[activeTab] || null}
      </div>
    );
  }

}
