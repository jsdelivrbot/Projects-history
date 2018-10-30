import {Component} from 'react'
import Radium, {Style} from 'radium'
import {Link} from 'react-router'
import {Pane} from './Pane/Pane.jsx'
import {Topic} from './Pane/Topic.jsx'
import {Template} from './Pane/Template.jsx'
import {Algorithms} from './Pane/Algorithms.jsx'
import {MainButton} from '../Buttons/MainButton.jsx'
import {AmountBar} from './AmountBar.jsx'
import {liveTrading} from './Pane/LiveTrading.jsx'
import {Colors, Icons} from '../Utils/GlobalStyles.jsx'
import {Routes} from '../../Routes.jsx'
import {connect} from '../../State.jsx'
import Functions from '../../Functions/Functions.jsx'
import _ from 'lodash'

let Styles = () => {
  return {
    buttons: {
      display: 'flex',
      padding: 15
    },
    panesTop: {
      margin: '0 10px 10px 10px'
    },
    panesBottom: {
      margin: '0 10px'
    }
  }
}

let style = Styles()

// Text and Loading used in CommunityPosts
let Text = (text) => [<div style={{ padding: 20 }}>{ text }</div>]
let Loading = () => Text("Loading...")
/* Display a text with a button in the center of the panel, used when the user has no data to display yet */
let NoDataPanel = ({text, btnValue, href}) => (
  <div style={{
        background: '#f5f7fa',
        textAlign: 'center',
        width: '100%',
        height: '100%',
        display: 'table'
      }}>
    <div
      style={{
            display: 'table-cell',
            verticalAlign: 'middle'
          }}>
      <div
        style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              position: 'relative',
              top: '-20px'
            }}>
            <span
              style={{
                color: 'rgba(62, 63, 75, 0.3)',
                fontSize: '13px',
                letterSpacing: '0.5px',
                fontWeight: 'bold'
              }}>
              { text }
            </span>
        <br/><br/>
        <a href={ href }>
          <MainButton value={ btnValue }/>
        </a>
      </div>
    </div>
  </div>
)

class CommunityPosts extends Component {
  render () {
    let { posts } = this.props

    let topics = [
      {
        title: 'How stable is stability calculation calculation?',
        owner: 'Magdalena Frackowiak',
        minutesAgo: 12,
        lastReply: 'Thomas Cook',
        lastReplayUrl: '#'
      }
    ]

    let postsElements =
      posts.loading ? Loading()
        : (posts.value.length == 0) ? Text("No post available")
        : posts.value.map((post, index) =>
        <Topic
          key={ index }
          css={{ backgroundColor: (index % 2 == 0) ? Colors.grey : Colors.white }}
          post={ post }/>)

    return (
      <Pane
        title={'Latest Community Posts'}
        rightTitle={'Discussions'}
        rightTitleUrl={ '#' + Routes.Community }
        contents={[postsElements]}/> )
  }
}

@connect(state => ({
  marketplace: state.marketplace
}))
class LatestTemplates extends Component {
  componentWillMount () {
    Functions.Marketplace.load()
  }

  componentDidUpdate () {
    let { marketplace } = this.props
    let { templates } = marketplace.index

    if (!marketplace.loading && !templates.length) {
      Functions.Marketplace.indexLoad()
    }
  }

  render () {
    let { index } = this.props.marketplace
    let { templates } = index

    let arrayTemplates =
      index.loading ? Loading()
        : (templates.length == 0) ? Text("No template available")
        : templates.map(template => <Template template={ template }/>)

    return (
      <Pane
        title={ 'Latest Templates' }
        rightTitle={ 'Trading Ideas' }
        rightTitleUrl={ '#' + Routes.Marketplace }
        contents={[arrayTemplates]}/> )
  }
}

class LatestAlgorithms extends Component {
  componentDidMount () {
    $(() =>
      $('.scrollbar-inner').scrollbar({ "type": "advanced" }))
  }

  render () {
    let { algorithms } = this.props

    let arrAlgorithms =
      algorithms.loading ? Loading()
        : (algorithms.value.length == 0) ? <NoDataPanel text="NO TRADING ALGORITHMS"
                                                        btnValue="GO TO BACKTESTER"
                                                        href="#/backtester/" />
        : algorithms.value.map((algorithm, index) =>
        <Algorithms algorithm={ algorithm } key={index} order={ index + 1 }/>)

    return (
      <Pane
        title={'Latest Algorithms'}
        rightTitle={'Algorithms'}
        rightTitleUrl={ '#' + Routes.Algorithms }
        contents={[arrAlgorithms]}/> )
  }
}

class Col extends Component {
  render () {
    let { children } = this.props
    return (
      <div className="col-md-6 dashboard-panel" style={{ padding: '0 5px'}}>
           {children}
      </div>
    )
  }
}

@connect(state => ({
  charts: state.livetrading.management.charts,
  positions: state.livetrading.management.positions,
  userSubscription: state.User.details.Subscription
}))
@Radium
class LiveTradingPanel extends Component {
  componentDidMount () {
    $('.scrollbar-inner').scrollbar()
  }

  render () {
    let { IsPremium, IsSponsored } = this.props.userSubscription
    let livetradingLink = '#/accounts/'

    let arrLiveTrading = [<NoDataPanel text="YOUR ACCOUNT CANNOT BE REACHED"
                                               btnValue="GET STARTED NOW"
                                               href="#/accounts/" />]

    if (IsPremium || IsSponsored) {
      livetradingLink = '#/management'
      arrLiveTrading = liveTrading({
        charts: this.props.charts,
        positions: this.props.positions
      })
    }

    return (
      <Pane
        title={'Live Trading'}
        rightTitle={'Trading Management'}
        rightTitleUrl={ livetradingLink  }
        contents={[arrLiveTrading]}/> )
  }
}

@connect(state => ({
  dashboard: state.dashboard.index,
  subscription: state.User.details.Subscription
}))
@Radium
export class Dashboard extends Component {
  /**
   * goes through each panel, checks if the sum of all
   * child heights (internal height) is bigger than the
   * panel height, if so, the last child is removed, the
   * process is repeated until the internal height is
   * smaller than the panel height.
   */
  resize = (repeat) => {
    $('.dashboard-panel').each((panelKey, _panel) => {

      let panel = $(_panel)

      let newPanelHeight = ($(window).height() - 170) / 2

      // panel resize
      panel.css({ height: newPanelHeight })

      // livetrading panel (need to work on later)
      if (panelKey === 0) {
        $('#livetrading-positions-col').css('height', (newPanelHeight - 250) + 'px')
        return
      }

      // getting list items
      let children = panel.children().first().children()

      // this.childAt keeps track of the child elements that have
      // been removed and their height so later if the window is
      // made bigger, the code can check if it should show the
      // child: if by adding it back won't make the inte  rnal
      // height bigger than the panel height
      if (!this.childAt[panelKey]) {
        this.childAt[panelKey] = {
          childRemoves: (panelKey == 0) ? 0 : 1,
          childHeights: []
        }
      }

      let innerHeight = 0

      let calculateInnerHeight = () => {
        children.each((key, child) => {
          innerHeight += $(child).height()
        })
      }

      calculateInnerHeight()

      let panelHeight = panel.height() - 50

      let childAt

      let updateChildAt = () => {
        childAt = {
          childKey: children.length - this.childAt[panelKey].childRemoves,
          childHeights: this.childAt[panelKey].childHeights
        }
      }

      updateChildAt()

      if (innerHeight > panelHeight) {
        while (innerHeight > panelHeight) {
          if (this.childAt[panelKey].childRemoves == children.length - 1) return

          let child = $(children[childAt.childKey])

          childAt.childHeights.push(child.height())

          child.css({ display: 'none', height: 0 })

          innerHeight = 0

          calculateInnerHeight()

          this.childAt[panelKey].childRemoves++

          updateChildAt()
        }
      } else {
        let calculate = () => {
          let height = _.last(childAt.childHeights)
          if (!height) {
            return false
          } else {
            return ((innerHeight + height) <= panelHeight)
          }
        }

        while (calculate()) {
          panelHeight += childAt.childHeights.pop()

          $(children[childAt.childKey + 1]).css({ display: 'block', height: 'auto' })

          this.childAt[panelKey].childRemoves--

          updateChildAt()
        }
      }
    })
    if (repeat) setTimeout(this.resize, 500)
  }

  // TODO: maybe change to throttle
  bindTimeout = () => {}

  bindResize = () => {
    clearTimeout(this.bindTimeout)

    this.bindTimeout = setTimeout(() => {
      // used in this.resize
      this.childAt = {}

      $(document).ready(() => {
        let dashboardLoading = _.get(this.props, 'dashboard.loading', true)

        if (dashboardLoading === false) {
          $(window).unbind('resize', this.resize)
          $(window).bind('resize', this.resize)
          this.resize(true)
        }
      })
    }, 500)
  }

  componentDidUpdate () {
    this.bindResize()
  }

  componentWillMount () {
    Functions.Dashboard.load()
  }

  componentDidMount () {
    this.bindResize()
  }

  componenWillUnmount () {
    Functions.Dashboard.unLoad()
    $(window).unbind('resize', this.resize)
  }

  render () {
    let {
      loading,
      latestAlgorithms,
      communityPosts
    } = this.props.dashboard

    let {
      DiscoveriesPerMonth,
      DiscoveriesPerformed,
      ProcessingTimeSeconds,
      ProcessingTimeSecondsUsed,
      StorageLimitMB,
      StorageUsedMB
    } = this.props.subscription

    if (loading) {
      return (
        <div style={{ padding: 20 }}>
          Loading...
        </div>
      )
    }

    return (
      <div>
        <div style={[style.buttons]}>
          <Link to={ Routes.Backtester }>
            <MainButton css={{ marginRight: 15 }} value={'Backtester'} icon={Icons.barChart} type={'primary'}/>
          </Link>
          <Link to={ Routes.Accounts }>
            <MainButton css={{ marginRight: 15 }} value={'Live Trading'} icon={Icons.dollar} type={'primary'}/>
          </Link>
          <AmountBar css={{ flexGrow: 1, marginRight: '1%' }} title={'Total time backtests performed (this month)'}
                     limit={ Math.floor(ProcessingTimeSeconds / 60) }
                     amount={ Math.floor(ProcessingTimeSecondsUsed / 60) } type={'minutes'}/>
          <AmountBar css={{ flexGrow: 1, marginRight: '1%' }} title={'Discoveries performed (this month)'}
                     limit={ DiscoveriesPerMonth } amount={ DiscoveriesPerformed }/>
          <AmountBar css={{ flexGrow: 1 }} title={'Current storage limit'} limit={ StorageLimitMB }
                     amount={ StorageUsedMB.toFixed(2) } type={'MB'}/>
        </div>
        <div style={[style.panesTop]}>
          <div className="row">
            <Col>
              <LiveTradingPanel/>
            </Col>
            <Col>
              <CommunityPosts posts={ communityPosts }/>
            </Col>
          </div>
        </div>
        <div style={[style.panesBottom]}>
          <div className="row">
            <Col>
              <LatestAlgorithms algorithms={ latestAlgorithms }/>
            </Col>
            <Col>
              <LatestTemplates/>
            </Col>
          </div>
        </div>
      </div>
    )
  }
}
