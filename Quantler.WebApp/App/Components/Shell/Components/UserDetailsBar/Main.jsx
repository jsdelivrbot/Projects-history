import {Component}            from 'react';
import {default as _}         from 'lodash';
import {}                     from './userDeatilsBar.scss';
import {UserStatistics}       from '../../../../Services/API/User/Statistic.jsx';
import {UserDetailsService}   from '../../../../Services/API/User/Details.jsx';
import {UpgradeModalBtn}      from './UpgradeModal.jsx';
import {LoginService}         from '../../../../Services/API/Login/Main.jsx';
import Tooltip                from '../../../Tooltip/Tooltip.jsx'
import {AccountDetails}     from './AccountDetails.jsx'
import {connect}            from '../../../../State.jsx'
import Functions              from '../../../../Functions/Functions.jsx'
import {MainButton}         from '../../../Buttons/MainButton.jsx'
import {_try} from '../../../../Functions/Utils/Utils'

@connect(state => ({
  details: state.User.details,
  managementURL: state.User.managementURL
}))
class ManageSubscription extends Component {
  componentWillMount () {
    Functions.User.managementURL()
  }

  render () {
    let { managementURL, details } = this.props

    let IsPremium = _.get(details, 'Subscription.IsPremium', false)

    return ((IsPremium && !!managementURL.length) &&
      <center>
        <a href={ managementURL } target="_blank">
          <MainButton type="primary" value="Manage Subscription"/>
        </a>
      </center>) || null
  }
}

@UserDetailsService.Subscribe()
class CurrentAccount extends Component {
  details

  shouldComponentUpdate () {
    if (UserDetailsService.details != this.details) {
      this.details = UserDetailsService.details
      return true
    }

    return false
  }

  render () {
    let { Subscription } =
      UserDetailsService.details

    let subscriptionName =
      (Subscription && Subscription.Name) || ""

    return (
      <div>
        <h4>Current Account</h4>

        <br/>

        <strong>Backtest Power: </strong>
        <span>{subscriptionName}</span>
        {
          (subscriptionName === 'Normal')
          && <UpgradeModalBtn/>
        }

        <br/><br/>

        <ManageSubscription/>
      </div>
    )
  }
}

@connect(state => ({ details: state.User.details }))
@UserStatistics.Subscribe()
class UserDetails extends Component {
  profileNameImage () {
    let { FirstName, LastName } = this.props.details

    let name = FirstName + ' ' + LastName

    return (
      <div className="profile-image-holder">
        <div
          className="profile-image"
          style={{ backgroundImage: "url('" + LoginService.User.data.picture + "')" }}
        ></div>
        <h4>
          { name }
        </h4>
      </div>
    )
  }

  handleLogout () {
    let logoutBtn = $(this.refs.logoutBtn)

    logoutBtn.attr('disabled', 'disabled')

    LoginService.logout(() => {
      alert('something went wrong with the logout')
      logoutBtn.attr('disabled', null)
    })
  }

  render () {
    return (
      <div className="tab-pane active">
        <div>
          <div>
            <br/>

            <h3 className="tab-title text-center text-thin">User Details</h3>

            <br/>

            {this.profileNameImage()}

            <br/>
            <hr/>

            <CurrentAccount/>

            <hr/>

            <div>
              <h4>Statistics</h4>
              <ul>
                <li>
                  <span>{UserStatistics.totalbacktests.Value}</span>
                  <span>Backtests</span>
                </li>
                <li>
                  <span>{UserStatistics.timeanalyzed.Value}</span>
                  <span>Years of data analyzed</span>
                </li>
                <li>
                  <span>{UserStatistics.templates.Value}</span>
                  <span>Number of templates</span>
                </li>
              </ul>
            </div>

            <hr/>

            <button ref="logoutBtn" className="btn btn-primary" onClick={() => this.handleLogout()}>
              <span>Logout&nbsp;</span>
              <i className="fa fa-power-off"/>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

@connect(state => state.User.details)
class UserSettings extends Component {
  style = {
    input: {
      width: '90%',
      height: 34,
      padding: 8,
      marginTop: 5
    }
  }

  enableAutoDiscovery = () => {
    Functions.User.updateDetails({
      AutoDiscoveryOn: !this.props.AutoDiscoveryOn
    })
  }

  enableNewsletter = () => {
    Functions.User.updateDetails({
      NewsletterOn: !this.props.NewsletterOn
    })
  }

  updateName = (property) =>
    e => Functions.User.updateName(property, e.target.value)

  // wyswyg editor id
  editor = _.uniqueId('editor')

  componentDidMount () {
    $(() => window.CKEDITOR.replace(this.editor, {
      extraPlugins: 'codesnippet',
      skin: 'office2013,/Files/office2013/'
    }))
  }

  render () {
    let { AutoDiscoveryOn, NewsletterOn, FirstName, LastName } = this.props

    return (
      <div className="tab-pane active">
        <div style={{ display: 'none' }}>
          <textarea id={ this.editor } name="content"></textarea>
        </div>

        <div style={{ textAlign: 'left' }}>
          <br/>

          <center>
            <h3 className="text-center text-thin">Account Settings</h3>
          </center>

          <br/>

          <div className="row" style={{ paddingLeft: 20 }}>
            <div className="row">
              <div className="row">
                <span>First Name</span>
              </div>
              <div className="row">
                <input
                  defaultValue={ FirstName }
                  onBlur={ this.updateName('FirstName') }
                  style={ this.style.input }
                  type="text"/>
              </div>
            </div>

            <br/><br/>

            <div className="row">
              <div className="row">
                <span>Last Name</span>
              </div>
              <div className="row">
                <input
                  defaultValue={ LastName }
                  onBlur={ this.updateName('LastName') }
                  style={ this.style.input }
                  type="text"/>
              </div>
            </div>

            <br/><br/>

            <div className="row">
              <div className="row">
                <span>Email Address</span>
              </div>
              <div className="row">
                <input style={this.style.input} disabled={ true } type="text" value={ LoginService.User.email }/>
              </div>
            </div>
          </div>

          <br/>
          <hr/>
          <br/>

          <div className="row" style={{ padding: '0 20px' }}>
            <div style={{ float: 'left' }}>
              <input
                id="cmn-toggle-1"
                className="cmn-toggle cmn-toggle-round"
                type="checkbox"
                onChange={ this.enableAutoDiscovery }
                checked={ AutoDiscoveryOn }/>
              <label htmlFor="cmn-toggle-1"></label>
            </div>
            <span style={{ float: 'left', marginLeft: 10 }}>Auto Discovery</span>
            <Tooltip overlay={`${AutoDiscoveryOn ? 'Disable' : 'Enable'} Auto Discovery Service`}>
              <i className="fa fa-info-circle" style={{ color: '#ee4415', float: 'right' }}/>
            </Tooltip>
          </div>
          <br/>
          <div className="row" style={{ padding: '0 20px' }}>
            <div style={{ float: 'left' }}>
              <input
                id="cmn-toggle-2"
                className="cmn-toggle cmn-toggle-round"
                type="checkbox"
                onChange={ this.enableNewsletter }
                checked={ NewsletterOn }/>
              <label htmlFor="cmn-toggle-2"></label>
            </div>
            <span style={{ float: 'left', marginLeft: 10 }}>Newsletter</span>
            <Tooltip overlay={`${NewsletterOn ? 'Disable' : 'Enable'} Periodic Newsletter`}>
              <i className="fa fa-info-circle" style={{ color: '#ee4415', float: 'right' }}/>
            </Tooltip>
          </div>
        </div>
      </div>
    )
  }
}

class Default extends Component {

  tabs = {
    userDetails: {
      id: 0,
      icon: 'icon-user'
    },
    userSettings: {
      id: 1,
      icon: 'icon-equalizer'
    }
  }

  activeTab = this.tabs.userDetails.id

  selectTab (tabId) {
    this.activeTab = tabId
    this.forceUpdate();
  }

  heading () {
    return _.map(this.tabs, (tab) => (
      <li className={(this.activeTab == tab.id) ? 'active' : ''}
          key={tab.id}
          onClick={() => this.selectTab(tab.id)}>

        <a>
          <em className={tab.icon + " fa-lg"}/>
        </a>
      </li>
    ))
  }

  componentWillMount () {
    Functions.User.getDetails()
  }

  render () {
    return (
      <div>
        <ul className="nav nav-tabs nav-justified">
            {this.heading()}
        </ul>

        <div className="tab-content">
             {
               (this.activeTab == this.tabs.userDetails.id)
                 ? <UserDetails/>
                 : <UserSettings/>
             }
        </div>
      </div>
    );
  }

}

let components = { Default: <Default/>, AccountDetails: <AccountDetails/> }

@connect(state => state.User.userBar)
export class UserDetailsBar extends Component {
  render () {
    let { view, open } = this.props

    let openClass = (open ? '' : 'offsidebar-closed')

    return (
      <aside
        className={'userDetailsBar offsidebar ' + openClass}
        style={{ marginTop: '55px !important' }}
      >
        <nav>
          { components[view] }
        </nav>
      </aside>
    )
  }
}
