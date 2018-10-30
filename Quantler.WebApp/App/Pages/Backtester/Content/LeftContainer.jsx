import {Component}     from 'react'
import {CodePanel}     from './Panels/Code.jsx'
import {StrategyPanel} from './Panels/Strategy.jsx'
import {BacktestPanel} from './Panels/Backtest.jsx'
import * as TabsFn       from '../Functions/Tabs.jsx'
import {connect}       from '../../../State.jsx'

let tabs = {
  [TabsFn.tabsId.Backtest]: <BacktestPanel/>,
  [TabsFn.tabsId.Code]: <CodePanel/>,
  [TabsFn.tabsId.StrategyDesign]: <StrategyPanel/>
}

class LeftContainerComponent extends Component {
  componentDidMount () {
    $(() => $('.scrollbar-inner').scrollbar({ "type": "advanced" }))
  }

  render () {
    let { activeTab } = this.props
    let Content = tabs[ activeTab ]
    let backgroundImage = !activeTab
      ? {
      backgroundImage: 'url(Art/Images/arrow_add.png)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50% 80%'
    } : {}

    return (
      <div className="box-lrmenu unselectable-all round-left pull-left"
           style={ backgroundImage }>

        <div className="scrollbar-inner">
          { Content }
        </div>

      </div>
    )
  }
}

export let LeftContainer = connect(state => ({

  activeTab: state.Backtester.ui.tabs.activeTab

}))(LeftContainerComponent)
