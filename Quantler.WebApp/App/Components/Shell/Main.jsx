import * as React                 from 'react'
import {RouteHandler}           from 'react-router'
import {UserDetailsBar}         from './Components/UserDetailsBar/Main.jsx'
import {Authorized, isLoggedIn} from '../../Services/API/Login/Authorized.jsx'
import {LoginService}           from '../../Services/API/Login/Main.jsx'
import {OnboardingModal}        from './Components/Onboarding/Onboarding.jsx'
import _                          from 'lodash'
import {userOnboarded}          from '../../Functions/Networking/API/User.jsx'
import {UserDetailsService}     from '../../Services/API/User/Details.jsx'
import Functions                  from '../../Functions/Functions.jsx'
import {connect}                from '../../State.jsx'
import {Shell as ShellFunctions} from '../../Functions/Shell/Shell.jsx'

let QTopBar = require('./Components/QTopBar/Main.jsx')
let SideBar = require('./Components/Sidebar/Main.jsx')

@Authorized(() => location.replace('#/login'))
@LoginService.Subscribe()
@UserDetailsService.Subscribe()
@connect(state =>
  ({
    User: state.User,
    ui: state.ui
  }))
export class Shell extends React.Component {
  state = {
    //
    // the user details
    // bar open/close
    //
    userDetailsOpen: false
  }

  //
  // API request to update
  // that the user has seen
  // the onboarding modal
  //
  onboardingClose = userOnboarded

  componentWillMount () {
    //
    // if an url has been passed
    // with a goTo parameter
    // e.g: app.quantler.com/?goTo="/backtester/109"
    //
    let { gotoURL } = localStorage

    if (gotoURL && isLoggedIn() && gotoURL != "undefined") {
      localStorage.gotoURL = undefined
      window.location.replace(`${gotoURL}`)
    }

    //
    // Shell only loads components
    // after User details are loaded
    // as they are required by many
    // functions to be initialized
    // e.g: pusher, backtester
    //
    Functions.User.getDetails([ ShellFunctions.load, {} ])

    //
    // Quantler Support Center button
    //
    let iid = 'uriid_' + (new Date().getTime()) + '_' + Math.floor((Math.random() * 100) + 1);
    if (!document._fpu_) document.createElement('script').setAttribute('id', iid);
    let bsa = document.createElement('script');
    bsa.type = 'text/javascript';
    bsa.async = true;
    bsa.src = '//feedback.quantler.com/sdk/supportCenter.js?initid=' + iid + '&wid=6';
    (document.getElementsByTagName('head')[ 0 ] || document.getElementsByTagName('body')[ 0 ]).appendChild(bsa);

    //
    // Inspectlet Script
    //
    window.__insp = window.__insp || [];
    __insp.push([ 'wid', 729153021 ]);
    (function () {
      function ldinsp () {
        if (typeof window.__inspld != "undefined") return;
        window.__inspld = 1;
        var insp = document.createElement('script');
        insp.type = 'text/javascript';
        insp.async = true;
        insp.id = "inspsync";
        insp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://cdn.inspectlet.com/inspectlet.js';
        var x = document.getElementsByTagName('script')[ 0 ];
        x.parentNode.insertBefore(insp, x);
      };
      setTimeout(ldinsp, 500);
      document.readyState != "complete" ? (window.attachEvent ? window.attachEvent('onload', ldinsp) : window.addEventListener('load', ldinsp, false)) : ldinsp();
    })();
  }

  componentWillUnmount () {
    Functions.Shell.unload(this.props.User)
  }

  render () {
    /* Blocking the app for presentation reasons */
    if (localStorage.BLOCKAPP === "true" && this.props.location.pathname !== '/management') {
      console.log('REDIRECTING...')
      window.location.replace('#/management')
    }

    let { ui, User } = this.props

    //
    // if user details are not loaded yet
    //
    if (!_.get(User, 'details.UserID', false)) return null

    //
    // know the size of the app content
    // container based on the width of the
    // menu bar (left side), checking if
    // the layout is collapsed or expanded
    //
    let collapsed =
      (ui.activeLayout == ui.layoutTypes.collapsed)
        ? { paddingLeft: 70 }
        : {}

    return (
      <div>
        <QTopBar toggleUserDetailsFunc={ Functions.User.toggleUserBar }/>

        <SideBar location={ this.props.location }/>

        <UserDetailsBar/>

        <section className="q-container" style={collapsed}>
          { this.props.children }
        </section>

        {
          !_.get(User, 'details.OnBoarded', false)
          && <OnboardingModal onClose={ this.onboardingClose }/>
        }
      </div>
    )
  }
}
