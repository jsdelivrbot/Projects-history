import React from 'react'
import Radium from 'radium'
import {MainButton} from '../../Buttons/MainButton.jsx'
import {AccountsTable} from './AccountsTable.jsx'
import {TradingAgentsTable} from './TradingAgentsTable.jsx'
import {GetStartModal, PresentationModal} from './GetStartModal.jsx'
import {KPIScrollbar} from './KPIScrollbar.jsx'
import {Tabs} from './Tabs/Tabs.jsx'
import {Positions} from './Tabs/Positions.jsx'
import {Orders} from './Tabs/Orders.jsx'
import {History} from './Tabs/History.jsx'
import {Icons, Fonts, Colors} from '../../Utils/GlobalStyles.jsx'
import VideoButton from '../../Utils/VideoButton.jsx'
import Functions from '../../../Functions/Functions.jsx'
import {connect} from '../../../State.jsx'
import _ from 'lodash'
import {Routes} from '../../../Routes'

@connect(state => ({
  userDetails: state.User.details,
  management: state.livetrading.management
}))
@Radium
export class Management extends React.Component {
  Styles = _.memoize(() => {
    return {
      container: {
        fontFamily: Fonts.openSans,
        color: Colors.primary,
        padding: 20
      },
      titles: {
        cursor: 'default',
        marginTop: 20,
        marginBottom: 20,
        fontSize: 16,
        fontWeight: 300,
        lineHeight: '14px'
      },
      kpiItens: {
        cursor: 'default',
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: 0.5,
        color: 'rgba(62, 63, 75, 0.3)'
      }
    }
  })

  componentWillMount () {
    //
    // Connect to pusher channel
    // and load initial data
    //
    Functions.LiveTrading.Management.load()
  }

  //
  // used in `StartLiveTradingModal`. if user
  // wants to set-up live trading
  //
  getStarted = value => () => {
    if (value) {
      window.location.replace('#/accounts/')
    } else {
      window.history.back()
    }
  }

  render () {
    let style = this.Styles()
    let { Subscription } = this.props.userDetails
    let { IsPremium, IsSponsored } = Subscription

    //
    // if user has not set-up live trading
    // show get started overlay
    //
    if (Subscription && !(IsPremium || IsSponsored)) {
      return (
        <div>
          <img src={"Art/" + "Images/management_preview.jpg"} alt="Management Preview"/>
          {
            localStorage.BLOCKAPP === "true"
              ? <PresentationModal />
              : <GetStartModal getStarted={ this.getStarted }/>
          }
        </div>)
    }

    let { view, charts, selectedAccount, portfolio, timestamps } = this.props.management
    let { accounts, agents, positions, pendingOrders, orders } = view

    return (
      <div style={ style.container }>

           {/* HEADER */}
             <div>
               <a href={ "#" + Routes.Accounts }>
                 <MainButton
                   value="ADD ACCOUNT"
                   icon={ Icons.plus }
                   type="primary"/>
               </a>

               <VideoButton videoSrc="ndPrudn41fE" />
             </div>

           {/* Numbers of KPI charts */}
             <div style={[style.titles]}>
            <span style={{ fontSize: 16 }}>
              Charts &nbsp;
            </span>
            <span style={ style.kpiItens }>
              ({ _.size(charts) } ITEMS)
            </span>
             </div>

             <KPIScrollbar kpis={ charts } timestamp={timestamps.charts}/>

             <div style={[style.titles]}>
               Accounts
             </div>

             <AccountsTable accounts={accounts} selectedAccount={ selectedAccount }/>

             <div style={[style.titles]}>
               Trading Agents
             </div>

             <TradingAgentsTable agents={ agents } portfolioAgents={ portfolio.Agents }/>

           {/* TABS */}
             <div style={[style.titles]}>
               Trades
             </div>

             <Tabs tabs={['Positions', 'Pending Orders', 'History']}
                   tabsContent={[
                     <Positions positions={ positions }/>,
                     <Orders orders={ pendingOrders }/>,
                     <History history={ orders }/>]}/>

      </div>
    )
  }
}
