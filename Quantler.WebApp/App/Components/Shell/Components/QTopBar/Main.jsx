import React, {Component} from 'react'
import {} from './qTopBar.scss'
import {Link} from 'react-router'
import {Routes} from '../../../../Routes.jsx';
import {connect} from '../../../../State.jsx'
import Radium, {Style} from 'radium'
import {asCurrency} from '../../../../Functions/Utils/CurrencyFormats.jsx'
import Functions from '../../../../Functions/Functions.jsx'
import _ from 'lodash'

class SearchBar extends React.Component {
  render () {
    let searchBarOpen = (
      this.props.open)
      ? 'open'
      : ''

    return (
      <form role="search" className={'search-bar navbar-form ' + searchBarOpen}>
        <div className="form-group has-feedback">
          <input type="text" placeholder="Type and hit enter.." className="form-control"/>
          <div onClick={this.props.toggleSearchBarFunc} className="fa fa-times form-control-feedback"></div>
        </div>
      </form>
    )
  }
}

let NavbarLeft = React.createClass({
  render()
  {
    return (
      <ul className="nav navbar-nav no-transition-all">
        <li onClick={() => Functions.UI.toggleLayout()}>
          <a className="hidden-xs">
            <em className="fa fa-navicon"></em>
          </a>

          <a className="visible-xs sidebar-toggle">
            <em className="fa fa-navicon"></em>
          </a>
        </li>
      </ul>
    );
  }
})

let changes = {
  positive: <i className="fa fa-caret-up" style={{ color: '#4db82e' }}/>,
  negative: <i className="fa fa-caret-down" style={{ color: '#ed5565' }}/>,
  neutral: <i/>
}

@connect(state => state.livetrading.management)
@Radium
export class AccountInfo extends Component {
  accountInterval = null
  state = { accountIndex: 0 }

  // interval to change the account being shown
  startInterval () {
    this.accountInterval = setInterval(() => {
      let { length } = this.props.view.accounts
      let { accountIndex } = this.state
      if (accountIndex >= (length - 1)) {
        this.setState({ accountIndex: 0 })
      } else {
        this.setState({ accountIndex: accountIndex + 1 })
      }
    }, 10000)
  }

  stopInterval () {
    clearInterval(this.accountInterval)
    this.accountInterval = null
  }

  componentDidMount () {
    if (this.props.view.accounts.length > 1) {
      this.stopInterval()
      this.startInterval()
    }
  }

  componentDidUpdate () {
    if (this.props.view.accounts.length < 2) {
      this.stopInterval()
    } else if (!this.accountInterval) {
      this.startInterval()
    }
  }

  componentWillUnmount () {
    this.stopInterval()
  }

  render () {
    let { selectedAccount, view } = this.props

    if (!view.accounts.length) {
      return <li style={{ padding: 20, color: '#999' }}>
        LiveTrading: No Account Available
      </li>
    }

    let account
    //
    // if an account isn't selected
    // the first account will be used
    if (_.get(selectedAccount, 'AccountID.length', false) &&
      view.accounts.length > 1
    ) {
      account = view.accounts.find(({ PortfolioID, AccountID }) =>
        _.isEqual({ PortfolioID, AccountID }, selectedAccount))
    } else {
      account = view.accounts[this.state.accountIndex]
    }

    let currency = asCurrency.bind({}, account.AccountCurrency)

    return (
      <li>
        <Style scopeSelector=".TopAccountInfo"
               rules={{
                 '.col-md-3': { padding: 0 },
                 '.fa-caret-up, .fa-caret-down': { fontSize: 18 },
                 'div': { display: 'flex' },
                 '.item': { display: 'table', margin: '0 10px' },
                 '.item div': { display: 'table-row' }
               }
               }/>
        <li className="TopAccountInfo">
          <div
            style={{
              textAlign: 'center',
              color: '#FFF',
              paddingTop: 10,
              marginRight: 10
            }}>
            <div style={{
              fontSize: 18,
              paddingTop: 14,
              color: '#FFF',
              fontWeight: '300',
              marginRight: 20
            }}>
                 { account.BrokerName }
            </div>
            <div className="item">
              <div>
                Account
              </div>
              <div>
                { account.AccountID }
              </div>
            </div>
            <div className="item">
              <div>
                Equity
              </div>
              <div>
                { currency(account.Equity) } &nbsp;
                { changes[account.changes.Equity] }
              </div>
            </div>
            <div className="item">
              <div>
                Balance
              </div>
              <div>
                { currency(account.Balance) } &nbsp;
                { changes[account.changes.Balance] }
              </div>
            </div>
            <div className="item">
              <div>
                Floating ROI
              </div>
              <div>
                { account.ROI } % &nbsp;
                { changes[account.changes.ROI] }
              </div>
            </div>
          </div>
        </li>
      </li>
    )
  }
}

let NavbarRight = React.createClass({
  render()
  {
    return (
      <ul className="nav navbar-nav navbar-right unselectable-all no-transition-all">

        <AccountInfo />

        <li>
          <img src={"Art/" + 'Images/beta.png'}
               title="This is a work in progress"
               alt="Beta Version"/>
        </li>

          {/* Search button: Search is not implemented yet
           <li>
           <a onClick={this.props.toggleSearchBarFunc}>
           <em className="icon-magnifier"></em>
           </a>
           </li>
           */}


        <li>
          {/*
           toggles the account details (right) sidebar
           */}
          <a onClick={_=> this.props.toggleUserDetailsFunc()} no-persist="no-persist">
            <em className="icon-user"></em>
          </a>
        </li>

        <li><a>&nbsp;&nbsp;</a></li>

      </ul>
    )
  }
})

@connect(state => ({ ui: state.ui }))
class NavbarHeader extends React.Component {
  render () {
    let { ui } = this.props

    let expanded = (ui.activeLayout == ui.layoutTypes.expanded)

    let Logo = (expanded)
      ? (<div className="brand-logo">
      <img src={"Art/" + "Images/logo.png"} alt="App Logo" className="img-responsive"/>
    </div>)
      : (<div className="brand-logo-collapsed" style={{ display: 'block' }}>
      <img src={"Art/" + "Images/logo-single.png"} alt="App Logo" className="img-responsive"/>
    </div>)

    let style = (expanded ? {} : { width: 70 })

    return (
      <div className="navbar-header unselectable-all " style={style}>
        <Link to={Routes.Backtester}>
              {Logo}
        </Link>
      </div>
    )
  }
}

module.exports = React.createClass({

  /*getInitialState()
   {
   return {
   searchBarOpen : false
   };
   },*/

  toggleSearchBar()
  {
    /*this.setState({
     searchBarOpen : ! this.state.searchBarOpen
     });*/
  },

  render()
  {
    return (

      <header className="q-top-bar topnavbar-wrapper">
        <nav role="navigation" className="navbar topnavbar">

          <NavbarHeader/>

          <div className="nav-wrapper">
            <NavbarLeft/>

            <NavbarRight toggleSearchBarFunc={this.toggleSearchBar}
                         toggleUserDetailsFunc={this.props.toggleUserDetailsFunc}/>
          </div>

             {/*<SearchBar open={this.state.searchBarOpen} toggleSearchBarFunc={this.toggleSearchBar}/>*/}

        </nav>
      </header>

    );
  }

});
