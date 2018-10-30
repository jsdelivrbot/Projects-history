import {}                 from './PreLoader.jsx'
import React              from 'react'
import {render}         from 'react-dom'
import {Router, Route}  from 'react-router'
import createHashHistory  from 'history/lib/createHashHistory'
import _                  from 'lodash'
import {Routes, Paths}    from './Routes.jsx'
import {App}              from './Components/Shell/App.jsx'
import {Shell}            from './Components/Shell/Main.jsx'
import {Login}            from './Pages/Login/Main.jsx'
import {Register}         from './Pages/Register/Main.jsx'
import {Backtester}       from './Pages/Backtester/Main.jsx'
import {Recover}          from './Pages/Recover/Main.jsx'
import {Algorithms}       from './Pages/Algorithms/Main.jsx'
import {Marketplace}    from './Pages/Marketplace/Marketplace.jsx'
import {Dashboard}      from './Components/Dashboard/Dashboard.jsx'
import {Faq}              from './Pages/Faq/Main.jsx'
import Templates          from './Pages/Templates/Main.jsx'
import {NotFound}         from './Pages/NotFound/Main.jsx'
import {Accounts}       from './Components/LiveTrading/Accounts/Accounts.jsx'
import {Management}     from './Components/LiveTrading/Management/Management.jsx'
import {getUserDetails} from './Functions/Networking/API/User.jsx'
import * as Samples       from './Pages/Samples/Main.jsx'
import * as Community     from './Pages/Community/Main.jsx'
import * as Auth0         from './Functions/Networking/Auth0/Auth0.jsx'
import * as Notification  from './Functions/UI/Notification.jsx'
import {LoginService}   from './Services/API/Login/Main.jsx'
import Utils              from './Functions/Utils/Utils.jsx'
import Functions          from './Functions/Functions.jsx'
import {Mocks} from './Functions/Utils/Mocks.jsx'

function checkUserToken (callback) {
  let fail = type => xhr => {
    console.log('error from: ', type)

    if (xhr.status != 401) {
      if (type == 'getUserDetails') {
        Notification.error({
          title: "Something went wrong loading the app, please try again later"
        })
      }

      window.console.error("Error loading user information : checkUserToken")
    }

    console.log('checkUserToken, fail, LoginService.User: ', LoginService.User)

    LoginService.User = ""

    callback()
  }

  let user = LoginService.User

  Auth0
    .userInfo({ accessToken: (user.access_token || "") })
    .fail(fail('Auth0.userInfo'))
    .then(() =>
      getUserDetails()
        .then(callback)
        .fail(fail('getUserDetails')))
}

$.getJSON('Files/Config.json')
  .then(tokens => {
    _.forEach(tokens, (token, key) => localStorage.setItem(key, token))
  })
  .always(() => {
    // check if user token is
    // still valid then renderApp
    try {
      checkUserToken(renderApp)
    } catch (e) {
      renderApp()
    }

  })

function renderApp () {
  // check for passed url parameters
  // e.g: chargify return url "?chargifyid"
  let parameters = Utils.urlParameters(window.location.href)

  if (_.size(parameters) > 0) {
    // chargify return url
    // { [x]: string }
    // chargifyid, paymentid, refid, subid
    if (parameters.chargifyid) {
      Functions.User.upgradePremium(parameters)
    }
  }

  render((

    <Router history={ createHashHistory({ queryKey: false }) }>
      <Route component={App}>
        <Route component={Shell}>
          <Route path={ Routes.Dashboard } component={ Dashboard }/>
          <Route path={Routes.Backtester + '(:id)'} component={Backtester}/>
          <Route path={Routes.Algorithms} component={Algorithms}/>
          <Route component={Community.Index}>
            <Route path={Routes.Community + '(:category)'} component={Community.Initial}/>
            <Route path={Routes.CommunityNewPost} component={Community.NewPost}/>
            <Route path={Routes.CommunityPost + '(:id)'} component={Community.Post}/>
          </Route>
          <Route path={Routes.Faq} component={Faq}/>
          <Route path={Routes.Templates + '(:templateId)'} component={Templates}/>
          <Route path={Routes.Marketplace} component={Marketplace}/>
          <Route path={Routes.Samples} component={Samples.Initial}/>
          <Route path={Routes.SampleDetails + '(:sampleId)'} component={Samples.Details}/>
          <Route path={Routes.SampleAdd} component={Samples.Add}/>
          <Route path={ Routes.Accounts + '(:view)' } component={ Accounts }/>
          <Route path={ Routes.Management } component={ Management }/>
        </Route>

        <Route path={Routes.Login} component={Login}/>
        <Route path={Routes.Recover} component={Recover}/>
        <Route path={Routes.Register} component={Register}/>

        <Route path="*" component={NotFound}/>
      </Route>
    </Router>

  ), document.getElementById('quantler-webapp'))
}
